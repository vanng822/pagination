var assert = require('assert');
var pagination = require('../index.js');
var TemplatePaginator = pagination.TemplatePaginator;

var vows = require('vows');

vows.describe('Test suite for TemplatePaginator').addBatch({
	render : function() {
		var item = new TemplatePaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100,
			template: '<ul class="pagination">'
				+ '<% if (first) { %>'
				+ '<li><a href="<%-preparedPreLink + first %>">&laquo;&laquo;</a></li>'
				+ '<% } %>'
				+ '<% if (previous) {%>'
				+ '<li><a href="<%-preparedPreLink + previous %>">&laquo;</a></li>'
				+ '<% } %> '
				+ '<% for ( var i = 0; i < range.length; i++ ) { %>'
				+ '<li><a href="<%-preparedPreLink %><%=range[i]%>"><%=range[i]%></a></li>'
				+ '<% } %>'
				+ '<% if (next) { %>'
				+ '<li><a href="<%-preparedPreLink + next %>">&raquo;</a></li>'
				+ '<% } %>'
				+ '<% if (last) {%>'
				+ '<li><a href="<%-preparedPreLink + last %>">&raquo;&raquo;</a></li>'
				+ '<% } %>'
				+ '</ul>'
		});
		assert.equal('<ul class="pagination"><li><a href="/?page=1">&laquo;&laquo;</a></li><li><a href="/?page=4">&laquo;</a></li> <li><a href="/?page=3">3</a></li><li><a href="/?page=4">4</a></li><li><a href="/?page=5">5</a></li><li><a href="/?page=6">6</a></li><li><a href="/?page=7">7</a></li><li><a href="/?page=6">&raquo;</a></li><li><a href="/?page=10">&raquo;&raquo;</a></li></ul>', item.render());
	},
	"render ejs compiled template": function() {
		var ejs = require('ejs');
		var template = '<ul class="pagination">'
				+ '<% if (first) { %>'
				+ '<li><a href="<%-preparedPreLink + first %>">&laquo;&laquo;</a></li>'
				+ '<% } %>'
				+ '<% if (previous) {%>'
				+ '<li><a href="<%-preparedPreLink + previous %>">&laquo;</a></li>'
				+ '<% } %> '
				+ '<% for ( var i = 0; i < range.length; i++ ) { %>'
				+ '<li><a href="<%=preparedPreLink %><%=range[i]%>"><%=range[i]%></a></li>'
				+ '<% } %>'
				+ '<% if (next) { %>'
				+ '<li><a href="<%-preparedPreLink + next %>">&raquo;</a></li>'
				+ '<% } %>'
				+ '<% if (last) {%>'
				+ '<li><a href="<%-preparedPreLink + last %>">&raquo;&raquo;</a></li>'
				+ '<% } %>'
				+ '</ul>';
		var item = new TemplatePaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100,
			template: ejs.compile(template)
		});
		assert.equal('<ul class="pagination"><li><a href="/?page=1">&laquo;&laquo;</a></li><li><a href="/?page=4">&laquo;</a></li> <li><a href="/?page=3">3</a></li><li><a href="/?page=4">4</a></li><li><a href="/?page=5">5</a></li><li><a href="/?page=6">6</a></li><li><a href="/?page=7">7</a></li><li><a href="/?page=6">&raquo;</a></li><li><a href="/?page=10">&raquo;&raquo;</a></li></ul>', item.render());

	},
	"render function": function() {
		var item = new TemplatePaginator({
			prelink : '/',
			pageLinks : 5,
			current : 5,
			totalResult : 100,
			template: function(data) {
				with(data) {
					return 'current:' + current + ',totalResult:' + totalResult;
				}
			}
		});
		assert.equal('current:5,totalResult:100', item.render());
	}
}).export(module);
