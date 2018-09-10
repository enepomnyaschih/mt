import Event from "jwidget/Event";
import Listenable from "jwidget/Listenable";

export default class Tweet {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl48: string;
	readonly contentHtml: string;
	readonly time: number;

	private _like: boolean;
	private _retweet: boolean;
	private _likeChangeEvent = new Event<boolean>();
	private _retweetChangeEvent = new Event<boolean>();

	constructor(config: TweetConfig) {
		this.fullName = config.fullName;
		this.shortName = config.shortName;
		this.avatarUrl48 = config.avatarUrl48;
		this.contentHtml = config.contentHtml;
		this.time = config.time;
		this._like = config.like;
		this._retweet = config.retweet;
	}

	get like() {
		return this._like;
	}

	set like(value) {
		if (this._like !== value) {
			this._like = value;
			this._likeChangeEvent.trigger(value);
		}
	}

	get likeChangeEvent(): Listenable<boolean> {
		return this._likeChangeEvent;
	}

	get retweet() {
		return this._retweet;
	}

	set retweet(value) {
		if (this._retweet !== value) {
			this._retweet = value;
			this._retweetChangeEvent.trigger(value);
		}
	}

	get retweetChangeEvent(): Listenable<boolean> {
		return this._retweetChangeEvent;
	}

	static createByJson(json: any) {
		return new Tweet({
			...json,
			time: new Date().getTime() - json["timeAgo"]
		});
	}
}

export interface TweetConfig {

	readonly fullName: string;
	readonly shortName: string;
	readonly avatarUrl48: string;
	readonly contentHtml: string;
	readonly time: number;
	readonly like: boolean;
	readonly retweet: boolean;
}
