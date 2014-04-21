var pkgs = ['item_paginator', 'search_paginator', 'template_paginator', 'template'];
var pagination = require('./lib/pagination.js');
var util = require('util');
var i, len, pkg;
for (i = 0, len = pkgs.length; i < len; i++) {
	pkg = require('./lib/' + pkgs[i]  + '.js');
	pkg.module(pagination, util);
}

module.exports = pagination;
