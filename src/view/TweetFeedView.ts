import {destroy} from "jwidget";
import Component from "jwidget/Component";
import {mapList} from "jwidget/mapper/list";
import template from "jwidget/template";
import TweetFeed from "../model/TweetFeed";
import TweetView from "./TweetView";

@template(require<string>("./TweetFeedView.jw.html"))
export default class TweetFeedView extends Component {

	constructor(private tweetFeed: TweetFeed) {
		super();
	}

	protected renderTweets() {
		return this.own(mapList(this.tweetFeed.tweets, tweet => new TweetView(tweet), {destroy}));
	}
}
