exports.module = function(pagination, util) {
	"use strict";
	var cache = {};
	var parse = function(str, options) {
		var options = options || {}
		,open = options.open || '<%'
		,close = options.close || '%>';
		var prefix, postfix, i, end, len, js, start, n;
		var buf = ["var buf = [];",
		           "\nwith (paginationData) {",
		           "\n  buf.push('"];
		for (i = 0, len = str.length; i < len; ++i) {
			if (str.slice(i, open.length + i) === open) {
				i += open.length;
				switch (str.substr(i, 1)) {
					case '=':
						prefix = "', escape(";
						postfix = "), '";
						++i;
						break;
					case '-':
						prefix = "', (" ;
						postfix = "), '";
						++i;
						break;
					default:
						prefix = "');";
						postfix = "; buf.push('";
				}
				end = str.indexOf(close, i);
				js = str.substring(i, end);
				start = i; n = 0;
				while (~(n = js.indexOf("\n", n))) n++;
				buf.push(prefix, js, postfix);
				i += end - start + close.length - 1;
			} else if (str.substr(i, 1) === "\\") {
				buf.push("\\\\");
			} else if (str.substr(i, 1) === "'") {
				buf.push("\\'");
			} else if (str.substr(i, 1) === "\r") {
				buf.push(" ");
			} else if (str.substr(i, 1) === "\n") {
				buf.push("\\n");
			} else {
				buf.push(str.substr(i, 1));
			}
		}
		buf.push("');\n}\nreturn buf.join('');");
		return buf.join('');
	};
	var _escape = function(text) {
		return String(text)
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#39;');
	};
	var _compile = function(str, options) {
		var fn = new Function('paginationData, escape', parse(str, options));
		return function(paginationData){
			return fn.call(this, paginationData, _escape);
		};
	};
	
	var compile = function(str, options){
		var fn, options = options || {};
		if (options.cache) {
			if (options.id) {
				fn = cache[options.id] || (cache[options.id] = _compile(str, options));
			} else {
				throw new Error('"cache" option requires "id"');
			}
		} else {
			fn = _compile(str, options);
		}
		return fn;
	};
	
	pagination.TemplateEngine = {
		parse : parse,
		compile : compile
	};
};
