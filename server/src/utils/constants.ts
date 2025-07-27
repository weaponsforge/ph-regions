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

export const fullApiMetaData = {
  description: 'List of hierarchical (regions, provinces municipalities) location data of the Philippines',
  source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)'
}
