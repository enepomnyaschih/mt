mt.Data = function() {
	mt.Data._super.call(this);
	this.profile = null;
	this.tweets = new JW.ObservableArray();
};

JW.extend(mt.Data, JW.Class, {
	/*
	mt.data.Profile profile;
	JW.AbstractArray<mt.data.Tweet> tweets;
	*/
	
	// override
	destroy: function() {
		this.tweets.destroy();
		this._super();
	}
});

mt.Data.createByJson = function(json) {
	var data = new mt.Data();
	data.profile = mt.data.Profile.createByJson(json.profile);
	data.tweets.addAll(JW.Array.map(json.tweets, mt.data.Tweet.createByJson));
	return data;
};

mt.data = {};
