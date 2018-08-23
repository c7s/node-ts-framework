import { Request, Response } from 'express';
import * as url from 'url';
import * as querystring from 'querystring';
import * as util from 'util';

export class PaginationByAttribute<T> {

  constructor(protected orderingAttributeName: keyof T) {}

  public async get(
    limit: number | undefined,
    callback: (limit: number | undefined) => Promise<T[]>,
    request: Request,
    response: Response,
  ): Promise<T[]> {
    if (undefined === limit) {
      return callback(undefined);
    }
    let data = await callback(limit + 1);
    const isHaveNextPage = data && data.length > limit;
    data = data.slice(0, limit);

    if (isHaveNextPage) {
      const nextOrderingAttibuteValue = data[data.length - 1][this.orderingAttributeName];
      /* tslint:disable-next-line:max-line-length */
      const orderingParamName = `after${(this.orderingAttributeName as string)[0].toUpperCase()}${(this.orderingAttributeName as string).slice(1)}`;

      const nextPageUrl = url.parse(request.url, true);
      nextPageUrl.search = '?' + querystring.stringify({
        ...nextPageUrl.query,
        [orderingParamName]: util.format(nextOrderingAttibuteValue),
      });

      response.links({ next: url.format(nextPageUrl) });
    }
    return data;
  }

}
