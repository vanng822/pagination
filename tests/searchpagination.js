var assert = require('assert');
var pagination = require('../index.js');
var SearchPaginator = pagination.SearchPaginator;

function test() {
	console.log('Running SearchPaginator test');
	
	var item = new SearchPaginator({
		prelink : '/',
		pageLinks : 5,
		current : 5,
		totalResult : 100
	});
	
	assert.equal('<div class="paginator"><a href="/?page=4" class="paginator-previous">Previous</a><a href="/?page=3" class="paginator-page">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-current">5</a><a href="/?page=6" class="paginator-page">6</a><a href="/?page=7" class="paginator-page">7</a><a href="/?page=6" class="paginator-next">Next</a></div>', item.render());

}

test();
