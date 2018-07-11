"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const querystring = require("querystring");
const util = require("util");
class ByAttribute {
    constructor(orderingAttributeName) {
        this.orderingAttributeName = orderingAttributeName;
    }
    async get(limit, callback, request, response) {
        if (undefined === limit) {
            return callback(undefined);
        }
        let data = await callback(limit + 1);
        const isHaveNextPage = data && data.length > limit;
        data = data.slice(0, limit);
        if (isHaveNextPage) {
            const nextOrderingAttibuteValue = data[data.length - 1][this.orderingAttributeName];
            /* tslint:disable-next-line:max-line-length */
            const orderingParamName = `after${this.orderingAttributeName[0].toUpperCase()}${this.orderingAttributeName.slice(1)}`;
            const nextPageUrl = url.parse(request.url, true);
            nextPageUrl.search = '?' + querystring.stringify(Object.assign({}, nextPageUrl.query, { [orderingParamName]: util.format(nextOrderingAttibuteValue) }));
            response.links({ next: url.format(nextPageUrl) });
        }
        return data;
    }
}
exports.ByAttribute = ByAttribute;
//# sourceMappingURL=ByAttribute.js.map