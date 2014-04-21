(function(exports) {
	"use strict";
	var factories = {};
	
	var translations = {
		'NEXT' : 'Next',
		'PREVIOUS' : 'Previous',
		'FIRST' : 'First',
		'LAST' : 'Last',
		'CURRENT_PAGE_REPORT' : 'Results {FromResult} - {ToResult} of {TotalResult}'
	};
	
	var translationKeys = exports.translationKeys = Object.keys(translations);
	
	var translationCache = {
		CURRENT_PAGE_REPORT : {}
	};

	var translator = function(str) {
		return translations[str];
	};
	var Paginator = function(options) {
		var keys, i, len;
		/* validate in this.set if needed */
		this.options = {
			totalResult : 0,
			prelink : '',
			rowsPerPage : 10,
			pageLinks : 5,
			current : 1,
			translator : translator,
			translationCache : false,
			translationCacheKey : 'en',
			pageParamName : 'page',
			slashSeparator : false
		};
		for( keys = Object.keys(options), i = 0, len = keys.length; i < len; i++) {
			this.set(keys[i], options[keys[i]]);
		}
		this._result = null;
	};

	exports.Paginator = Paginator;

	Paginator.prototype = {
		getPaginationData : function() {
			if(!this._result) {
				this._result = this.calc();
			}
			return this._result;
		},
		calc : function() {
			var totalResult = this.options.totalResult;
			var pageLinks = this.options.pageLinks;
			var rowsPerPage = this.options.rowsPerPage;
			var current = this.options.current;
			var startPage, endPage, pageCount;
			var oldPageLinks = (pageLinks % 2 === 0) ? 1 : 0, i, half;
			var result = {
				prelink : this.options.prelink,
				current : current,
				previous : null,
				next : null,
				first : null,
				last : null,
				range : [],
				fromResult : null,
				toResult : null,
				totalResult : totalResult,
				pageCount : null
			};
			/* zero division; negative */
			if(rowsPerPage <= 0) {
				return result;
			}
			pageCount = Math.ceil(totalResult / rowsPerPage);
			result.pageCount = pageCount;
			if(pageCount < 2) {
				result.fromResult = 1;
				result.toResult = totalResult;
				return result;
			}

			if(current > pageCount) {
				current = pageCount;
				result.current = current;
			}
			half = Math.floor(pageLinks / 2);
			startPage = current - half;
			endPage = current + half - oldPageLinks;

			if(startPage < 1) {
				startPage = 1;
				endPage = startPage + pageLinks -1;
				if(endPage > pageCount) {
					endPage = pageCount;
				}
			}

			if(endPage > pageCount) {
				endPage = pageCount;
				startPage = endPage - pageLinks + 1;
				if(startPage < 1) {
					startPage = 1;
				}
			}

			for( i = startPage; i <= endPage; i++) {
				result.range.push(i);
			}

			if(current > 1) {
				result.first = 1;
				result.previous = current - 1;
			}

			if(current < pageCount) {
				result.last = pageCount;
				result.next = current + 1;
			}

			result.fromResult = (current - 1) * rowsPerPage + 1;
			if(current === pageCount) {
				result.toResult = totalResult;
			} else {
				result.toResult = result.fromResult + rowsPerPage - 1;
			}

			return result;
		},
		set : function(option, value) {
			if(this.options.hasOwnProperty(option)) {
				switch(option) {
					case 'current':
					case 'totalResult':
					case 'pageLinks':
					case 'rowsPerPage':
						value = parseInt(value, 10);
						if (isNaN(value)) {
							throw new Error('Invalid value for "' + option + '", expected an integer');
						}
						break;
					case 'translator':
						if (!(value && value.constructor && value.call && value.apply)) {
							throw new Error('Translator must be a function');
						}
						break;
					case 'translationCacheKey':
					case 'pageParamName':
					case 'prelink':
						value = String(value);
						break;
				}
				this.options[option] = value;
				if (this._result) {
					this._result = null;
				}
			}
		},
		preparePreLink : function(prelink) {
			if (this.options.slashSeparator) {
				if (prelink[prelink.length - 1] !== '/') {
					prelink += '/';
				}
				return prelink + this.options.pageParamName + '/';
			}
			if(prelink.indexOf('?') !== -1) {
				if(prelink[prelink.length - 1] !== '?' && prelink[prelink.length - 1] !== '&') {
					prelink += '&';
				}
			} else {
				prelink += '?';
			}
			
			return prelink + this.options.pageParamName + '=';
		},
		render : function() {
			throw new Error('Implement');
		}
	};
	exports.registerFactory = function(type, factory) {
		if (factories.hasOwnProperty(type)) {
			throw new Error(type + ' already exists');
		}
		factories[type] = factory;
	};
	exports.create = function(type, options) {
		if (factories.hasOwnProperty(type)) {
			return new factories[type](options);
		} else {
			throw new Error('Paginator type'+type+' not found in register');
		}
	};
})(exports);
