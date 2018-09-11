import "es6-promise/auto";
import "script-loader!jquery";
import "./index.styl";

import {createTweetByJson} from "./model/Tweet";
import TweetFeed from "./view/TweetFeed";

$(function () {
	const tweets = [
		{
			"fullName": "Road Runner",
			"shortName": "roadrunner",
			"avatarUrl48": "backend/avatar-48.png",
			"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
			"timeAgo": 215000,
			"like": false,
			"retweet": true
		},
		{
			"fullName": "Road Runner",
			"shortName": "roadrunner",
			"avatarUrl48": "backend/avatar-48.png",
			"contentHtml": "Tweet feed is growing",
			"timeAgo": 515000,
			"like": false,
			"retweet": false
		}
	].map(createTweetByJson);
	new TweetFeed(tweets).renderTo("body");
});
