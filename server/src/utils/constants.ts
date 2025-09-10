import dotenv from 'dotenv'
dotenv.config()

export const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:3001'

/**
 * Builds a string containing MongoDB metadata fields to exclude from a query result
 * @param isIncludeMeta Flag to include or exclude the MongoDB metadata fields
 * @returns
 */
export const buildExcludedMetaFields = (isIncludeMeta: boolean = false): string => {
  return isIncludeMeta
    ? '-__v'
    : '-__v -createdAt -updatedAt'
}

export const FULL_API_METADATA = {
  description: 'List of hierarchical (regions, provinces, municipalities) location data of the Philippines',
  source: 'PAGASA Seasonal Rainfall Analysis Table (regions and provinces) and 10-Day Weather Forecast Excel file (provinces and municipalities)',
  dateCreated: '2022/08/03'
}

/** Field constants for omitting common MongoDB doc fields */
export const COMMON_FIELDS_TO_OMIT = ['__v', 'createdAt', 'updatedAt'] as const
