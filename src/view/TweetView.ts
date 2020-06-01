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
		this._updateLike();
		this.tweet.likeChangeEvent.listen(() => this._updateLike());
		el.on("click", event => {
			event.preventDefault();
			this.tweet.like = !this.tweet.like;
		});
	}

	protected renderRetweet(el: JQuery) {
		this._updateRetweet();
		this.tweet.retweetChangeEvent.listen(() => this._updateRetweet());
		el.on("click", event => {
			event.preventDefault();
			this.tweet.retweet = !this.tweet.retweet;
		});
	}

	private _updateLike() {
		this.getElement("like").toggleClass(
			"active", this.tweet.like).text(this.tweet.like ? "Unlike" : "Like");
	}

	private _updateRetweet() {
		this.getElement("retweet").toggleClass(
			"active", this.tweet.retweet).text(this.tweet.retweet ? "Unretweet" : "Retweet");
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
