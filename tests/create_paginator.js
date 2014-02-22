var assert = require('assert');
var pagination = require('../index.js');

var vows = require('vows');

vows.describe('Test suite for Paginator').addBatch({
	createItemPaginator : function() {
		var paginator = pagination.create('item', {});
		//assert.
	},
	createSearchPaginator : function() {
		var paginator = pagination.create('search', {});
		paginator.render();
	},
	createTemplatePaginator : function() {
		var paginator = pagination.create('template', {template: function(data){}});
		paginator.render();
	}
}).export(module);
