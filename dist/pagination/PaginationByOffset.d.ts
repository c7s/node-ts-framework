import { Request, Response } from 'express';
export declare class PaginationByOffset<T> {
    get(limit: number | undefined, offset: number | undefined, callback: (limit: number | undefined) => Promise<T[]>, request: Request, response: Response): Promise<T[]>;
}
