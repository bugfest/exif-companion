export function prettyStringify(obj: any) {
    return JSON.stringify(obj, null, 2)
}

/**
 * @param error the error object.
 * @returns if given error object is a NodeJS error.
 */
export const isNodeError = (error: Error | unknown): error is NodeJS.ErrnoException =>
    error instanceof Error