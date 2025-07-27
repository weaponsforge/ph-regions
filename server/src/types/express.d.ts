import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
  }
}
