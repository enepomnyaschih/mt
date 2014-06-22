mt.Data = function() {
	mt.Data._super.call(this);
	this.tweets = this.own(new JW.Array()).ownItems(); // JW.AbstractArray<mt.data.Tweet>
};

JW.extend(mt.Data, JW.Class);

mt.Data.createByJson = function(json) {
	var data = new mt.Data();
	data.tweets.addAll(JW.Array.map(json, mt.data.Tweet.createByJson));
	return data;
};

mt.data = {};
