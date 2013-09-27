## pagination

Pagination for javascript/nodejs

[![build status](https://secure.travis-ci.org/vanng822/pagination.png)](http://travis-ci.org/vanng822/pagination)


## usage example

	var pagination = require('pagination');
	var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());

### OR

	var pagination = require('pagination');
	var paginator = new pagination.SearchPaginator({prelink:'/', current: 10, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());
	
	// output (without newlines)
	<div class="paginator">
		<a href="/?page=9" class="paginator-previous">Previous</a>
		<a href="/?page=8" class="paginator-page paginator-page-first">8</a>
		<a href="/?page=9" class="paginator-page">9</a>
		<a href="/?page=10" class="paginator-current">10</a>
		<a href="/?page=11" class="paginator-page">11</a>
		<a href="/?page=12" class="paginator-page paginator-page-last">12</a>
		<a href="/?page=11" class="paginator-next">Next</a>
	</div>

### OR 

	var pagination = require('pagination');
	var paginator = new pagination.ItemPaginator({prelink:'/', slashSeparator: true, current: 3, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());
	
	// output (without newlines)
	<div class="paginator">
		<span class="paginator-current-report">Results 401 - 600 of 10020</span>
		<a href="/page/1" class="paginator-first">First</a>
		<a href="/page/2" class="paginator-previous">Previous</a>
		<a href="/page/4" class="paginator-next">Next</a>
		<a href="/page/51" class="paginator-last">Last</a>
	</div>

### OR need data from the calculation

	var pagination = require('pagination');
	var paginator = new pagination.SearchPaginator({prelink:'/', current: 3, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.getPaginationData());
	
	// output
	{ prelink: '/',
	  current: 3,
	  previous: 2,
	  next: 4,
	  first: 1,
	  last: 51,
	  range: [ 1, 2, 3, 4, 5 ],
	  fromResult: 401,
	  toResult: 600,
	  totalResult: 10020,
	  pageCount: 51 }
## Pagination on client side
	<html>
		<head>
		<script src="../lib/pagination.js"></script>
		</head>
		<body>
			<div id="paging"></div>
			<script type="text/javascript">
			(function() {
				var paginator = new pagination.ItemPaginator({prelink:'/', current: 3, rowsPerPage: 200, totalResult: 10020});
				var html = paginator.render();
				var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
				html += paginator.render();
				document.getElementById("paging").innerHTML = html;
			})();
			</script>
		</body>
	</html>


## Options
Object to pass to paginator classes (second argument when using create function)

### totalResult: {Integer}
Number of total items in result set
	
### prelink: {String}
Link to append the page-param

### rowsPerPage: {Integer}
Number of items per page, default to 10

### pageLinks: {Integer}
Number of links to create in page range, default to 5. This value will be ignored when using item pagination.

### current: {Integer}
Indicate which page is the current one. Page always starts with 1.

### translationCache: {Boolean}
To indicate if the result from CURRENT_PAGE_REPORT translation can be cached or not. Default is false.
The cache is global and will be the same for all instances which have specified translationCacheKey as bellow.

### translationCacheKey: {String}
For supporting multiple versions of translation of CURRENT_PAGE_REPORT. It can use for multilanguages or different formats. Default is "en"

### translator: {Function}
For translations of FIRST, NEXT, ... Simple example

	var translations = {
		'PREVIOUS' : 'Voorgaand',
		'NEXT' : 'Volgende',
		'FIRST' : 'Eerst',
		'LAST' : 'Laatste',
		'CURRENT_PAGE_REPORT' : 'Resulten {FromResult} - {ToResult} van {TotalResult}'
	};
	
	var item = new ItemPaginator({
		prelink : '/',
		pageLinks : 5,
		current : 5,
		totalResult : 100,
		translator : function(str) {
			return translations[str];
		}
	});

### pageParamName: {String}
The name of the page parameter. Default is "page"

### slashSeparator: {Boolean}
Indicate if using slash instead of equal sign, ie /page/2 instead of /?page=2, default is false.
