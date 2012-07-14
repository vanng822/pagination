var assert = require('assert');
var pagination = require('../index.js');
var SearchPaginator = pagination.SearchPaginator;
var ItemPaginator = pagination.ItemPaginator

function test() {
	console.log('Running translation test');
	var translations = {
		'PREVIOUS' : 'Voorgaand',
		'NEXT' : 'Volgende',
		'FIRST' : 'Eerst',
		'LAST' : 'Laatste',
		'CURRENT_PAGE_REPORT' : 'Resulten {FromResult} - {ToResult} van {TotalResult}'
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

	assert.equal('<div class="paginator"><a href="/?page=4" class="paginator-previous">Voorgaand</a><a href="/?page=3" class="paginator-page paginator-page-first">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-current">5</a><a href="/?page=6" class="paginator-page">6</a><a href="/?page=7" class="paginator-page paginator-page-last">7</a><a href="/?page=6" class="paginator-next">Volgende</a></div>', item.render());
	
	var item = new ItemPaginator({
		prelink : '/',
		pageLinks : 5,
		current : 5,
		totalResult : 100,
		translator : function(str) {
			return translations[str];
		}
	});

	assert.equal('<div class="paginator"><span class="paginator-current-report">Resulten 41 - 50 van 100</span><a href="/?page=1" class="paginator-first">Eerst</a><a href="/?page=4" class="paginator-previous">Voorgaand</a><a href="/?page=6" class="paginator-next">Volgende</a><a href="/?page=10" class="paginator-last">Laatste</a></div>', item.render());

}


function testMarkup() {
	console.log('Running translation test, markup');
	var translations = {
		'PREVIOUS' : '<span class="left-arrow"></span><span class="text">Voorgaand</span>',
		'NEXT' : '<span class="right-arrow"></span><span class="text">Volgende</span>',
		'FIRST' : 'Eerst',
		'LAST' : 'Laatste',
		'CURRENT_PAGE_REPORT' : 'Resulten {FromResult} - {ToResult} van {TotalResult}'
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

	assert.equal('<div class="paginator"><a href="/?page=4" class="paginator-previous"><span class="left-arrow"></span><span class="text">Voorgaand</span></a><a href="/?page=3" class="paginator-page paginator-page-first">3</a><a href="/?page=4" class="paginator-page">4</a><a href="/?page=5" class="paginator-current">5</a><a href="/?page=6" class="paginator-page">6</a><a href="/?page=7" class="paginator-page paginator-page-last">7</a><a href="/?page=6" class="paginator-next"><span class="right-arrow"></span><span class="text">Volgende</span></a></div>', item.render());
}


test();
testMarkup();
