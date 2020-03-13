"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const querystring = require("querystring");
class PaginationByOffset {
    async get(limit, offset, callback, request, response) {
        if (undefined === limit || 0 === limit) {
            return callback(undefined);
        }
        let data = await callback(limit + 1);
        const isHaveNextPage = data && data.length > limit;
        data = data.slice(0, limit);
        if (isHaveNextPage) {
            const nextPageUrl = url.parse(request.url, true);
            // tslint:disable-next-line:prefer-template
            nextPageUrl.search = '?' + querystring.stringify(Object.assign(Object.assign({}, nextPageUrl.query), { offset: (offset || 0) + limit }));
            response.links({ next: url.format(nextPageUrl) });
        }
        return data;
    }
}
exports.PaginationByOffset = PaginationByOffset;
//# sourceMappingURL=PaginationByOffset.js.map