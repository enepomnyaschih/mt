var data;
var application;

$(function() {
	data = mt.Data.createByJson(dataJson);
	application = new mt.Application(data);
	application.renderTo("body");
});
