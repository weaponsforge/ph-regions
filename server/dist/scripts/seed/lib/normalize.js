import { ExcelFactory } from 'ph-municipalities';
/**
 * Transforms the regions data of `ExcelFactory` for `Region` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @returns {DRegion[]} List of `DRegion[]`
 */
export const normalizeRegions = (dataSet) => {
    const regionNames = dataSet.listRegions('name');
    const regionAbbrevs = dataSet.listRegions('abbrev');
    const regionalNums = dataSet.listRegions('region_num');
    const regionalNames = dataSet.listRegions('region_name');
    return regionNames.reduce((list, item, index) => {
        const region = {
            name: item,
            abbrev: regionAbbrevs[index],
            regionalName: regionalNames[index],
            regionalCode: regionalNums[index]
        };
        return [...list, region];
    }, []);
};
/**
 * Transforms the provinces data of `ExcelFactory` with placeholder `regionId` for `Province` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @param {DRegion[]} regions list of `DRegion[]` objects
 * @returns {DProvince[]} List of `DProvince[]`
 */
export const normalizeProvinces = (dataSet, regions) => {
    return regions.reduce((list, region) => {
        const provincesByRegion = dataSet.listProvinces(region.name);
        const provinceItems = provincesByRegion.reduce((provinceList, province) => {
            const provinceObj = {
                regionId: region.name,
                name: province
            };
            return [...provinceList, provinceObj];
        }, []);
        return [...list, ...provinceItems];
    }, []);
};
/**
 * Transforms the municipalities data of `ExcelFactory` with placeholder `regionId` and `provinceId` for `Municipality` model input
 * @param {ExcelFactory} dataSet - Instance of an `ExcelFactory` class
 * @param {DProvince[]} provinces list of `DProvince[]` objects
 * @returns {DMunicipality[]} List of `DMunicipality[]`
 */
export const normalizeMunicipalities = (dataSet, provinces) => {
    return provinces.reduce((list, province) => {
        const { regionId, name } = province;
        const municipalityList = dataSet.listMunicipalities({ provinces: [name] });
        if (municipalityList[name] === undefined) {
            return list;
        }
        const municipalityItems = municipalityList?.[name].reduce((municipalityList, municipality) => {
            const municipalityObj = {
                regionId,
                provinceId: name,
                name: municipality,
                numDocs: 0
            };
            return [...municipalityList, municipalityObj];
        }, []);
        return [...list, ...municipalityItems];
    }, []);
};
/**
 * Replaces the value of `data[].regionId` or `data[].provinceId` with real Document `_id` value from the `keyValues` object.
 * @param {DProvince[] | DMunicipality[]} data `DProvince[] | DMunicipality[]` normalized data to insert into a collection.
 * @param {Record<string, string>} keyValues On Object with `data.name` as key and Document `_id` as value.
 * @param {string} key `regionId` or `provinceId` Document `_id` to put into the `keyValues` value.
 * @returns {DProvince[] | DMunicipality[]} `data` with real values of `regionId` or `provinceId`
 */
export const replaceId = (data, keyValues, key) => {
    return data.map(item => {
        const regionIdStr = ({ regionId: keyValues[item.regionId.toString()] });
        return {
            ...item,
            ...(key === 'regionId' && regionIdStr),
            ...(key === 'provinceId' && 'provinceId' in item && ({ provinceId: keyValues[item.provinceId.toString()] }))
        };
    });
};
//# sourceMappingURL=normalize.js.map