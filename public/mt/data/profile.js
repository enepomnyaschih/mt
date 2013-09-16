mt.data.Profile = function(config) {
	mt.data.Profile._super.call(this);
	this.fullName = config.fullName;
	this.shortName = config.shortName;
	this.avatarUrl32 = config.avatarUrl32;
	this.avatarUrl48 = config.avatarUrl48;
	this.tweets = config.tweets;
	this.following = config.following;
	this.followers = config.followers;
	this.tweetsChangeEvent = new JW.Event();
};

JW.extend(mt.data.Profile, JW.Class, {
	/*
	string fullName;
	string shortName;
	string avatarUrl32;
	string avatarUrl48;
	number tweets;
	number following;
	number followers;
	JW.Event<JW.ValueEventParams<number>> tweetsChangeEvent;
	*/
	
	// override
	destroy: function() {
		this.tweetsChangeEvent.destroy();
		this._super();
	},
	
	setTweets: function(value) {
		if (this.tweets === value) {
			return;
		}
		this.tweets = value;
		this.tweetsChangeEvent.trigger(new JW.ValueEventParams(this, value));
	}
});

mt.data.Profile.createByJson = function(json) {
	return new mt.data.Profile(json);
};
