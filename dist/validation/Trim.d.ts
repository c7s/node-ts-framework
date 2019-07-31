import { TransformOptions } from 'class-transformer';
export declare function Trim(options?: TransformOptions, trimOptions?: {
    each?: boolean;
}): (target: any, key: string) => void;
