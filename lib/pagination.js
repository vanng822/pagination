var util = require('util');

var translations = {
	'NEXT' : 'Next',
	'PREVIOUS' : 'Previous',
	'FIRST' : 'First',
	'LAST' : 'Last',
	'CURRENT_PAGE_REPORT' : 'Results {FromResult} - {ToResult} of {TotalResult}'
};

var translator = function(str) {
	return translations[str];
};
var Paginator = function(options) {
	this.options = {
		totalResult : 0,
		prelink : '',
		rowsPerPage : 10,
		pageLinks : 5,
		current : 1,
		translator : translator
	};
	for(var key in options) {
		try {
			this.set(key, options[key]);
		} catch(e) {

		}
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
		var totalResult = this.options.totalResult, pageLinks = this.options.pageLinks, rowsPerPage = this.options.rowsPerPage;
		var prelink = this.options.prelink, current = this.options.current;
		var leftLinks, rightLinks, startPage, pageCount;
		var previous = null, next = null, first = null, oldPageLinks = (pageLinks % 2 == 0) ? 1 : 0, i;
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
			endPage = startPage + pageLinks;
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
		if(current == pageCount) {
			result.toResult = totalResult;
		} else {
			result.toResult = result.fromResult + rowsPerPage - 1;
		}

		return result;
	},
	set : function(option, value) {
		if(this.options.hasOwnProperty(option)) {
			this.options[option] = value;
			this._result = null;
		}
	},
	preparePreLink : function(prelink) {
		if(prelink.indexOf('?') != -1) {
			if(prelink[prelink.length - 1] != '?' && prelink[prelink.length - 1] != '&') {
				prelink += '&';
			}
		} else {
			prelink += '?';
		}

		return prelink;
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
	var translator = this.options.translator;
	var pages = [];
	var i, link, className;
	var result = this.getPaginationData();
	var prelink = this.preparePreLink(result.prelink);

	pages.push('<div class="paginator">');

	if(result.pageCount < 2) {
		pages.push('</div>');
		return pages.join('');
	}
	if(result.previous) {
		pages.push('<a href="' + prelink + 'page=' + result.previous + '" class="paginator-previous">' + translator('PREVIOUS') + '</a>');
	}

	if(result.range.length) {
		for( i = 0, len = result.range.length; i < len; i++) {
			className = 'paginator-page';

			if(result.range[i] == result.current) {
				className = 'paginator-current';
			}
			if(i == 0) {
				className += ' paginator-page-first';
			} else if(i == len - 1) {
				className += ' paginator-page-last';
			}
			link = '<a href="' + prelink + 'page=' + result.range[i] + '" class="' + className + '">' + result.range[i] + '</a>';
			pages.push(link);
		}
	}
	if(result.next) {
		pages.push('<a href="' + prelink + 'page=' + result.next + '" class="paginator-next">' + translator('NEXT') + '</a>');
	}
	pages.push('</div>');
	return pages.join('');
};
var ItemPaginator = function(options) {
	Paginator.call(this, options);
	this.set('pageLinks', 1);
};
module.exports.ItemPaginator = ItemPaginator;

util.inherits(ItemPaginator, Paginator);

ItemPaginator.prototype.render = function() {
	var translator = this.options.translator;
	var result = this.getPaginationData();
	var pages = [];
	var prelink = this.preparePreLink(result.prelink);
	pages.push('<div class="paginator">');

	var currentPageReport = '<span class="paginator-current-report">';
	currentPageReport += translator('CURRENT_PAGE_REPORT').replace('{FromResult}', result.fromResult).replace('{ToResult}', result.toResult).replace('{TotalResult}', result.totalResult);
	currentPageReport += '</span>';
	pages.push(currentPageReport);
	if(result.first) {
		pages.push('<a href="' + prelink + 'page=' + result.first + '" class="paginator-first">' + translator('FIRST') + '</a>');
	} else {
		pages.push('<span class="paginator-first">' + translator('FIRST') + '</span>');
	}

	if(result.previous) {
		pages.push('<a href="' + prelink + 'page=' + result.previous + '" class="paginator-previous">' + translator('PREVIOUS') + '</a>');
	} else {
		pages.push('<span class="paginator-previous">' + translator('PREVIOUS') + '</span>');
	}

	if(result.next) {
		pages.push('<a href="' + prelink + 'page=' + result.next + '" class="paginator-next">' + translator('NEXT') + '</a>');
	} else {
		pages.push('<span class="paginator-next">' + translator('NEXT') + '</span>');
	}

	if(result.last) {
		pages.push('<a href="' + prelink + 'page=' + result.last + '" class="paginator-last">' + translator('LAST') + '</a>');
	} else {
		pages.push('<span class="paginator-last">' + translator('LAST') + '</span>');
	}
	
	pages.push('</div>');
	return pages.join('');
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
