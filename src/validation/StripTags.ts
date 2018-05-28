import { Transform, TransformOptions } from 'class-transformer';
import * as stripTags from 'striptags';

/* tslint:disable-next-line:function-name */
export function StripTags(options?: TransformOptions) {
  return Transform(
    value =>
      undefined !== value && null !== value ? stripTags(value) : value,
    options,
  );
}
