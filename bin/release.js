#! /usr/bin/env node
var fs = require('fs');
var uglifyJs = require('uglify-js');
var program = require('commander');

program
.option('-r, --dry', 'Run dry')
.parse(process.argv);


var versions = {
	'et': ['template', 'template_paginator'],
	'full': ['template', 'template_paginator', 'search_paginator', 'item_paginator'],
	'i': ['item_paginator'], 
	'is': ['item_paginator', 'search_paginator'],
	's': ['search_paginator'],
	't': ['template_paginator']
};

var paginationContent = [];
paginationContent.push(fs.readFileSync('./lib/browser.js'));
paginationContent.push(fs.readFileSync('./lib/pagination.js'));

var minified = uglifyJs.minify(paginationContent.join(';'), {fromString: true});
if (program.dry) {
	console.log(minified.code);
} else {
	fs.writeFileSync('./release/pagination.min.js', minified.code);
}

Object.keys(versions).forEach(function(v) {
	var releaseContent = paginationContent.slice(0);
	var output = './release/pagination.' + v + '.min.js';
	versions[v].forEach(function(m) {
		releaseContent.push(fs.readFileSync('./lib/' + m + '.js'));
		releaseContent.push('exports.module(pagination, pagination.util);');
	});
	var minified = uglifyJs.minify(releaseContent.join(";"), {fromString: true});
	
	if (program.dry) {
		console.log(releaseContent.join(";"));
		console.log(minified.code);
	} else {
		fs.writeFileSync(output, minified.code);
	}
});
