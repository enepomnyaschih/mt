import Class from 'jwidget/Class';

export default class Tweet extends Class {
	private _fullName: string;
	private _shortName: string;
	private _avatarUrl48: string;
	private _contentHtml: string;
	private _time: number;
	private _like: boolean;
	private _retweet: boolean;

	constructor(config: TweetConfig) {
		super();
		this._fullName = config.fullName;
		this._shortName = config.shortName;
		this._avatarUrl48 = config.avatarUrl48;
		this._contentHtml = config.contentHtml;
		this._time = config.time;
		this._like = config.like;
		this._retweet = config.retweet;
	}

	public get fullName(): string {
		return this._fullName;
	}

	public get shortName(): string {
		return this._shortName;
	}

	public get avatarUrl48(): string {
		return this._avatarUrl48;
	}

	public get contentHtml(): string {
		return this._contentHtml;
	}

	public get time(): number {
		return this._time;
	}

	public get like(): boolean {
		return this._like;
	}

	public get retweet(): boolean {
		return this._retweet;
	}

	public static createByJson(json: any): Tweet {
		return new Tweet({
			fullName: json['fullName'],
			shortName: json['shortName'],
			avatarUrl48: json['avatarUrl48'],
			contentHtml: json['contentHtml'],
			time: new Date().getTime() - json['timeAgo'],
			like: json['like'],
			retweet: json['retweet']
		});
	}
}

export interface TweetConfig {
	fullName: string;
	shortName: string;
	avatarUrl48: string;
	contentHtml: string;
	time: number;
	like: boolean;
	retweet: boolean;
}
