mt.data.Profile = function(config) {
	mt.data.Profile._super.call(this);
	this.fullName = config.fullName;
	this.shortName = config.shortName;
	this.avatarUrl32 = config.avatarUrl32;
	this.avatarUrl48 = config.avatarUrl48;
	this.tweets = config.tweets;
	this.following = config.following;
	this.followers = config.followers;
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
	*/
});

mt.data.Profile.createByJson = function(json) {
	return new mt.data.Profile(json);
};
