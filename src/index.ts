import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.styl";

import $ from "jquery";
import ApplicationData from "./model/ApplicationData";
import Application from "./view/Application";

$(function () {
	const data = ApplicationData.createByJson({
		"profile": {
			"fullName": "Road Runner",
			"shortName": "roadrunner",
			"avatarUrl32": "backend/avatar-32.png",
			"avatarUrl48": "backend/avatar-48.png",
			"tweets": 380,
			"following": 21,
			"followers": 27
		},
		"tweets": [
			{
				"fullName": "Road Runner",
				"shortName": "roadrunner",
				"avatarUrl48": "backend/avatar-48.png",
				"contentHtml": "jWidget documentation is here <a href=\"https://enepomnyaschih.github.com/jwidget\" target=\"_blank\">enepomnyaschih.github.com/jwidget</a>",
				"timeAgo": 215000,
				"like": false,
				"retweet": true
			}, {
				"fullName": "Road Runner",
				"shortName": "roadrunner",
				"avatarUrl48": "backend/avatar-48.png",
				"contentHtml": "Tweet feed is growing",
				"timeAgo": 515000,
				"like": false,
				"retweet": false
			}
		]
	});
	new Application(data).renderTo("body");

	(<any>window).data = data;
});
