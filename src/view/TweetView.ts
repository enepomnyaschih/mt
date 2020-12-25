import bindClass from "jwidget/bindClass";
import bindText from "jwidget/bindText";
import Component from "jwidget/Component";
import template from "jwidget/template";
import Tweet from "../model/Tweet";

@template(require<string>("./TweetView.jw.html"))
export default class TweetView extends Component {

	constructor(private tweet: Tweet) {
		super();
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", `url(${this.tweet.avatarUrl48})`);
	}

	protected renderTime(el: JQuery) {
		const timeAgo = new Date().getTime() - this.tweet.time;
		const text = this._getTimeString(timeAgo);
		el.text(text);
	}

	protected renderFullName(el: JQuery) {
		el.text(this.tweet.fullName);
	}

	protected renderShortName(el: JQuery) {
		el.text("@" + this.tweet.shortName);
	}

	protected renderText(el: JQuery) {
		el.html(this.tweet.contentHtml);
	}

	protected renderLike(el: JQuery) {
		const text = this.own(this.tweet.like.map(like => like ? "Unlike" : "Like"));
		bindText(el, text);
		this.own(bindClass(el, "active", this.tweet.like));
		el.on("click", event => {
			event.preventDefault();
			this.tweet.like.set(!this.tweet.like.get());
		});
	}

	protected renderRetweet(el: JQuery) {
		const text = this.own(this.tweet.retweet.map(retweet => retweet ? "Unretweet" : "Retweet"));
		bindText(el, text);
		this.own(bindClass(el, "active", this.tweet.retweet));
		el.on("click", event => {
			event.preventDefault();
			this.tweet.retweet.set(!this.tweet.retweet.get());
		});
	}

	private _getTimeString(timeAgo: number) {
		const minutes = timeAgo / 60000;
		if (minutes < 1) {
			return "Just now";
		}
		if (minutes < 60) {
			return Math.floor(minutes) + "m";
		}
		const hours = minutes / 60;
		if (hours < 24) {
			return Math.round(hours) + "h";
		}

		function pad(value: number): string {
			return (value < 10) ? ("0" + value) : String(value);
		}

		const date = new Date(new Date().getTime() - timeAgo);
		return date.getDate() + "." + pad(date.getMonth());
	}
}
