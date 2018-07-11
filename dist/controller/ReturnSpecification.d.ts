/**
 * Support specifying REST list options:
 * to switch return mode: return=only:count, return=only:searchIndex
 * to return additional fields: return=addition:description,content,commentsCount
 */
export declare class ReturnSpecification {
    additions: string[];
    protected onlyValue?: string;
    constructor(returnSpec?: string);
    only(only: string): boolean;
    addition(name: string): boolean;
}
