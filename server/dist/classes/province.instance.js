import MongoCrudClass from "./mongo.class.js";
import { ProvinceDataSchema } from "@/models/schemas.js";
import Province from "@/models/province.model.js";
// Class instance
const ProvinceClass = new MongoCrudClass(Province, ProvinceDataSchema);
export default ProvinceClass;
//# sourceMappingURL=province.instance.js.map