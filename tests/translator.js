var assert = require('assert');
var pagination = require('../index.js');
var SearchPaginator = pagination.SearchPaginator;

function test() {
	console.log('Running translation test');
	var translations = {
		'Previous': 'Voorgaand',
		'Next':'Volgende'
	};
	var item = new SearchPaginator({
		prelink : '/',
		pageLinks : 5,
		current : 5,
		totalResult : 100,
		translator : function(str) {
			return translations[str];
		}
	});
	
	assert.equal('<div class="paginator"><a href="/?page=4" class="paginator-previous">Voorgaand</a><a href="/?page=3" class="paginator-page">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-current">5</a><a href="/?page=6" class="paginator-page">6</a><a href="/?page=7" class="paginator-page">7</a><a href="/?page=6" class="paginator-next">Volgende</a></div>', item.render());


}

test();
