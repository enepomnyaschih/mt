mt.Application = function(localeData) {
	mt.Application._super.call(this);
	this.localeData = localeData;
	this.locale = null;
	this.data = null;
	this._mapper = null;
};

JW.extend(mt.Application, JW.UI.Component, {
	/*
	Object localeData;
	mt.Locale locale;
	mt.Data data;
	JW.AbstractArray.Mapper<mt.data.Tweet, mt.TweetView> _mapper;
	*/
	
	// override
	beforeRender: function() {
		this._super();
		this.locale = new mt.Locale(this.localeData);
		this.data = new mt.Data();
	},
	
	renderLocalePicker: function() {
		return new mt.LocalePicker(this.locale);
	},
	
	renderTweets: function() {
		this._mapper = this.data.tweets.createMapper({
			createItem: function(tweetData) {
				return new mt.TweetView(this.locale, tweetData);
			},
			destroyItem: JW.destroy,
			scope: this
		});
		return this._mapper.target;
	},
	
	// override
	renderComponent: function() {
		this._super();
		this.data.load();
	},
	
	// override
	destroyComponent: function() {
		this._mapper.destroy();
		this.data.destroy();
		this.locale.destroy();
		this._super();
	}
});
