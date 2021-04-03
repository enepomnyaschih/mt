import $ from "jquery";
import Component from "jwidget/Component";
import template from "jwidget/template";
import ApplicationData from "../model/ApplicationData";
import ProfileBox from "./ProfileBox";
import TweetFeed from "./TweetFeed";

@template(require("./Application.jw.html"))
export default class Application extends Component {

	constructor(private data: ApplicationData) {
		super();
	}

	protected renderTweets() {
		return this.own(new TweetFeed(this.data.tweets));
	}

	protected renderProfileBox() {
		return this.own(new ProfileBox(this.data.profile));
	}

	protected afterRender() {
		super.afterRender();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
	}
}
