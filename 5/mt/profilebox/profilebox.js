﻿mt.ProfileBox = function(data) {
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

JW.UI.template(mt.ProfileBox, {
	main:
		'<div jwclass="mt-profile-box">' +
			'<a jwid="top" class="blocklink" href="#" target="_blank">' +
				'<div jwid="avatar"></div>' +
				'<div jwid="full-name"></div>' +
				'<div jwid="show-profile">Show my profile</div>' +
				'<div class="clear"></div>' +
			'</a>' +
			'<div jwid="middle">' +
				'<a jwid="tweets" class="blocklink mt-profile-box-count" href="#" target="_blank">' +
					'<div jwid="tweets-value" class="mt-profile-box-count-value"></div>' +
					'<div class="mt-profile-box-count-label">TWEETS</div>' +
				'</a>' +
				'<a jwid="following" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/following" target="_blank">' +
					'<div jwid="following-value" class="mt-profile-box-count-value"></div>' +
					'<div class="mt-profile-box-count-label">FOLLOWING</div>' +
				'</a>' +
				'<a jwid="followers" class="blocklink mt-profile-box-count mt-profile-box-count-border" href="https://twitter.com/followers" target="_blank">' +
					'<div jwid="followers-value" class="mt-profile-box-count-value"></div>' +
					'<div class="mt-profile-box-count-label">FOLLOWERS</div>' +
				'</a>' +
				'<div class="clear"></div>' +
			'</div>' +
			'<div jwid="bottom">' +
				'<form jwid="compose-form">' +
					'<div jwid="compose-fields">' +
						'<textarea jwid="compose-input" type="text" placeholder="Compose tweet..."></textarea>' +
					'</div>' +
					'<div jwid="compose-buttons">' +
						'<input jwid="compose-submit" type="submit" value="Tweet">' +
					'</div>' +
				'</form>' +
			'</div>' +
		'</div>'
});
