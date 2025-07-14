/**
 * Parses the `Error.message` from an Error object
 * @param error `Error` object
 * @returns `string` message parsed from the Error object
 */
const typedCatchError = (error: unknown) => {
  return error instanceof Error
    ? error.message
    : 'Unknown error' + error
}

/**
 * Checks if an `Error` has a `status` code
 * @param e `Error` object
 * @returns Flag indicating if an Error object has a `number` status property
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errorHasStatus(e: any): e is { status: number } {
  return typeof e.status === 'number'
}

/**
 * Class that appends a `status` code to the Error object
 */
class ServerError extends Error {
  status: string

  constructor(message: string, code: string) {
    super(message)

    this.name = this.constructor.name
    this.status = code
    Error.captureStackTrace(this, this.constructor)
  }
}

export {
  errorHasStatus,
  typedCatchError,
  ServerError
}
