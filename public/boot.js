var data;
var profileBox;

$(function() {
	data = mt.Data.createByJson({
		"profile": {
			"fullName": "Egor Nepomnyaschih",
			"shortName": "enepomnyaschih",
			"avatarUrl32": "backend/avatar-32.png",
			"avatarUrl48": "backend/avatar-48.png",
			"tweets": 380,
			"following": 21,
			"followers": 27
		}
	});
	profileBox = new mt.ProfileBox(data);
	profileBox.renderTo("#container");
});
