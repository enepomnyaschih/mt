import {destroy} from "jwidget";
import {startMappingArray} from "jwidget/collection/ArrayMapper";
import Component from "jwidget/Component";
import template from "jwidget/template";
import ApplicationData from "../model/ApplicationData";
import TweetView from "./TweetView";

@template(require("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {

	constructor(private data: ApplicationData) {
		super();
	}

	protected renderTweets() {
		return this.own(startMappingArray(this.data.tweets, tweet => new TweetView(this.data, tweet), {destroy}));
	}
}
