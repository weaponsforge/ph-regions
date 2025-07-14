const whitelist = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH'],
    optionsSuccessStatus: 200
};
export { corsOptions, whitelist };
//# sourceMappingURL=corsOptions.js.map