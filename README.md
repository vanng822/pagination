## pagination

Pagination for javascript/nodejs

[![build status](https://secure.travis-ci.org/vanng822/pagination.png)](http://travis-ci.org/vanng822/pagination)


## usage example
```js
var pagination = require('pagination');
var paginator = pagination.create('search', {prelink:'/', current: 1, rowsPerPage: 200, totalResult: 10020});
console.log(paginator.render());
```
### Or customized renderer
This example show how to generate markup for twitter boostrap, see example/twitter.html for template rendering
```js
var pagination = require('pagination')

var boostrapPaginator = new pagination.TemplatePaginator({
	prelink:'/', current: 3, rowsPerPage: 200,
	totalResult: 10020, slashSeparator: true,
	template: function(result) {
		var i, len, prelink;
		var html = '<div><ul class="pagination">';
		if(result.pageCount < 2) {
			html += '</ul></div>';
			return html;
		}
		prelink = this.preparePreLink(result.prelink);
		if(result.previous) {
			html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + this.options.translator('PREVIOUS') + '</a></li>';
		}
		if(result.range.length) {
			for( i = 0, len = result.range.length; i < len; i++) {
				if(result.range[i] === result.current) {
					html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
				} else {
					html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
				}
			}
		}
		if(result.next) {
			html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a></li>';
		}
		html += '</ul></div>';
		return html;
	}
});
console.log(boostrapPaginator.render());
```
### OR
```js
var pagination = require('pagination');
var paginator = new pagination.SearchPaginator({prelink:'/', current: 10, rowsPerPage: 200, totalResult: 10020});
console.log(paginator.render());
// output (without newlines)
```

```html
<div class="paginator">
	<a href="/?page=9" class="paginator-previous">Previous</a>
	<a href="/?page=8" class="paginator-page paginator-page-first">8</a>
	<a href="/?page=9" class="paginator-page">9</a>
	<a href="/?page=10" class="paginator-current">10</a>
	<a href="/?page=11" class="paginator-page">11</a>
	<a href="/?page=12" class="paginator-page paginator-page-last">12</a>
	<a href="/?page=11" class="paginator-next">Next</a>
</div>
```
### OR need data from the calculation
```js
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
```
## Pagination on client side
```html
<html>
	<head>
	<script src="../release/pagination.full.min.js"></script>
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
```
You can browse example folder for more. Release folder contains all mimified versions for browser. To customize your need you can use ./bin/build.js -h
				html += paginator.render();

## Classes
### SearchPaginator(options)
* `options` See Options bellow

See also http://developer.yahoo.com/ypatterns/navigation/pagination/search.html

### ItemPaginator(options)
* `options` See Options bellow

See also http://developer.yahoo.com/ypatterns/navigation/pagination/item.html

### TemplatePaginator(options)
* `options` See Options bellow

This class will render the markup as desired. The options must contains property "template"
It can be either a template string or a compiled template. The local variables available in the template are

* `prelink` String
* `preparedPreLink` String
* `current` Integer
* `previous` Integer
* `next` Integer
* `first` Integer
* `last` Integer
* `range` Array
* `fromResult` Integer
* `toResult` Integer
* `totalResult` Integer
* `pageCount` Integer
* `translations` Object with properties NEXT, PREVIOUS, FIRST, LAST, CURRENT_PAGE_REPORT

## API
### Paginator.getPaginationData()
Return an object contains data for rendering markup. See example above.

### Paginator.set(option, value)
Set value to a single for option. See options section bellow

### Paginator.preparePreLink(prelink)
* `prelink` String

Append page param to the link

### Paginator.render()
Return the rendered markup

### pagination.create(type, options)
* `type` String
* `options` Object see Options section bellow

Wrapper for create instance of classes above

### pagination.TemplateEngine.parse(str, options)
See pagination.TemplateEngine.compile bellow

### pagination.TemplateEngine.compile(str, options)
* `str` Template string
* `options` object which can contains .open .close .cache and .id

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
```js
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
```
### pageParamName: {String}
The name of the page parameter. Default is "page"

### slashSeparator: {Boolean}
Indicate if using slash instead of equal sign, ie /page/2 instead of /?page=2, default is false.

### template: {String | Function}
This can be a template string or a compiled template (function).
The compiled function will be called with an object as argument.


## Acknowledgements
Template engine is taking mostly from https://github.com/vanng822/ejs which is a fork of https://github.com/visionmedia/ejs
