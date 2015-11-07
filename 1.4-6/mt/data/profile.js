mt.data.Profile = function(config) {
	mt.data.Profile._super.call(this);
	this.fullName = config.fullName; // string
	this.shortName = config.shortName; // string
	this.avatarUrl32 = config.avatarUrl32; // string
	this.avatarUrl48 = config.avatarUrl48; // string
	this.tweets = config.tweets; // number
	this.following = config.following; // number
	this.followers = config.followers; // number
};

JW.extend(mt.data.Profile, JW.Class);

mt.data.Profile.createByJson = function(json) {
	return new mt.data.Profile(json);
};
