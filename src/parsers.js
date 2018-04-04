import { safeLoad } from 'js-yaml';
import { _ as lodash } from 'lodash';


const parsers = [
  {
    type: '.yml',
    parse: file => safeLoad(file),
  },
  {
    type: '.json',
    parse: file => JSON.parse(file),
  },
];

export default format => lodash.find(parsers, ({ type }) => type === format);
