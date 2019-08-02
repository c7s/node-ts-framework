import { TransformOptions } from 'class-transformer';
export declare function StripTags(options?: TransformOptions, stripTagsOptions?: {
    each?: boolean;
}): (target: any, key: string) => void;
