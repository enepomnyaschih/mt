import template from "jwidget/template";
import Component from "jwidget/Component";
import Interval from "jwidget/Interval";

import Tweet from "../data/Tweet";

require("./TweetView.css");

@template(require<string>("./TweetView.jw.html"))
export default class TweetView extends Component {
	constructor(private tweet: Tweet) {
		super();
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", `url(${this.tweet.avatarUrl48})`);
	}

	protected renderTime() {
		this._updateTime();
		this.own(new Interval(() => this._updateTime(), 30000));
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
		this.own(this.tweet.likeChangeEvent.bind(() => this._updateLike()));
		el.click((e) => this._onLikeClick(e));
	}

	protected renderRetweet(el: JQuery) {
		this._updateRetweet();
		this.own(this.tweet.retweetChangeEvent.bind(() => this._updateRetweet()));
		el.click((e) => this._onRetweetClick(e));
	}

	private _updateTime() {
		const timeAgo = new Date().getTime() - this.tweet.time;
		const text = this._getTimeString(timeAgo);
		this.getElement("time").text(text);
	}

	private _updateLike() {
		this.getElement("like").
			toggleClass("active", this.tweet.like).
			text(this.tweet.like ? "Unlike" : "Like");
	}

	private _updateRetweet() {
		this.getElement("retweet").
			toggleClass("active", this.tweet.retweet).
			text(this.tweet.retweet ? "Unretweet" : "Retweet");
	}

	private _onLikeClick(e: JQueryEventObject) {
		e.preventDefault();
		this.tweet.setLike(!this.tweet.like);
	}

	private _onRetweetClick(e: JQueryEventObject) {
		e.preventDefault();
		this.tweet.setRetweet(!this.tweet.retweet);
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
