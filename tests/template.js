var assert = require('assert');
var TemplateEngine = require('../lib/pagination.js').TemplateEngine;

var vows = require('vows');

// some simple control
vows.describe('Test suite for TemplateEngine').addBatch({
	compileForLoop: function() {
		assert.equal('<li><a href="/page/1">1</a></li><li><a href="/page/3">3</a></li><li><a href="/page/4">4</a></li><li><a href="/page/8">8</a></li>',
				TemplateEngine.compile('<% for ( var i = 0; i < range.length; i++ ) { %>'
				+ '<li><a href="<%=prelink %><%=range[i]%>"><%=range[i]%></a></li>'
				+ '<% } %>')({range:[1,3,4,8], prelink: '/page/'}));
	},
	compileIfControl: function() {
		assert.equal('first', TemplateEngine.compile('<% if (first) {%>first<%}%>')({first:1}));
	},
	compileSwitchControl: function() {
		assert.equal('two', TemplateEngine.compile('<% switch(first) { case 1:%>first<%break; case 2:%>two<%}%>')({first:2}));
	},
	customedTemplateTag: function() {
		// }}} will match the first one; need to separate this case; } }}
		assert.equal('2', TemplateEngine.compile('{{ switch(first) { case 1: }}first{{ break; case 2: }}{{=first}}{{ } }}', {open: '{{', close : '}}'})({first:2}));
	},
	escapeMarkup: function() {
		assert.equal('%3Cscript%3Ealert%280%29%3B%3C/script%3E', TemplateEngine.compile('<%=script%>')({script:'<script>alert(0);</script>'}));
		assert.equal('%3Ca%20href%3D%22javascript%3A%3Aalert%280%29%22%3Etest%3C/a%3E', TemplateEngine.compile('<%=tag%>')({tag:'<a href="javascript::alert(0)">test</a>'}));
	}
}).export(module);