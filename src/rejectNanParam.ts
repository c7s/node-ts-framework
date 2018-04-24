import { BadRequestError } from '@c7s/http-errors';

export function rejectNanParam(param: string, value: number) {
  if (isNaN(value)) {
    throw new BadRequestError(`${param} must be a number`);
  }
}
