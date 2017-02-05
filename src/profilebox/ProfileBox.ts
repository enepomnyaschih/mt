import template from "jwidget/template";
import Component from "jwidget/Component";
import * as StringUtils from "jwidget/StringUtils";

import Data from "../data/Data";
import Tweet from "../data/Tweet";

require("./ProfileBox.styl");

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

	protected renderComposeForm(el: JQuery) {
		el.submit((e) => this._onComposeSubmit(e));
	}

	private _onComposeSubmit(e: JQueryEventObject) {
		e.preventDefault();
		const text = StringUtils.trim(this.getElement("compose-input").val());
		if (!text) {
			return;
		}
		this.data.tweets.add(new Tweet({
			fullName: this.data.profile.fullName,
			shortName: this.data.profile.shortName,
			avatarUrl48: this.data.profile.avatarUrl48,
			contentHtml: text,
			time: new Date().getTime(),
			like: false,
			retweet: false
		}), 0);
		this.getElement("compose-input").val("");
	}
}
