import { StatsDataSchema } from '@/models/schemas.js'
import Stats from '@/models/stats.model.js'
import MongoCrudClass from './mongo.class.js'

const StatsInstance = new MongoCrudClass(Stats, StatsDataSchema)
export default StatsInstance
