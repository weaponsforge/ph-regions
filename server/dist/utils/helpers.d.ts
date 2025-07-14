/**
 * Get the full file path of the current directory of a module file equivalent to `"__dirname"`from
 * scripts running as ESM modules whose package.json has `"type": "module"`.
 * @param {string} moduleFile - File URL of the current module being executed: `"import.meta.url"`
 * @returns {string} Full file path to the directory of the calling file/module also know as `__dirname` in CommonJS
 */
export declare const directory: (moduleFile: string) => string;
/**
 * Returns the full system file path to a file
 * @param {string} moduleFile - File URL of the current module being executed: `"import.meta.url"`
 * @param {string} fileName - File name relative to the calling directory (`moduleFile`), eg: `input.txt`, `../input.txt`, or `some/folder/input.txt`
 * @returns {string} Full file path to a file
 */
export declare const file: (moduleFile: string, fileName: string) => string;
