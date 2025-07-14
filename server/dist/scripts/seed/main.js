import { ExcelFactory, ExcelFile } from 'ph-municipalities';
import { connectDb, disconnectDb } from '@/utils/db.js';
import Region from '@/models/region.model.js';
import Province from '@/models/province.model.js';
import Municipality from '@/models/municipality.model.js';
import { normalizeRegions, normalizeProvinces, normalizeMunicipalities, replaceId, } from './lib/normalize.js';
import { seed } from './lib/seed.js';
connectDb().then(async () => {
    const dataSet = new ExcelFactory();
    // Normalize data
    const regions = normalizeRegions(dataSet);
    let provinces = normalizeProvinces(dataSet, regions);
    let municipalities = normalizeMunicipalities(dataSet, provinces);
    try {
        // Seed regions collection
        const regionKeyIDs = await seed(Region, regions, { isReturnMapping: true });
        provinces = replaceId(provinces, regionKeyIDs, 'regionId');
        // Seed provinces collection
        const provinceKeyIDs = await seed(Province, provinces, { isReturnMapping: true });
        // Replace placeholder `regionId` and `provinceId` IDs in the local municipalities
        municipalities = replaceId(municipalities, regionKeyIDs, 'regionId');
        municipalities = replaceId(municipalities, provinceKeyIDs, 'provinceId');
        // Seed municipalities collection
        await seed(Municipality, municipalities);
    }
    catch (error) {
        throw error;
    }
    await disconnectDb();
});
//# sourceMappingURL=main.js.map