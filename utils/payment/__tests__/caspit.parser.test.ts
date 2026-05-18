import { parseResponse } from '../providers/caspit/caspit.parser';

function buildResponse(fields: Record<string, string>): string {
  const tags = Object.entries(fields)
    .map(([k, v]) => `<${k}>${v}</${k}>`)
    .join('');
  return `<Response>${tags}</Response>`;
}

const APPROVED = buildResponse({
  ResultCode: '0',
  Status: '0',
  AshStatus: '0',
  Uid: '12345678901234567890123',
  AuthManpikNo: '123456',
  Pan: '000400XXXXXX1234',
  CardName: 'Visa Gold',
});

describe('parseResponse — approved transaction', () => {
  it('returns success: true when all three status fields are 0', () => {
    expect(parseResponse(APPROVED).success).toBe(true);
  });

  it('extracts uid, authManpikNo, pan, cardName', () => {
    const result = parseResponse(APPROVED);
    expect(result.uid).toBe('12345678901234567890123');
    expect(result.authManpikNo).toBe('123456');
    expect(result.pan).toBe('000400XXXXXX1234');
    expect(result.cardName).toBe('Visa Gold');
  });

  it('attaches rawResponse', () => {
    const result = parseResponse(APPROVED);
    expect(result.rawResponse).toBe(APPROVED);
  });
});

describe('parseResponse — partial success check (all three must be 0)', () => {
  it('fails when only ResultCode is non-zero', () => {
    const xml = buildResponse({ ResultCode: '10041', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).success).toBe(false);
  });

  it('fails when only Status is non-zero', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '5', AshStatus: '0' });
    expect(parseResponse(xml).success).toBe(false);
  });

  it('fails when only AshStatus is non-zero', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '0', AshStatus: '4' });
    expect(parseResponse(xml).success).toBe(false);
  });
});

describe('parseResponse — credit company errors (AshStatus)', () => {
  it('uses ASH_ prefix for errorCode when AshStatus != 0', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '0', AshStatus: '4' });
    const result = parseResponse(xml);
    expect(result.errorCode).toBe('ASH_4');
  });

  it('returns "Declined by credit company" for AshStatus=4', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '0', AshStatus: '4' });
    expect(parseResponse(xml).errorMessage).toBe('Declined by credit company');
  });

  it('returns specific message for AshStatus=443 (void already transmitted)', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '0', AshStatus: '443' });
    expect(parseResponse(xml).errorMessage).toMatch(/already transmitted/);
  });

  it('returns generic credit company error for unknown AshStatus', () => {
    const xml = buildResponse({ ResultCode: '0', Status: '0', AshStatus: '99' });
    expect(parseResponse(xml).errorMessage).toMatch(/Credit company error/);
    expect(parseResponse(xml).errorMessage).toMatch(/99/);
  });
});

describe('parseResponse — Caspit-level errors (ResultCode)', () => {
  it('uses RC_ prefix for errorCode when AshStatus=0 but ResultCode != 0', () => {
    const xml = buildResponse({ ResultCode: '10044', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorCode).toBe('RC_10044');
  });

  it('10044 → User cancelled on terminal', () => {
    const xml = buildResponse({ ResultCode: '10044', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toBe('User cancelled on terminal');
  });

  it('10050 → Duplicate transaction', () => {
    const xml = buildResponse({ ResultCode: '10050', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toBe('Duplicate transaction (Xfield already used)');
  });

  it('10041 → Cannot reach Pinpad', () => {
    const xml = buildResponse({ ResultCode: '10041', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toBe('Cannot reach Pinpad');
  });

  it('10053 → Pinpad returned empty response', () => {
    const xml = buildResponse({ ResultCode: '10053', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toBe('Pinpad returned empty response');
  });

  it('10048 → Terminal error with Status in message', () => {
    const xml = buildResponse({ ResultCode: '10048', Status: '7', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toMatch(/Terminal error/);
    expect(parseResponse(xml).errorMessage).toMatch(/7/);
  });

  it('unknown ResultCode → generic terminal error', () => {
    const xml = buildResponse({ ResultCode: '99999', Status: '0', AshStatus: '0' });
    expect(parseResponse(xml).errorMessage).toMatch(/Terminal error/);
    expect(parseResponse(xml).errorMessage).toMatch(/99999/);
  });
});

describe('parseResponse — null/empty/malformed', () => {
  it('returns NO_RESPONSE for null', () => {
    expect(parseResponse(null).errorCode).toBe('NO_RESPONSE');
  });

  it('returns NO_RESPONSE for undefined', () => {
    expect(parseResponse(undefined).errorCode).toBe('NO_RESPONSE');
  });

  it('returns NO_RESPONSE for empty string', () => {
    expect(parseResponse('').errorCode).toBe('NO_RESPONSE');
  });

  it('returns PARSE_ERROR for completely malformed XML', () => {
    // Force a parse error by passing a Proxy that throws on regex match
    const badXml = new Proxy({}, {
      get() { throw new Error('unexpected'); }
    }) as any;
    expect(parseResponse(badXml).errorCode).toBe('PARSE_ERROR');
  });
});
