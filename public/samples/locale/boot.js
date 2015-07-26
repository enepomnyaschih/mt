var dictionary = {
	en: {
		_lang: "English",
		name: "Name",
		submit: "Submit",
		equipment: {
			monitor: "Monitor",
			keyboard: "Keyboard",
			mouse: "Mouse"
		},
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	},
	ru: {
		_lang: "Русский",
		name: "Имя",
		submit: "Отправить",
		equipment: {
			monitor: "Монитор",
			keyboard: "Клавиатура",
			mouse: "Мышь"
		},
		monthsShort: ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
		              "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"]
	}
};

$(function() {
	var lang = new JW.Property("en");
	var locale = new JW.Plugins.Locale(dictionary, lang);
	var switcher = new LocaleSwitch(locale).renderTo("body");
	var form = new Form(locale).renderTo("body");
	var equipmentLocale = locale.getSubLocale("equipment");
	var equipmentSelector = new EquipmentSelector(equipmentLocale).renderTo("body");
});
