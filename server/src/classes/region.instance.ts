import MongoCrudClass from "./mongo.class.js";

import { RegionDataSchema, type TRegionData } from "@/models/schemas.js";
import Region from "@/models/region.model.js";

// Class instance
const RegionClass = new MongoCrudClass<TRegionData>(Region, RegionDataSchema)
export default RegionClass
