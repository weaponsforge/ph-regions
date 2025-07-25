import MongoCrudClass from './mongo.class.js'
import Municipality from '@/models/municipality.model.js'
import { MunicipalityDataSchema } from '@/models/schemas.js'

// Class instance
const MunicipalityClass = new MongoCrudClass(Municipality, MunicipalityDataSchema)
export default MunicipalityClass
