import {destroy} from "jwidget";
import Component from "jwidget/Component";
import {mapList} from "jwidget/mapper/list";
import template from "jwidget/template";
import ApplicationData from "../model/ApplicationData";
import TweetView from "./TweetView";

@template(require<string>("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {

	constructor(private data: ApplicationData) {
		super();
	}

	protected renderTweets() {
		return this.own(mapList(this.data.tweets, tweet => new TweetView(this.data, tweet), {destroy}));
	}
}
