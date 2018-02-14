#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../bootstrap");
const di_1 = require("../di");
const Type_1 = require("../Type");
const dbConfig = di_1.container.get(Type_1.Type.DbConfig);
process.stdout.write(JSON.stringify(dbConfig));
//# sourceMappingURL=db-config.js.map