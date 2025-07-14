declare const whitelist: string[];
declare const corsOptions: {
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => void;
    methods: string[];
    optionsSuccessStatus: number;
};
export { corsOptions, whitelist };
