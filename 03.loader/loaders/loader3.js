// 1.1 获取options 引入
const {
	getOptions
} = require('loader-utils');
// 2.1 获取validate（校验options是否合法）引入
const {
	validate
} = require('schema-utils');

// 2.3创建schema.json文件校验规则并引入使用
const schema = require('./schema');

module.exports = function(content, map, meta) {
	// 1.2 获取options 使用
	const options = getOptions(this);

	console.log(333, options);

	// 2.2校验options是否合法 使用
	validate(schema, options, {
		name: 'loader3'
	})

	return content;
}

module.exports.pitch = function() {
	console.log('pitch 333');
}