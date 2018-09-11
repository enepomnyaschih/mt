import Component from "jwidget/Component";
import template from "jwidget/template";
import ApplicationData from "../model/ApplicationData";
import Tweet from "../model/Tweet";

@template(require<string>("./ProfileBox.jw.html"))
export default class ProfileBox extends Component {

	constructor(private data: ApplicationData) {
		super();
	}

	get profile() {
		return this.data.profile;
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

	protected renderComposeForm(el: JQuery) {
		el.on("submit", event => {
			event.preventDefault();

			const text: string = <any>this.getElement("compose-input").val();
			if (!text) {
				return;
			}
			this.data.tweets.add(new Tweet({
				fullName: this.profile.fullName,
				shortName: this.profile.shortName,
				avatarUrl48: this.profile.avatarUrl48,
				contentHtml: text,
				time: new Date().getTime(),
				like: false,
				retweet: false
			}), 0);
			this.getElement("compose-input").val("");
		});
	}
}
