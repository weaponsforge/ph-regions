import { ZodObject } from '@/types/types.js';
import { Schema } from 'mongoose';
import { Model } from '@/types/types.js';
/**
 * @class MongoCRUD
 * @description This is an abstract class to be implemented by classes that interface with MongoDB
 */
class MongoCRUD {
    /** Zod schema for data validation */
    schema;
    /** Mongoose schema (model) */
    model;
    constructor(model, schema) {
        if (!model || !schema) {
            throw new Error('Model and schema are required');
        }
        this.model = model;
        this.schema = schema;
    }
    /**
     * Checks if `this.schema` and `this.model` are present.
     * @throws {Error} Throws an error if `this.schema` or `this.model` is missing.
     */
    checkInternals() {
        if (!this.schema || !this.model) {
            throw new Error('Missing or schema are required');
        }
    }
    /**
     * Parses input parameters for valid type-checks and required input parameters
     * @param params Key-value pairs properties of `T`
     * @throws Zod validation and parsing errors
     */
    safeParse(params) {
        this.checkInternals();
        const resutlt = this.schema.safeParse(params);
        if (!resutlt.success) {
            throw new Error('Invalid data format');
        }
    }
}
export default MongoCRUD;
//# sourceMappingURL=mongo.abstract.js.map