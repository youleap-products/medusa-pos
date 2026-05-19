// Re-export shim. Real implementation lives in ./storage/.
// This file exists so `@/utils/storage` resolves cleanly without conflicting
// with the directory module — Metro picks the `.ts` file before falling back
// to a directory's `index.ts`.
export * from './storage/index';
