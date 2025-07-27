import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    /** Parsed query / validation output injected by `validate` middleware. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
  }
}
