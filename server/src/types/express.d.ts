import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    /** Parsed query / validation output injected by `validate` middleware. */
    options: OptionsData;
  }
}

export type OptionsData = {
  includeMeta?: boolean;
}
