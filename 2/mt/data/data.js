mt.Data = function() {
	mt.Data._super.call(this);
	this.tweets = new JW.Array();
};

JW.extend(mt.Data, JW.Class, {
	/*
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
	data.tweets.addAll(JW.Array.map(json, mt.data.Tweet.createByJson));
	return data;
};

mt.data = {};
