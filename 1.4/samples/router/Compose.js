var Compose = function() {
	Compose._super.call(this);
};

JW.extend(Compose, JW.UI.Component);

JW.UI.template(Compose, {
	main: '<textarea jwclass="compose" cols="80" rows="5">Compose email! (honestly, this text area has no real purpose)</textarea>'
});
