import { ProvinceDataSchema } from '@/models/schemas.js'
import Province from '@/models/province.model.js'
import ProvinceClass from './province.class.js'

// Class instance
const ProvinceInstance = new ProvinceClass(Province, ProvinceDataSchema)
export default ProvinceInstance
