var Settings = function() {
	Settings._super.call(this);
};

JW.extend(Settings, JW.UI.Component);

JW.UI.template(Settings, {
	main: '<div jwclass="settings">There\'s nothing to configure!</div>'
});
