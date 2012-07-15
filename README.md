## pagination

Pagination for javascript/nodejs

## usage example

	var pagination = require('pagination');<br/>
	var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
	console.log(paginator.render());

### OR

	var pagination = require('pagination');<br/>
	var paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
	console.log(paginator.render());

### OR 

	var pagination = require('pagination');<br/>
	var paginator = new pagination.ItemPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
	console.log(paginator.render());<br/>

### OR need data from the calculation

	var pagination = require('pagination');<br/>
	var paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
	console.log(paginator.getPaginationData());<br/>
