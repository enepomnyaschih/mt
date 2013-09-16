mt.Application = function() {
	mt.Application._super.call(this);
	this.data = null;
};

JW.extend(mt.Application, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
	// override
	beforeRender: function() {
		this._super();
		this.data = new mt.Data();
	},
	
	renderTweets: function() {
		return new mt.TweetFeed(this.data);
	},
	
	// override
	renderComponent: function() {
		this._super();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
		this.data.load(this._onDataLoad, this);
	},
	
	// override
	destroyComponent: function() {
		this.data.destroy();
		this._super();
	},
	
	_onDataLoad: function() {
		this.children.set(new mt.ProfileBox(this.data), "profile-box");
	}
});
