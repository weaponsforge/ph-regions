import { ZodObject } from 'zod';
export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params
    });
    if (!result.success) {
        return res.status(400).json({
            message: 'Validation Error',
            issues: result?.error?.issues
        });
    }
    next();
};
//# sourceMappingURL=validate.js.map