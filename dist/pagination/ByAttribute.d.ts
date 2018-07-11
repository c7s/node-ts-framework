import { Request, Response } from 'express';
export declare class ByAttribute<T> {
    protected orderingAttributeName: keyof T;
    constructor(orderingAttributeName: keyof T);
    get(limit: number | undefined, callback: (limit: number | undefined) => Promise<T[]>, request: Request, response: Response): Promise<T[]>;
}
