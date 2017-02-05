import Data from './data/Data';
import Application from './application/Application';

require('./reset.css');

const json = require<any>('./data.json');
let data: Data;
let application: Application;

$(function() {
	data = Data.createByJson(json);
	application = new Application(data);
	application.renderTo('body');
});
