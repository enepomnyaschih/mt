import template from "jwidget/template";
import Component from "jwidget/Component";

import Data from "../data/Data";

require("./ProfileBox.css");

@template(require<string>("./ProfileBox.jw.html"))
export default class ProfileBox extends Component {
	constructor(private data: Data) {
		super();
	}

	protected renderTop(el: JQuery) {
		el.attr("href", `https://twitter.com/${this.data.profile.shortName}`);
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", `url(${this.data.profile.avatarUrl32})`);
	}

	protected renderFullName(el: JQuery) {
		el.text(this.data.profile.fullName);
	}

	protected renderTweets(el: JQuery) {
		el.attr("href", `https://twitter.com/${this.data.profile.shortName}`);
	}

	protected renderTweetsValue(el: JQuery) {
		el.text(this.data.profile.tweets);
	}

	protected renderFollowingValue(el: JQuery) {
		el.text(this.data.profile.following);
	}

	protected renderFollowersValue(el: JQuery) {
		el.text(this.data.profile.followers);
	}
}
