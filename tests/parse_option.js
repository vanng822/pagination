var assert = require('assert');
var pagination = require('../index.js');
var Paginator = pagination.Paginator;

var vows = require('vows');

vows.describe('Test suite for parsing options').addBatch({
	testSetStringAsInt : function() {
		var item = new Paginator({
			prelink : '/',
			current : String(5),
			pageLinks : '5',
			totalResult : '100'
		});
		var expected = {
				prelink : '/',
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
		};
		var paginationData = item.getPaginationData();
		//console.log(paginationData)
		assert.ok(paginationData.current === expected.current);
		assert.ok(paginationData.previous === expected.previous);
		assert.ok(paginationData.next === expected.next);
		assert.ok(paginationData.first === expected.first);
		assert.ok(paginationData.last === expected.last);
		assert.ok(paginationData.toResult === expected.toResult);
		assert.ok(paginationData.totalResult === expected.totalResult);
	},
	testSetNaNAsInt : function() {
		assert.throws(function() {
			var item = new Paginator({
				prelink : '/',
				current : 5,
				pageLinks : 5,
				totalResult : 'sdf10'
			});
		});
		
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 5,
			totalResult : 100
		});
		
		assert.throws(function() {
			item.set('current', NaN);
		});
		
		assert.throws(function() {
			item.set('pageLinks', 'sdffdf');
		});
		
		assert.throws(function() {
			item.set('totalResult', undefined);
		});
		
	},
	testSetTranslator : function() {
		var item = new Paginator({
			prelink : '/',
			current : 5,
			pageLinks : 5,
			totalResult : 100
		});
		
		assert.throws(function() {
			item.set('translator', 'sdfdfsd');
		});
		
		assert.throws(function() {
			item.set('translator', null);
		});
		
		assert.throws(function() {
			item.set('translator', undefined);
		});
		
		assert.throws(function() {
			item.set('translator', 10);
		});
		
		var test_translator = function(text) {
			return text;
		};
		item.set('translator', test_translator);
		assert.ok(item.options.translator === test_translator);
	}
}).export(module);
