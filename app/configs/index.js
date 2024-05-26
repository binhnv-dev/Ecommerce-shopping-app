import _ from 'lodash';
import { defaultConfig } from './default.config';
import { overrideConfig } from './override.config';
export const config = _.defaultsDeep(overrideConfig, defaultConfig);
