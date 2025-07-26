/**
 * Builds a string containing MongoDB metadata fields to exclude from a query result
 * @param isIncludeMeta Flag to include or exclude the MongoDB metadata fields
 * @returns
 */
export const buildExcludedMetaFields = (isIncludeMeta: boolean): string => {
  return isIncludeMeta
    ? '-__v'
    : '-__v -createdAt -updatedAt'
}
