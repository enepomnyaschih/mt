import template from "jwidget/template";
import Component from "jwidget/Component";

import Data from "../data/Data";
import ProfileBox from "../profilebox/ProfileBox";
import TweetFeed from "../tweetfeed/TweetFeed";

require("./Application.styl");

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {
	constructor(private data: Data) {
		super();
	}

	protected renderProfileBox() {
		return this.own(new ProfileBox(this.data));
	}

	protected renderTweets() {
		return this.own(new TweetFeed(this.data));
	}

	protected afterRender() {
		super.afterRender();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
	}
}
