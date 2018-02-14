#!/usr/bin/env node
import '../bootstrap';
import { DbConfig } from '@c7s/config';
import { container } from '../di';
import { Type } from '../Type';

const dbConfig = container.get<DbConfig>(Type.DbConfig);
process.stdout.write(JSON.stringify(dbConfig));
