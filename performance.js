var pagination = require('./index.js');

var ItemPaginator = pagination.ItemPaginator;
var SearchPaginator = pagination.SearchPaginator;

function test() {
	console.log('Running pagination performance');
	/* pageLinks 5 by default; howto specify for Item Pattern */

	var times = 1000000;
	console.log(' * run new ItemPaginator.render ' + times);
	var start = Date.now();
	for( i = 0; i < times; i++) {
		var item = new ItemPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 98,
			translationCache : true
		});
		item.render();
	}
	console.log(' * took: ' + (Date.now() - start) + ' ms');

	console.log(' * run new SearchPaginator.render ' + times);
	var start = Date.now();
	for( i = 0; i < times; i++) {
		var search = new SearchPaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100
		});
		search.render();
	}
	console.log(' * took: ' + (Date.now() - start) + ' ms');
}

test();

/**
 * 
 * v0.2.1
 * string concat
 * ---------------
 * translationCache: true
 * 
 * run new ItemPaginator.render 1000000
 * took: 3482 ms
 * run new SearchPaginator.render 1000000
 * took: 2968 ms
 * 
 * 
 * translationCache: false
 * 
 * run new ItemPaginator.render 1000000
 * took: 4313 ms
 * run new SearchPaginator.render 1000000
 * took: 3065 ms
 * 
 * array.join
 * --------------
 * With cache of CURRENT_PAGE_REPORT
 * translationCache : true
 *
 * took: 5095 ms
 * run new SearchPaginator.render 1000000
 * took: 5503 ms
 * 
 * translationCache : false
 * 
 * took: 6289 ms
 * run new SearchPaginator.render 1000000
 * took: 5266 ms
 *
 * v0.2.0
 * run new ItemPaginator.render 1000000
 * took: 6514 ms
 * run new SearchPaginator.render 1000000
 * took: 5297 ms
 *
 * cpus x4
 * [ { model: 'MacBookAir4,2',
 speed: 1800,
 times:
 { user: 44032730,
 nice: 0,
 sys: 40634570,
 idle: 367414930,
 irq: 0 } },
 ... } ]
 */