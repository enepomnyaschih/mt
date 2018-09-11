import Component from "jwidget/Component";
import template from "jwidget/template";
import ApplicationData from "../model/ApplicationData";
import ProfileBox from "./ProfileBox";
import TweetFeed from "./TweetFeed";

@template(require<string>("./Application.jw.html"))
export default class Application extends Component {

	constructor(private data: ApplicationData) {
		super();
	}

	protected renderProfileBox() {
		return this.own(new ProfileBox(this.data));
	}

	protected renderTweets() {
		return this.own(new TweetFeed(this.data));
	}

	protected afterRender() {
		super.afterRender();
		$("html").addClass("mt-html");
		$("body").addClass("mt-body");
	}
}
