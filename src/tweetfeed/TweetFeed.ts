import template from "jwidget/template";
import Component from "jwidget/Component";
import {mapArray} from "jwidget/mapper/array";

import Data from "../data/Data";
import TweetView from "../tweetview/TweetView";

require("./TweetFeed.styl");

@template(require<string>("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {
	constructor(private data: Data) {
		super();
	}

	protected renderTweets() {
		return this.own(mapArray(this.data.tweets, (tweet) => new TweetView(this.data, tweet)));
	}
}
