(function(module) {
	"use strict";
	var util;
	/* Check if clientside or serverside */
	if( typeof module === 'undefined') {
		window.pagination = {};
		module = {
			exports : window.pagination
		};
		util = {
			inherits : function(subc, superc) {
				if(!superc || !subc) {
					throw new Error("extend failed, please check that all dependencies are included.");
				}
				var F = function() {
				};
				F.prototype = superc.prototype;
				subc.prototype = new F();
				subc.prototype.constructor = subc;
				subc.superclass = superc.prototype;
				if(superc.prototype.constructor === Object.prototype.constructor) {
					superc.prototype.constructor = superc;
				}
			}
		};

		if(!Object.keys) {
			Object.keys = function(o) {
				var rt = [], p, hasOwnProperty = Object.prototype.hasOwnProperty;
				if(o !== Object(o)) {
					throw new TypeError('Object.keys called on a non-object');
				}
				for(p in o) {
					if(hasOwnProperty.call(o, p)) {
						rt.push(p);
					}
				}
				return rt;
			};
		}
	} else {
		util = require('util');
	}

	var translations = {
		'NEXT' : 'Next',
		'PREVIOUS' : 'Previous',
		'FIRST' : 'First',
		'LAST' : 'Last',
		'CURRENT_PAGE_REPORT' : 'Results {FromResult} - {ToResult} of {TotalResult}'
	};

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

	module.exports.Paginator = Paginator;

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

	var SearchPaginator = function(options) {
		Paginator.call(this, options);

	};

	module.exports.SearchPaginator = SearchPaginator;

	util.inherits(SearchPaginator, Paginator);

	SearchPaginator.prototype.render = function() {
		var i, len, className, prelink;
		var result = this.getPaginationData();
		var html = '<div class="paginator">';

		if(result.pageCount < 2) {
			html += '</div>';
			return html;
		}
		
		prelink = this.preparePreLink(result.prelink);
		
		if(result.previous) {
			html += '<a href="' + prelink + result.previous + '" class="paginator-previous">' + this.options.translator('PREVIOUS') + '</a>';
		}

		if(result.range.length) {
			for( i = 0, len = result.range.length; i < len; i++) {
				className = 'paginator-page';

				if(result.range[i] === result.current) {
					className = 'paginator-current';
				}
				if(i === 0) {
					className += ' paginator-page-first';
				} else if(i === len - 1) {
					className += ' paginator-page-last';
				}
				html += '<a href="' + prelink + result.range[i] + '" class="' + className + '">' + result.range[i] + '</a>';
			}
		}
		if(result.next) {
			html += '<a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a>';
		}
		html += '</div>';
		return html;
	};
	var ItemPaginator = function(options) {
		Paginator.call(this, options);
		this.set('pageLinks', 1);

	};
	module.exports.ItemPaginator = ItemPaginator;

	util.inherits(ItemPaginator, Paginator);

	ItemPaginator.prototype.renderCurrentPageReport = function(fromResult, toResult, totalResult) {
		var template;
		if(!this.options.translationCache) {
			return this.options.translator('CURRENT_PAGE_REPORT').replace('{FromResult}', fromResult).replace('{ToResult}', toResult).replace('{TotalResult}', totalResult);
		}
		if(!translationCache.CURRENT_PAGE_REPORT.hasOwnProperty(this.options.translationCacheKey)) {
			template = "return '" + (this.options.translator('CURRENT_PAGE_REPORT').replace("'", "\'").replace('{FromResult}', "' + fromResult + '").replace('{ToResult}', "' + toResult + '").replace('{TotalResult}', "' + totalResult + '")) + "';";
			translationCache.CURRENT_PAGE_REPORT[this.options.translationCacheKey] = new Function('fromResult, toResult, totalResult', template);
		}
		return translationCache.CURRENT_PAGE_REPORT[this.options.translationCacheKey](fromResult, toResult, totalResult);
	};

	ItemPaginator.prototype.render = function() {
		var result = this.getPaginationData();
		var prelink = this.preparePreLink(result.prelink);
		var html = '<div class="paginator">';
		html += '<span class="paginator-current-report">';
		html += this.renderCurrentPageReport(result.fromResult, result.toResult, result.totalResult);
		html += '</span>';

		if(result.first) {
			html += '<a href="' + prelink + result.first + '" class="paginator-first">' + this.options.translator('FIRST') + '</a>';
		} else {
			html += '<span class="paginator-first">' + this.options.translator('FIRST') + '</span>';
		}

		if(result.previous) {
			html += '<a href="' + prelink + result.previous + '" class="paginator-previous">' + this.options.translator('PREVIOUS') + '</a>';
		} else {
			html += '<span class="paginator-previous">' + this.options.translator('PREVIOUS') + '</span>';
		}

		if(result.next) {
			html += '<a href="' + prelink + result.next + '" class="paginator-next">' + this.options.translator('NEXT') + '</a>';
		} else {
			html += '<span class="paginator-next">' + this.options.translator('NEXT') + '</span>';
		}

		if(result.last) {
			html += '<a href="' + prelink + result.last + '" class="paginator-last">' + this.options.translator('LAST') + '</a>';
		} else {
			html += '<span class="paginator-last">' + this.options.translator('LAST') + '</span>';
		}
		html += '</div>';
		return html;
	};

	module.exports.create = function(type, options) {
		switch(type) {
			case 'item':
				return new ItemPaginator(options);
			case 'search':
			default:
				return new SearchPaginator(options);
		}
	};
})(( typeof module !== 'undefined' && module.exports) ? module : undefined);
