var util = require('util');
var pagination = require('./lib/pagination');
require('./lib/item_paginator').module(pagination, util);
require('./lib/search_paginator').module(pagination, util);
require('./lib/template_paginator').module(pagination, util);
require('./lib/template').module(pagination, util);

module.exports = pagination;
