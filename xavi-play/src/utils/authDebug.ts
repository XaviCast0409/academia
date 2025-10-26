// Minimal auth debug helper used by the store when authentication issues occur.
// Keep it simple to avoid heavy dependencies in the app runtime.
export const debugAuthState = async (): Promise<void> => {
  // No-op in production; used for development to quickly inspect auth storage.
  // You can extend this function locally when debugging.
  // eslint-disable-next-line no-console
  console.info('debugAuthState called');
};

export default { debugAuthState };
