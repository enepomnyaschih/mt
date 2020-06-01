import Component from "jwidget/Component";
import template from "jwidget/template";
import Profile from "../model/Profile";

@template(require<string>("./ProfileBox.jw.html"))
export default class ProfileBox extends Component {

	constructor(private profile: Profile) {
		super();
	}

	protected renderTop(el: JQuery) {
		el.attr("href", "https://twitter.com/" + this.profile.shortName);
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", "url(" + this.profile.avatarUrl32 + ")");
	}

	protected renderFullName(el: JQuery) {
		el.text(this.profile.fullName);
	}

	protected renderTweets(el: JQuery) {
		el.attr("href", "https://twitter.com/" + this.profile.shortName);
	}

	protected renderTweetsValue(el: JQuery) {
		el.text(this.profile.tweets);
	}

	protected renderFollowingValue(el: JQuery) {
		el.text(this.profile.following);
	}

	protected renderFollowersValue(el: JQuery) {
		el.text(this.profile.followers);
	}
}
