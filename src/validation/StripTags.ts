import { Transform, TransformOptions } from 'class-transformer';
import * as stripTags from 'striptags';

/* tslint:disable-next-line:function-name */
export function StripTags(
  options?: TransformOptions,
  stripTagsOptions?: { each?: boolean },
) {
  return Transform(
    (value) => {
      if (stripTagsOptions && stripTagsOptions.each) {
        if (Array.isArray(value)) {
          return value.map(stripTagsWrapper);
        }
      } else {
        return stripTagsWrapper(value);
      }
    },
    options,
  );
}

function stripTagsWrapper(value: string) {
  return undefined !== value && null !== value ? stripTags(value) : value;
}
