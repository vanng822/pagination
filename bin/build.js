#! /usr/bin/env node
var fs = require('fs');
var program = require('commander');
var uglifyJs = require('uglify-js');
var pkgs = [];
var releaseContent = [];
program
	.option('-o, --output <path>', 'Output file', String)
	.option('-e, --template-engine', 'Include template engine')
	.option('-i, --item', 'Include ItemPaginator')
	.option('-s, --search', 'Include SearchPaginator')
	.option('-t, --template', 'Include TemplatePaginator')
	.option('-a, --all', 'Include all: Template Engine, ItemPaginator, SearchPaginator, TemplatePaginator')
	.parse(process.argv);

if (program.all) {
	pkgs.push('template');
	pkgs.push('item_paginator');
	pkgs.push('search_paginator');
	pkgs.push('template_paginator');
} else {
	if (program.templateEngine) {
		pkgs.push('template');
	}
	if (program.item) {
		pkgs.push('item_paginator');
	}
	if (program.search) {
		pkgs.push('search_paginator');
	}
	if (program.template) {
		pkgs.push('template_paginator');
	}
}

releaseContent.push(fs.readFileSync('./lib/browser.js'));
releaseContent.push(fs.readFileSync('./lib/pagination.js'));
pkgs.forEach(function(m) {
	releaseContent.push(fs.readFileSync('./lib/' + m + '.js'));
	releaseContent.push('exports.module(pagination, pagination.util);');
});
var content = releaseContent.join(";");
var minified = uglifyJs.minify(content, {fromString: true});

if (program.output) {
	fs.writeFileSync(program.output, minified.code);
} else {
	console.log(content);
	console.log(minified.code);
}

