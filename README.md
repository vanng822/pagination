## pagination

Pagination for javascript/nodejs

## usage example

	var pagination = require('pagination');
	var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());

### OR

	var pagination = require('pagination');
	var paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());

### OR 

	var pagination = require('pagination');
	var paginator = new pagination.ItemPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
	console.log(paginator.render());
	
	// output (without newlines)
	<div class="paginator">
		<span class="paginator-current-report">Results 1 - 200 of 10020</span>
		<a href="/?page=2" class="paginator-next">Next</a>
		<a href="/?page=51" class="paginator-last">Last</a>
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
	  

