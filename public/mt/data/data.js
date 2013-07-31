mt.Data = function() {
	mt.Data._super.call(this);
	this.tweets = new JW.ObservableArray();
};

JW.extend(mt.Data, JW.Class, {
	/*
	JW.ObservableArray<mt.data.Tweet> tweets;
	*/
	
	// override
	destroy: function() {
		this.tweets.destroy();
		this._super();
	},
	
	load: function() {
		$.ajax({
			url: "/backend/tweets.json",
			type: "get",
			dataType: "json",
			success: this._onLoad,
			context: this
		});
	},
	
	_onLoad: function(result) {
		this.tweets.addAll(JW.Array.map(result.tweets, mt.data.Tweet.createByJson));
	}
});

mt.data = {};
