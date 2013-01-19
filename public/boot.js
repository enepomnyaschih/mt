var application;

$(function() {
	application = new mt.Application({
		localeData : mt.locale,
		tweetData  : testData
	});
	
	$("body").append(application.el);
});
