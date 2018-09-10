import {destroy} from "jwidget";
import Component from "jwidget/Component";
import {mapList} from "jwidget/mapper/list";
import ReadonlyList from "jwidget/ReadonlyList";
import template from "jwidget/template";
import Tweet from "../model/Tweet";
import TweetView from "./TweetView";

@template(require<string>("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {

	constructor(private tweets: ReadonlyList<Tweet>) {
		super();
	}

	protected renderTweets() {
		return this.own(mapList(this.tweets, tweet => new TweetView(tweet), {destroy}));
	}
}
