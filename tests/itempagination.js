var assert = require('assert');
var pagination = require('../index.js');
var ItemPaginator = pagination.ItemPaginator;

var vows = require('vows');

vows.describe('Test suite for ItemPagination').addBatch({
	renderCurrentMiddle : function() {
		/* pageLinks 5 by default; howto specify for Item Pattern */

		var item = new ItemPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 98
		});

		assert.equal('<div class="paginator"><span class="paginator-current-report">Results 41 - 50 of 98</span><a href="/?page=1" class="paginator-first">First</a><a href="/?page=4" class="paginator-previous">Previous</a><a href="/?page=6" class="paginator-next">Next</a><a href="/?page=10" class="paginator-last">Last</a></div>', item.render());
	},
	renderCurrentFirst : function() {
		var item = new ItemPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 1,
			totalResult : 98
		});

		assert.equal('<div class="paginator"><span class="paginator-current-report">Results 1 - 10 of 98</span><span class="paginator-first">First</span><span class="paginator-previous">Previous</span><a href="/?page=2" class="paginator-next">Next</a><a href="/?page=10" class="paginator-last">Last</a></div>', item.render());
	},
	renderCurrentLast : function() {
		var item = new ItemPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 10,
			totalResult : 98
		});
		assert.equal('<div class="paginator"><span class="paginator-current-report">Results 91 - 98 of 98</span><a href="/?page=1" class="paginator-first">First</a><a href="/?page=9" class="paginator-previous">Previous</a><span class="paginator-next">Next</span><span class="paginator-last">Last</span></div>', item.render());

	},
	renderCurrentLastPSlashSeparator : function() {
		var item = new ItemPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 10,
			totalResult : 98,
			pageParamName: 'p',
			slashSeparator: true
		});
		assert.equal('<div class="paginator"><span class="paginator-current-report">Results 91 - 98 of 98</span><a href="/p/1" class="paginator-first">First</a><a href="/p/9" class="paginator-previous">Previous</a><span class="paginator-next">Next</span><span class="paginator-last">Last</span></div>', item.render());

	}
}).export(module)