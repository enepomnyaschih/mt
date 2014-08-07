mt.Data = function() {
	mt.Data._super.call(this);
	this.profile = null; // mt.data.Profile
	this.tweets = this.own(new JW.ObservableArray()).ownItems(); // JW.AbstractArray<mt.data.Tweet>
};

JW.extend(mt.Data, JW.Class);

mt.Data.createByJson = function(json) {
	var data = new mt.Data();
	data.profile = data.own(mt.data.Profile.createByJson(json.profile));
	data.tweets.addAll(JW.Array.map(json.tweets, mt.data.Tweet.createByJson));
	return data;
};

mt.data = {};
