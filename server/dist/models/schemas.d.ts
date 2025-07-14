import { z } from 'zod';
import { Types } from '@/types/types.js';
export declare const MunicipalityDataSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    __v: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    regionId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
    provinceId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
    name: z.ZodString;
    numDocs: z.ZodNumber;
}, z.core.$strip>;
export declare const ProvinceDataSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    __v: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    regionId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
    name: z.ZodString;
    municipalities: z.ZodOptional<z.ZodArray<z.ZodObject<{
        _id: z.ZodOptional<z.ZodString>;
        __v: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
        regionId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
        provinceId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
        name: z.ZodString;
        numDocs: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const RegionDataSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    __v: z.ZodOptional<z.ZodNumber>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    name: z.ZodString;
    abbrev: z.ZodNullable<z.ZodString>;
    regionalName: z.ZodOptional<z.ZodString>;
    regionalCode: z.ZodNullable<z.ZodString>;
    provinces: z.ZodOptional<z.ZodArray<z.ZodObject<{
        _id: z.ZodOptional<z.ZodString>;
        __v: z.ZodOptional<z.ZodNumber>;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
        regionId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
        name: z.ZodString;
        municipalities: z.ZodOptional<z.ZodArray<z.ZodObject<{
            _id: z.ZodOptional<z.ZodString>;
            __v: z.ZodOptional<z.ZodNumber>;
            createdAt: z.ZodOptional<z.ZodDate>;
            updatedAt: z.ZodOptional<z.ZodDate>;
            regionId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
            provinceId: z.ZodUnion<[z.ZodCustom<Types.ObjectId, Types.ObjectId>, z.ZodString]>;
            name: z.ZodString;
            numDocs: z.ZodNumber;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type TRegionData = z.infer<typeof RegionDataSchema>;
export type TProvinceData = z.infer<typeof ProvinceDataSchema>;
export type TMunicipality = z.infer<typeof MunicipalityDataSchema>;
