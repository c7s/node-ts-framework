"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function padDatePart(str) {
    return ('0' + str).slice(-2);
}
function consoleErrorTimestamp(message) {
    const now = new Date();
    console.error(
    /* tslint:disable:max-line-length */
    `${now.getFullYear()}-${padDatePart(now.getMonth() + 1)}-${padDatePart(now.getDate())} ${padDatePart(now.getHours())}:${padDatePart(now.getMinutes())}:${padDatePart(now.getSeconds())}`, 
    /* tslint:enable:max-line-length */
    message);
}
exports.consoleErrorTimestamp = consoleErrorTimestamp;
//# sourceMappingURL=consoleErrorTimestamp.js.map