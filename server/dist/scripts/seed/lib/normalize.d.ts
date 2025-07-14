import type { TMunicipality, TProvinceData, TRegionData } from '@/models/schemas.js';
export type removeFields = '_id' | '__v' | 'createdAt' | 'updatedAt';
export type DRegion = Omit<TRegionData, removeFields | 'provinces'>;
export type DProvince = Omit<TProvinceData, removeFields | 'municipalities'>;
export type DMunicipality = Omit<TMunicipality, removeFields>;
/**
 * Transforms the regions data of `ExcelFactory` for `Region` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @returns {DRegion[]} List of `DRegion[]`
 */
export declare const normalizeRegions: (dataSet: any) => DRegion[];
/**
 * Transforms the provinces data of `ExcelFactory` with placeholder `regionId` for `Province` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @param {DRegion[]} regions list of `DRegion[]` objects
 * @returns {DProvince[]} List of `DProvince[]`
 */
export declare const normalizeProvinces: (dataSet: any, regions: DRegion[]) => DProvince[];
/**
 * Transforms the municipalities data of `ExcelFactory` with placeholder `regionId` and `provinceId` for `Municipality` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @param {DProvince[]} provinces list of `DProvince[]` objects
 * @returns {DMunicipality[]} List of `DMunicipality[]`
 */
export declare const normalizeMunicipalities: (dataSet: any, provinces: DProvince[]) => DMunicipality[];
/**
 * Replaces the value of `data[].regionId` or `data[].provinceId` with real Document `_id` value from the `keyValues` object.
 * @param {DProvince[] | DMunicipality[]} data `DProvince[] | DMunicipality[]` normalized data to insert into a collection.
 * @param {Record<string, string>} keyValues On Object with `data.name` as key and Document `_id` as value.
 * @param {string} key `regionId` or `provinceId` Document `_id` to put into the `keyValues` value.
 * @returns {DProvince[] | DMunicipality[]} `data` with real values of `regionId` or `provinceId`
 */
export declare const replaceId: (data: DProvince[] | DMunicipality[], keyValues: Record<string, string>, key: "regionId" | "provinceId") => ({
    provinceId?: string | undefined;
    regionId: string | import("mongoose").Types.ObjectId;
    name: string;
} | {
    provinceId: string | import("mongoose").Types.ObjectId;
    regionId: string | import("mongoose").Types.ObjectId;
    name: string;
    numDocs: number;
})[];
