import lodashIsstring = require('lodash.isstring');
import * as stripTags from 'striptags';

export function deepStripTags(object: { [index: string]: any }, attributes?: string[]) {
  for (const attribute in Object.keys(object)) {
    if (undefined !== attributes && -1 === attributes.indexOf(attribute)) {
      continue;
    }
    if (!lodashIsstring(object[attribute])) {
      continue;
    }
    object[attribute] = stripTags(object[attribute]);
  }
}
