import { Connection } from 'mongoose';
/** MongoDB connection */
declare const db: Connection;
/**
 * Initializes a connection to the MongoDB.
 * @example
 * ```
 * connectDb().then(() => {
 *   // Code here
 * })
 * ```
 */
declare const connectDb: () => Promise<void>;
/** Disconnects the connection from the MongoDB */
declare const disconnectDb: () => void;
export { db, connectDb, disconnectDb };
