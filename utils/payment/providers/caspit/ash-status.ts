/**
 * Caspit/Ashrait `<AshStatus>` lookup — credit-company-level response codes
 * returned from the PinPad. Hebrew messages match what the cashier or the
 * customer would expect to see; categories drive the cashier-facing copy
 * (`getUserFacingMessage`) and any UX styling (icon, color).
 */

export type AshStatusCategory =
  | 'card' // card-level issue: try a different card
  | 'limit' // ceiling/limit: contact issuer
  | 'comm' // network/timeout: retry
  | 'data' // bad input data: report
  | 'config' // terminal misconfigured: admin action
  | 'device' // PinPad hardware: check cable / restart
  | 'user' // user cancelled / timed out
  | 'unknown';

export interface AshStatusInfo {
  ok: boolean;
  msg: string;
  category?: AshStatusCategory;
}

export const ASH_STATUS: Record<number, AshStatusInfo> = {
  // ───── Success ─────
  0: { ok: true, msg: 'מאושר' },
  777: { ok: true, msg: 'תקין, ניתן להמשיך' },

  // ───── Card declined ─────
  1: { ok: false, msg: 'הכרטיס חסום', category: 'card' },
  2: { ok: false, msg: 'הכרטיס מדווח כגנוב', category: 'card' },
  3: { ok: false, msg: 'יש להתקשר לחברת האשראי', category: 'card' },
  4: { ok: false, msg: 'העסקה לא אושרה', category: 'card' },
  5: { ok: false, msg: 'הכרטיס מזוייף', category: 'card' },
  6: { ok: false, msg: 'CVV שגוי', category: 'card' },
  9: { ok: false, msg: 'דחייה - נתק בתקשורת', category: 'comm' },
  10: { ok: false, msg: 'אישור חלקי', category: 'card' },
  11: { ok: false, msg: 'חוסר בנקודות/הטבה', category: 'card' },
  12: { ok: false, msg: 'הכרטיס לא מורשה במסוף', category: 'card' },
  13: { ok: false, msg: 'דחייה - קוד יתרה שגוי', category: 'card' },
  14: { ok: false, msg: 'הכרטיס לא משוייך לרשת', category: 'card' },
  15: { ok: false, msg: 'הכרטיס אינו בתוקף', category: 'card' },
  16: { ok: false, msg: 'אין הרשאה לסוג מטבע', category: 'config' },
  17: { ok: false, msg: 'אין הרשאה לסוג אשראי', category: 'config' },
  26: { ok: false, msg: 'מספר תעודת זהות שגוי', category: 'card' },

  // ───── Limits ─────
  41: { ok: false, msg: 'חובת שאילתא בגין תקרה', category: 'limit' },
  42: { ok: false, msg: 'חובת שאילתא (לא רק תקרה)', category: 'limit' },

  // ───── Auth / config ─────
  250: { ok: false, msg: 'בעיית זיהוי - בדוק שם משתמש/סיסמה/מסוף', category: 'config' },
  255: { ok: false, msg: 'תקלה כללית - יש לפנות לשב"א', category: 'comm' },
  256: { ok: false, msg: 'מספר עסקה לא ייחודי', category: 'data' },
  257: { ok: false, msg: 'לא נמצא מידע נדרש', category: 'data' },
  260: { ok: false, msg: 'פרמטר שגוי (לרוב ערך לא נומרי)', category: 'data' },
  280: { ok: false, msg: 'Timeout - נסה שוב', category: 'comm' },

  // ───── Acquirer permissions ─────
  300: { ok: false, msg: 'אין הרשאה לסוג עסקה', category: 'config' },
  301: { ok: false, msg: 'אין הרשאה למטבע', category: 'config' },
  303: { ok: false, msg: 'אין הרשאה לעסקה ללא כרטיס נוכח', category: 'config' },
  304: { ok: false, msg: 'אין הרשאה לאשראי', category: 'config' },

  // ───── Installments ─────
  401: { ok: false, msg: 'יותר מדי תשלומים - פנה לחברת האשראי', category: 'data' },
  402: { ok: false, msg: 'מעט מדי תשלומים - פנה לחברת האשראי', category: 'data' },
  403: { ok: false, msg: 'סכום עסקה נמוך מהמינימום לקרדיט', category: 'data' },
  404: { ok: false, msg: 'לא הוזן מספר תשלומים', category: 'data' },
  405: { ok: false, msg: 'חסר סכום תשלום ראשון/קבוע', category: 'data' },
  406: { ok: false, msg: 'סה"כ העסקה לא תואם לתשלומים', category: 'data' },

  // ───── Data validation ─────
  414: { ok: false, msg: 'תאריך חיוב מאוחר משנה', category: 'data' },
  415: { ok: false, msg: 'הוזנו נתונים לא תקינים', category: 'data' },
  416: { ok: false, msg: 'תאריך תוקף במבנה לא תקין', category: 'data' },
  417: { ok: false, msg: 'מספר מסוף אינו תקין', category: 'config' },
  418: { ok: false, msg: 'חסרים פרמטרים חיוניים', category: 'data' },
  420: { ok: false, msg: 'מספר כרטיס לא תקין', category: 'card' },
  421: { ok: false, msg: 'נתונים לא ולידים', category: 'data' },
  424: { ok: false, msg: 'שדה לא נומרי', category: 'data' },
  425: { ok: false, msg: 'רשומה כפולה', category: 'data' },
  431: { ok: false, msg: 'שגיאה כללית', category: 'unknown' },
  447: { ok: false, msg: 'מספר כרטיס שגוי', category: 'card' },

  // ───── User actions ─────
  500: { ok: false, msg: 'העסקה בוטלה ע"י המשתמש', category: 'user' },

  // ───── PinPad device ─────
  700: { ok: false, msg: 'העסקה נדחתה ע"י מכשיר ה-PinPad', category: 'device' },
  701: { ok: false, msg: 'שגיאה במכשיר PinPad', category: 'device' },
  704: { ok: false, msg: 'העסקה בוטלה', category: 'user' },
  705: { ok: false, msg: 'המשתמש ביטל', category: 'user' },
  706: { ok: false, msg: 'תם זמן ההמתנה למשתמש', category: 'user' },
  707: { ok: false, msg: 'הכרטיס הוצא', category: 'user' },
  723: { ok: false, msg: 'Timeout מול השרת', category: 'comm' },
  725: { ok: false, msg: 'אימות PIN נכשל', category: 'card' },
  731: { ok: false, msg: 'כרטיס לא הוכנס', category: 'user' },
};

/**
 * Looks up an AshStatus code. Returns a generic `unknown` info object for any
 * code missing from the table so callers can always trust the return shape.
 */
export function getAshStatusInfo(code: string | number | undefined | null): AshStatusInfo {
  const num = typeof code === 'number' ? code : parseInt(String(code ?? ''), 10);
  if (!Number.isFinite(num)) {
    return { ok: false, msg: `שגיאה לא ידועה (קוד ${code})`, category: 'unknown' };
  }
  return ASH_STATUS[num] ?? { ok: false, msg: `שגיאה לא ידועה (קוד ${code})`, category: 'unknown' };
}

/**
 * Cashier-facing message that wraps the raw code description with category
 * context — e.g. a `card` error prompts "try another card", a `comm` error
 * suggests retrying, a `config` error tells the cashier to call the admin.
 * Returns `null` for success codes so callers can short-circuit cleanly.
 */
export function getUserFacingMessage(code: string | number | undefined | null): string | null {
  const info = getAshStatusInfo(code);
  if (info.ok) return null;

  switch (info.category) {
    case 'card':
      return `הכרטיס נדחה: ${info.msg}. נסה כרטיס אחר.`;
    case 'limit':
      return `${info.msg}. צור קשר עם חברת האשראי.`;
    case 'comm':
      return `בעיית תקשורת: ${info.msg}. נסה שוב בעוד רגע.`;
    case 'data':
      return `שגיאת נתונים: ${info.msg}. פנה לתמיכה.`;
    case 'config':
      return `שגיאת הגדרות: ${info.msg}. פנה למנהל המערכת.`;
    case 'device':
      return `שגיאה במכשיר: ${info.msg}. בדוק חיבור.`;
    case 'user':
      return info.msg;
    default:
      return `שגיאה (${code}): ${info.msg}`;
  }
}
