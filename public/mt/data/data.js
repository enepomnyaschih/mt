mt.Data = function() {
	mt.Data._super.call(this);
	this.profile = null;
	this.tweets = new JW.ObservableArray();
	this.tweets.lengthChangeEvent.bind(this._onTweetsLengthChange, this);
};

JW.extend(mt.Data, JW.Class, {
	/*
	mt.data.Profile profile;
	JW.ObservableArray<mt.data.Tweet> tweets;
	*/
	
	// override
	destroy: function() {
		this.tweets.destroy();
		this._super();
	},
	
	load: function(success, scope) {
		function onLoad(result) {
			this.profile = mt.data.Profile.createByJson(result.profile);
			this.tweets.addAll(JW.Array.map(result.tweets, mt.data.Tweet.createByJson));
			if (success) {
				success.call(scope || this);
			}
		}
		
		$.ajax({
			url: "/backend/tweets.json",
			type: "get",
			dataType: "json",
			success: onLoad,
			context: this
		});
	},
	
	_onTweetsLengthChange: function(params) {
		this.profile.setTweets(this.profile.tweets + params.newLength - params.oldLength);
	}
});

mt.data = {};
