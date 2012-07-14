pagination
==========

Pagination for javascript/nodejs

usage example
==========

var pagination = require('pagination');<br/>
paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
console.log(paginator.render());

OR

pagination = require('pagination');<br/>
paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
console.log(paginator.render());

OR 

pagination = require('pagination');<br/>
paginator = new pagination.ItemPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
console.log(paginator.render());<br/>

OR need data from the calculation

pagination = require('pagination');<br/>
paginator = new pagination.SearchPaginator({prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});<br/>
console.log(paginator.getPaginationData());<br/>
