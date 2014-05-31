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
		assert.equal('&lt;script&gt;alert(&#39;0&#39;);&lt;/script&gt;', TemplateEngine.compile('<%=script%>')({script:"<script>alert('0');</script>"}));
		assert.equal('&lt;a href=&quot;/?t=1&amp;p=2&amp;s=3&quot; onclick=&quot;javascript::alert(0)&quot;&gt;test&lt;/a&gt;', TemplateEngine.compile('<%=tag%>')({tag:'<a href="/?t=1&p=2&s=3" onclick="javascript::alert(0)">test</a>'}));
	}
}).export(module);