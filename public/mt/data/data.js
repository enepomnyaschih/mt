mt.Data = function() {
	mt.Data._super.call(this);
	this.profile = null;
};

JW.extend(mt.Data, JW.Class, {
	/*
	mt.data.Profile profile;
	*/
});

mt.Data.createByJson = function(json) {
	var data = new mt.Data();
	data.profile = mt.data.Profile.createByJson(json.profile);
	return data;
};

mt.data = {};
