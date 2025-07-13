import { RegionDataSchema, type TRegionData } from "@/models/schemas.js";
import Region from "@/models/region.model.js"
import RegionClass from "./region.class.js";

// Class instance
const RegionInstance = new RegionClass<TRegionData>(Region, RegionDataSchema)
export default RegionInstance
