import Tweet from "./model/Tweet";
import TweetView from "./view/TweetView";

require("./reset.css");

const json = require<any>("./data.json");

$(function() {
	const tweet = Tweet.createByJson(json);
	const tweetView = new TweetView(tweet);
	tweetView.renderTo("body");

	(<any>window).tweet = tweet; // for debugging
});
