mt.ProfileBox = function(data) {
	this._onComposeSubmit = JW.inScope(this._onComposeSubmit, this);
	mt.ProfileBox._super.call(this);
	this.data = data;
};

JW.extend(mt.ProfileBox, JW.UI.Component, {
	/*
	mt.Data data;
	*/
	
	renderTop: function(el) {
		el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
	},
	
	renderAvatar: function(el) {
		el.css("background-image", "url(" + this.data.profile.avatarUrl32 + ")");
	},
	
	renderFullName: function(el) {
		el.text(this.data.profile.fullName);
	},
	
	renderTweets: function(el) {
		el.attr("href", "https://twitter.com/" + this.data.profile.shortName);
	},
	
	renderTweetsValue: function(el) {
		el.text(this.data.profile.tweets);
	},
	
	renderFollowingValue: function(el) {
		el.text(this.data.profile.following);
	},
	
	renderFollowersValue: function(el) {
		el.text(this.data.profile.followers);
	},
	
	renderComposeForm: function(el) {
		el.submit(this._onComposeSubmit);
	},
	
	_onComposeSubmit: function(event) {
		event.preventDefault();
		var text = JW.String.trim(this.getElement("compose-input").val());
		if (!text) {
			return;
		}
		this.data.tweets.add(new mt.data.Tweet({
			fullName: this.data.profile.fullName,
			shortName: this.data.profile.shortName,
			avatarUrl48: this.data.profile.avatarUrl48,
			contentHtml: text,
			time: new Date().getTime(),
			like: false,
			retweet: false
		}), 0);
		this.getElement("compose-input").val("")
	}
});
