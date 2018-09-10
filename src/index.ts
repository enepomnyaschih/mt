import "es6-promise/auto";
import "script-loader!jquery";
import "./index.styl";

import Tweet from "./model/Tweet";
import TweetView from "./view/TweetView";

$(function () {
	const tweet = Tweet.createByJson({
		"fullName": "Road Runner",
		"shortName": "roadrunner",
		"avatarUrl48": "backend/avatar-48.png",
		"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
		"timeAgo": 215000,
		"like": false,
		"retweet": true
	});
	new TweetView(tweet).renderTo("body");
});
