var ItemView = function() {
	ItemView._super.call(this);
};

JW.extend(ItemView, JW.UI.Component, {
	renderRoot: function() {
		this.el.css("background-color", "#" + JW.String.prepend(Math.floor(Math.random() * 0x1000000).toString(16), 6, "0"));
	}
});

JW.UI.template(ItemView, {
	main: '<div jwclass="item"></div>'
});

var ArrayView = function() {
	ArrayView._super.call(this);
	this.items = this.own(new JW.ObservableArray()).ownItems();
};

JW.extend(ArrayView, JW.UI.Component, {
	renderRoot: function() {
		return this.items;
	}
});

JW.UI.template(ArrayView, {
	main:
		'<div jwclass="array">' +
			                              // <---------- ITEMS
			'<div class="clear"></div>' + // <---------- CLEAR DIV
		'</div>'
});

$(function() {
	var arrayView = new ArrayView().renderTo("body");
	for (var i = 0; i < 10; ++i) {
		arrayView.items.add(new ItemView());
	}
	$('body').append('Lightgray background is visible because clear-div is present at the end.')
});
