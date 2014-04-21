window.pagination = {};
window.exports = pagination;
window.pagination.util = {
	inherits : function(subc, superc) {
		if(!superc || !subc) {
			throw new Error("extend failed, please check that all dependencies are included.");
		}
		var F = function() {};
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