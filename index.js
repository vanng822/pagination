var pkgs = ['item_paginator', 'search_paginator', 'template_paginator', 'template'];
var pagination = require('./lib/pagination.js');
var util = require('util');
require('./lib/item_paginator')(pagination, util);
require('./lib/search_paginator')(pagination, util);
require('./lib/template_paginator')(pagination, util);
require('./lib/template')(pagination, util);

module.exports = pagination;
