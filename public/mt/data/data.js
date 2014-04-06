mt.Data = function() {
	mt.Data._super.call(this);
	this.profile = null;
	this.tweets = this.own(new JW.Array()).ownItems();
};

JW.extend(mt.Data, JW.Class, {
	/*
	mt.data.Profile profile;
	JW.AbstractArray<mt.data.Tweet> tweets;
	*/
});

mt.Data.createByJson = function(json) {
	var data = new mt.Data();
	data.profile = data.own(mt.data.Profile.createByJson(json.profile));
	data.tweets.addAll(JW.Array.map(json.tweets, mt.data.Tweet.createByJson));
	return data;
};
