export declare type QueryFailedError = {
    name: string;
    code: number;
    constraint: string;
};
export declare class DatabaseErrors extends Error {
    static isUniqueConstraintViolation(error: QueryFailedError): boolean;
    static getConstraintName(error: QueryFailedError): string;
}
