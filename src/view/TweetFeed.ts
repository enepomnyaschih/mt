import BindableArray from "jwidget/BindableArray";
import Component from "jwidget/Component";
import template from "jwidget/template";
import Tweet from "../model/Tweet";
import TweetView from "./TweetView";

@template(require<string>("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {

	constructor(private tweets: Tweet[]) {
		super();
	}

	protected renderTweets() {
		const tweetViews = this.tweets.map(tweet => new TweetView(tweet));
		return this.own(new BindableArray(tweetViews)).ownValues();
	}
}
