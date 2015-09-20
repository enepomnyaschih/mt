var NotFound = function(route) {
	NotFound._super.call(this);
	this.route = route; // string
};

JW.extend(NotFound, JW.UI.Component, {
	renderRoot: function(el) {
		el.text('The requested page "' + this.route + '" is not found');
	}
});
