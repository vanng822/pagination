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
	getPaginationData1 : function() {
		var item = new Paginator({
			prelink : '/',
			pageLinks : 5,
			current : 1,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : '/',
			current : 1,
			previous : null,
			next : 2,
			first : null,
			last : 10,
			range : [1, 2, 3, 4, 5],
			fromResult : 1,
			toResult : 10,
			totalResult : 100,
			pageCount : 10
		}, item.getPaginationData());
	},
	getPaginationData3 : function() {
		var item = new Paginator({
			prelink : '/',
			pageLinks : 5,
			current : 3,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : '/',
			current : 3,
			previous : 2,
			next : 4,
			first : 1,
			last : 10,
			range : [1, 2, 3, 4, 5],
			fromResult : 21,
			toResult : 30,
			totalResult : 100,
			pageCount : 10
		}, item.getPaginationData());
	},
	getPaginationData4 : function() {
		var item = new Paginator({
			prelink : '/',
			pageLinks : 5,
			current : 4,
			totalResult : 100
		});
		assert.deepEqual({
			prelink : '/',
			current : 4,
			previous : 3,
			next : 5,
			first : 1,
			last : 10,
			range : [2, 3, 4, 5, 6],
			fromResult : 31,
			toResult : 40,
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

		assert.equal('/?page=', item.preparePreLink('/'));
		assert.equal('/?q=testing&page=', item.preparePreLink('/?q=testing'));
		assert.equal('http//igeonote.com/?page=', item.preparePreLink('http//igeonote.com/'));
		assert.equal('http//sibox.isgoodness.com/q/testing?page=', item.preparePreLink('http//sibox.isgoodness.com/q/testing'));
		
	},
	testPreparePreLinkParamName : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100,
			pageParamName: 'p'
		});

		assert.equal('/?p=', item.preparePreLink('/'));
		assert.equal('/?q=testing&p=', item.preparePreLink('/?q=testing'));
		assert.equal('http//igeonote.com/?p=', item.preparePreLink('http//igeonote.com/'));
		assert.equal('http//sibox.isgoodness.com/q/testing?p=', item.preparePreLink('http//sibox.isgoodness.com/q/testing'));
	},
	testPreparePreLinkSlash : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100,
			slashSeparator: true
		});

		assert.equal('/page/', item.preparePreLink('/'));
		assert.equal('/q/testing/page/', item.preparePreLink('/q/testing'));
		assert.equal('http//igeonote.com/page/', item.preparePreLink('http//igeonote.com/'));
		assert.equal('http//sibox.isgoodness.com/q/testing/page/', item.preparePreLink('http//sibox.isgoodness.com/q/testing'));
	},
	testSet : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 4,
			totalResult : 100
		});
		var test_translator = function() {}
		item.set('totalResult', 3000);
		item.set('notSupported', 'notfound');
		// ugly :-)
		
		item.set('translator', test_translator);
		assert.deepEqual({
			totalResult : 3000,
			prelink : '/',
			rowsPerPage : 10,
			pageLinks : 4,
			current : 5,
			translator : test_translator,
			translationCache : false,
			translationCacheKey: 'en',
			pageParamName: 'page',
			slashSeparator: false
		}, item.options);

	}
}).export(module);
