import MongoCrudClass from "./mongo.class.js";

import { MunicipalityDataSchema, type TMunicipality } from "@/models/schemas.js";
import Municipality from "@/models/municipality.model.js";

// Class instance
const MunicipalityClass = new MongoCrudClass<TMunicipality>(Municipality, MunicipalityDataSchema)
export default MunicipalityClass
