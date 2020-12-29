// loader本质上是一个函数

// 方式一
module.exports = function(content, map, meta) {
		console.log(111);

		return content;
	}
	// 方式二
module.exports = function(content, map, meta) {
	console.log(111);

	this.callback(null, content, map, meta);
}

module.exports.pitch = function() {
	console.log('pitch 111');
}