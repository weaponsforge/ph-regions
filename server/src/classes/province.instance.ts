import MongoCrudClass from "./mongo.class.js";

import { ProvinceDataSchema, type TProvinceData } from "@/models/schemas.js";
import Province from "@/models/province.model.js";

// Class instance
const ProvinceClass = new MongoCrudClass<TProvinceData>(Province, ProvinceDataSchema)
export default ProvinceClass
