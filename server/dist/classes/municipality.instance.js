import MongoCrudClass from "./mongo.class.js";
import { MunicipalityDataSchema } from "@/models/schemas.js";
import Municipality from "@/models/municipality.model.js";
// Class instance
const MunicipalityClass = new MongoCrudClass(Municipality, MunicipalityDataSchema);
export default MunicipalityClass;
//# sourceMappingURL=municipality.instance.js.map