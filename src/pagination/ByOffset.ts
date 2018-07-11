import { Request, Response } from 'express';
import * as url from 'url';
import * as querystring from 'querystring';

export class ByOffset<T> {

  public async get(
    limit: number | undefined,
    offset: number | undefined,
    callback: (limit: number | undefined) => Promise<T[]>,
    request: Request,
    response: Response,
  ): Promise<T[]> {
    if (undefined === limit || 0 === limit) {
      return callback(undefined);
    }
    let data = await callback(limit + 1);
    const isHaveNextPage = data && data.length > limit;
    data = data.slice(0, limit);

    if (isHaveNextPage) {
      const nextPageUrl = url.parse(request.url, true);
      nextPageUrl.search = '?' + querystring.stringify({
        ...nextPageUrl.query,
        offset: (offset || 0) + limit,
      });

      response.links({ next: url.format(nextPageUrl) });
    }
    return data;
  }

}
