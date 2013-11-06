var assert = require('assert');
var pagination = require('../index.js');
var SearchPaginator = pagination.SearchPaginator;

var vows = require('vows');

vows.describe('Test suite for SearchPaginator').addBatch({
	render : function() {
		var item = new SearchPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100
		});

		assert.equal('<div class="paginator"><a href="/?page=4" class="paginator-previous">Previous</a><a href="/?page=3" class="paginator-page paginator-page-first">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-current">5</a><a href="/?page=6" class="paginator-page">6</a><a href="/?page=7" class="paginator-page paginator-page-last">7</a><a href="/?page=6" class="paginator-next">Next</a></div>', item.render());

	},
	renderPSlashSeparator : function() {
		var item = new SearchPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100,
			pageParamName: 'p',
			slashSeparator: true
		});

		assert.equal('<div class="paginator"><a href="/p/4" class="paginator-previous">Previous</a><a href="/p/3" class="paginator-page paginator-page-first">3</a><a href="/p/4" class="paginator-page">4</a><a href="/p/5" class="paginator-current">5</a><a href="/p/6" class="paginator-page">6</a><a href="/p/7" class="paginator-page paginator-page-last">7</a><a href="/p/6" class="paginator-next">Next</a></div>', item.render());

	},
	renderFirstPage : function() {
		var item = new SearchPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 1,
			totalResult : 100
		});

		assert.equal('<div class="paginator"><a href="/?page=1" class="paginator-current paginator-page-first">1</a><a href="/?page=2" class="paginator-page">2</a><a href="/?page=3" class="paginator-page">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-page paginator-page-last">5</a><a href="/?page=2" class="paginator-next">Next</a></div>', item.render());

	}
}).export(module);
