mt.Application = Class.extend({
	/*
	Required options
	Object localeData;
	Object tweetData;
	
	Fields
	mt.Locale locale;
	mt.Data data;
	Element el;
	mt.LocalePicker localePicker;
	mt.Tweet tweet;
	*/
	
	init: function(config) {
		this.locale = new mt.Locale(config.localeData);
		this.data = new mt.Data(config.tweetData);
		this._render();
	},
	
	_render: function() {
		this.el = $(mt.Application.template);
		
		this.localePicker = new mt.LocalePicker(this.locale);
		this.el.find(".mt-application-locale-picker").replaceWith(this.localePicker.el);
		
		this.tweet = new mt.Tweet(this.locale, this.data);
		this.el.find(".mt-application-tweet").replaceWith(this.tweet.el);
	}
});

mt.Application.template =
	'<div class="mt-application">' +
		'<div class="mt-application-locale-picker" />' +
		'<div class="mt-application-tweet" />' +
		'<div class="clear" />' +
	'</div>';
