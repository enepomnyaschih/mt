var Application = function() {
	Application._super.call(this);
};

JW.extend(Application, JW.UI.Component, {
	beforeRender: function() {
		this._super();

		// Bind a handler to "mousemove" event and aggregate the attachment
		this.own($(window).jwon("mousemove", function(event) {
			$(".output").text(event.pageX + ":" + event.pageY);
		}, this));
	},
	
	renderDestroyButton: function(el) {
		// On button click, destroy this component
		el.jwon("click", this.destroy, this);
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div jwid="tip">' +
				'This example demonstrates an easy way ' +
				'to aggregate jQuery event handlers inside components. ' +
				'Handler for "mousemove" event is aggregated inside component, ' +
				'so component destruction triggers event unbinding. Try it!' +
			'</div>' +
			'<div jwid="buttons">' +
				'<button type="button" jwid="destroy-button">Destroy component</button>' +
			'</div>' +
		'</div>'
});

$(function() {
	// Keep output outside of application, to demonstate that
	// event handler is unbound on application destruction.
	$("body").append(
		'<div class="output-box">' +
			'Mouse coordinates: <span class="output"></span>' +
		'<div>');

	new Application().renderTo("body");
});
