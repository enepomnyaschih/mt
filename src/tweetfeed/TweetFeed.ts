import template from "jwidget/template";
import Component from "jwidget/Component";

import Data from "../data/Data";
import TweetView from "../tweetview/TweetView";

require("./TweetFeed.css");

@template(require<string>("./TweetFeed.jw.html"))
export default class TweetFeed extends Component {
	constructor(private data: Data) {
		super();
	}

	protected renderTweets() {
		return this.own(this.data.tweets.$map((tweet) => {
			return new TweetView(tweet);
		})).ownItems();
	}
}
