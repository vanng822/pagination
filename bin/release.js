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

var paginationContent = fs.readFileSync('./lib/pagination.js');
var minified = uglifyJs.minify(paginationContent + ';', {fromString: true});
if (program.dry) {
	console.log(minified.code);
} else {
	fs.writeFileSync('./release/pagination.min.js', minified.code);
}

Object.keys(versions).forEach(function(v) {
	var releaseContent = [];
	var output = './release/pagination.' + v + '.min.js';
	releaseContent.push(paginationContent);
	versions[v].forEach(function(m) {
		releaseContent.push(fs.readFileSync('./lib/' + m + '.js'));
		releaseContent.push('exports.module(pagination, pagination.util);');
	});
	var minified = uglifyJs.minify(releaseContent.join(";"), {fromString: true});
	
	if (program.dry) {
		console.log(minified.code);
	} else {
		fs.writeFileSync(output, minified.code);
	}
});
