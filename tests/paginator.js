var assert = require('assert');
var pagination = require('../index.js');
var Paginator = pagination.Paginator;

var vows = require('vows');

vows.describe('Test suite for Paginator').addBatch({
	calc : function() {
		var item = new Paginator({
			current : 11,
			pageLinks : 7,
			totalResult : 100
		});

		assert.deepEqual({
			prelink : "",
			current : 10,
			previous : 9,
			next : null,
			first : 1,
			last : null,
			range : [4, 5, 6, 7, 8, 9, 10],
			fromResult : 91,
			toResult : 100,
			totalResult : 100,
			pageCount : 10
		}, item.calc());

		var item = new Paginator({
			prelink : '/',
			current : 10,
			pageLinks : 7,
			totalResult : 98
		});

		assert.deepEqual({
			prelink : '/',
			current : 10,
			previous : 9,
			next : null,
			first : 1,
			last : null,
			range : [4, 5, 6, 7, 8, 9, 10],
			fromResult : 91,
			toResult : 98,
			totalResult : 98,
			pageCount : 10
		}, item.calc());

		var item = new Paginator({
			prelink : '/',
			pageLinks : 7,
			totalResult : 9
		});

		assert.deepEqual({
			prelink : '/',
			current : 1,
			previous : null,
			next : null,
			first : null,
			last : null,
			range : [],
			fromResult : 1,
			toResult : 9,
			totalResult : 9,
			pageCount : 1
		}, item.calc());

		var item = new Paginator({
			current : 5,
			pageLinks : 7,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : "",
			current : 5,
			previous : 4,
			next : 6,
			first : 1,
			last : 10,
			range : [2, 3, 4, 5, 6, 7, 8],
			fromResult : 41,
			toResult : 50,
			totalResult : 100,
			pageCount : 10
		}, item.calc());

		var item = new Paginator({
			current : 5,
			pageLinks : 6,
			totalResult : 100
		});

		assert.deepEqual({
			prelink : "",
			current : 5,
			previous : 4,
			next : 6,
			first : 1,
			last : 10,
			range : [2, 3, 4, 5, 6, 7],
			fromResult : 41,
			toResult : 50,
			totalResult : 100,
			pageCount : 10
		}, item.calc());

		var item = new Paginator({
			current : 5,
			pageLinks : 4,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : "",
			current : 5,
			previous : 4,
			next : 6,
			first : 1,
			last : 10,
			range : [3, 4, 5, 6],
			fromResult : 41,
			toResult : 50,
			totalResult : 100,
			pageCount : 10
		}, item.calc());

		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : '/',
			current : 5,
			previous : 4,
			next : 6,
			first : 1,
			last : 10,
			range : [3, 4, 5, 6],
			fromResult : 41,
			toResult : 50,
			totalResult : 100,
			pageCount : 10
		}, item.calc());

		/* pageLinks 5 by default; howto specify for Item Pattern */
		var item = new Paginator({
			current : 5,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : '',
			current : 5,
			previous : 4,
			next : 6,
			first : 1,
			last : 10,
			range : [3, 4, 5, 6, 7],
			fromResult : 41,
			toResult : 50,
			totalResult : 100,
			pageCount : 10
		}, item.calc());
	},
	getPaginationData: function() {
		
		var item = new Paginator({
			current : 8,
			pageLinks : 7,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : "",
			current : 8,
			previous : 7,
			next : 9,
			first : 1,
			last : 10,
			range : [4, 5, 6, 7, 8, 9, 10],
			fromResult : 71,
			toResult : 80,
			totalResult : 100,
			pageCount : 10
		}, item.getPaginationData());
	},
	testPreparePreLink : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100
		});

		assert.equal('/?', item.preparePreLink('/'));
		assert.equal('/?q=testing&', item.preparePreLink('/?q=testing'));
		assert.equal('http//igeonote.com/?', item.preparePreLink('http//igeonote.com/'));
		assert.equal('http//sibox.isgoodness.com/q/testing?', item.preparePreLink('http//sibox.isgoodness.com/q/testing'));

	},
	testSet : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100
		});
		
		item.set('totalResult', 3000);
		item.set('notSupported', 'notfound');
		// ugly :-)
		item.set('translator', null);
		assert.deepEqual({
			totalResult : 3000,
			prelink : '/',
			rowsPerPage : 10,
			pageLinks : 4,
			current : 5,
			translator : null,
			translationCache : false,
			translationCacheKey: 'en'
		}, item.options);

	}
}).export(module);
