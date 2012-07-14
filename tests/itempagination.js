var assert = require('assert');
var pagination = require('../index.js');
var ItemPaginator = pagination.ItemPaginator;

function test() {
	console.log('Running ItemPaginator test');
	/* pageLinks 5 by default; howto specify for Item Pattern */
	
	var item = new ItemPaginator({
		prelink : '/',
		pageLinks : 5,
		current : 5,
		totalResult : 98
	});
	
	assert.equal('<div class="paginator"><span class="paginator-current-report">Results 41 - 50 of 98</span><a href="/?page=1" class="paginator-first">First</a><a href="/?page=4" class="paginator-previous">Previous</a><a href="/?page=6" class="paginator-next">Next</a><a href="/?page=10" class="paginator-last">Last</a></div>', item.render());

}

test();
