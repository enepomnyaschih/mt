import template from 'jwidget/template';
import Component from 'jwidget/Component';

import Tweet from '../data/Tweet';

require('./TweetView.css');

@template(require<string>('./TweetView.jw.html'))
export default class TweetView extends Component {
	constructor(private tweet: Tweet) {
		super();
	}

	protected renderAvatar(el: JQuery) {
		el.css("background-image", "url(" + this.tweet.avatarUrl48 + ")");
	}

	protected renderTime(el: JQuery) {
		let timeAgo = new Date().getTime() - this.tweet.time;
		let text = this._getTimeString(timeAgo);
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
		el.toggleClass("active", this.tweet.like).text(this.tweet.like ? "Unlike" : "Like");
	}

	protected renderRetweet(el: JQuery) {
		el.toggleClass("active", this.tweet.retweet).text(this.tweet.retweet ? "Unretweet" : "Retweet");
	}

	private _getTimeString(timeAgo: number) {
		let minutes = timeAgo / 60000;
		if (minutes < 1) {
			return "Just now";
		}
		if (minutes < 60) {
			return Math.floor(minutes) + "m";
		}
		let hours = minutes / 60;
		if (hours < 24) {
			return Math.round(hours) + "h";
		}

		function pad(value: number): string {
			return (value < 10) ? ("0" + value) : String(value);
		}

		let date = new Date(new Date().getTime() - timeAgo);
		return date.getDate() + "." + pad(date.getMonth());
	}
}
