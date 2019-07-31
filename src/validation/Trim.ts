import { Transform, TransformOptions } from 'class-transformer';

/* tslint:disable-next-line:function-name */
export function Trim(
  options?: TransformOptions,
  trimOptions?: { each?: boolean },
) {
  return Transform(
    (value: string | string[]) => {
      if (trimOptions && trimOptions.each) {
        if (Array.isArray(value)) {
          return value.map(trimWrapper);
        }
      } else {
        return trimWrapper(value as string);
      }
    },
    options,
  );
}

function trimWrapper(value: string) {
  return value ? value.trim() : value;
}
