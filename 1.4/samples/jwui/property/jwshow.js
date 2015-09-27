var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	renderRect: function(el) {
		var checked = this.own(this.getElement("checkbox").jwprop("checked"));
		this.own(el.jwshow(checked));
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div><label><input jwid="checkbox" type="checkbox">Show rectangle</label></div>' +
			'<div jwid="rect"></div>' +
		'</div>'
});

$(function() {
	new Application().renderTo("body");
});
