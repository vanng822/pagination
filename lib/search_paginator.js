exports.module = function(pagination, util) {
	"use strict";
	var SearchPaginator = function(options) {
		pagination.Paginator.call(this, options);
	};

	pagination.SearchPaginator = SearchPaginator;

	util.inherits(SearchPaginator, pagination.Paginator);

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
	pagination.registerFactory('search', SearchPaginator);
};
