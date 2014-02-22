exports.module = function(pagination, util) {
	"use strict";
	
	var TemplatePaginator = pagination.TemplatePaginator = function(options) {
		var template = options.template;
		if (!template) {
			throw new Error('Template compile to function needed');
		}
		
		if (!(template.constructor && template.call && template.apply)) {
			template = pagination.TemplateEngine.compile(String(template), options);
		}
		pagination.Paginator.call(this, options);
		this.renderer = template;
	};
	util.inherits(TemplatePaginator, pagination.Paginator);
	TemplatePaginator.prototype.render = function() {
		var i, len, data = this.getPaginationData();
		data.preparedPreLink = this.preparePreLink(data.prelink);
		data.translations = {};
		for (i = 0, len = pagination.translationKeys.length; i < len; i++) {
			data.translations[pagination.translationKeys[i]] = this.options.translator(pagination.translationKeys[i]);
		}
		return this.renderer(data);
	};
	pagination.registerFactory('template', TemplatePaginator);
};
