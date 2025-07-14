import {} from "@/types/types.js";
import RegionInstance from "@/classes/region.instance.js";
export const createRegion = async (req, res, next) => {
    const { name } = req.body;
    try {
        const region = await RegionInstance.create({ name });
        return res.status(201).json({
            success: true,
            data: region
        });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
export const getRegions = async (req, res, next) => {
    try {
        const regions = await RegionInstance.list(false);
        return res.status(200).json(regions);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
export const getRegionsFull = async (req, res, next) => {
    try {
        const regions = await RegionInstance.listAll();
        return res.status(200).json(regions);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};
//# sourceMappingURL=region.js.map