// loader本质上是一个函数

// 异步loader（推荐使用，loader在异步加载的过程中可以执行其余的步骤）
module.exports = function(content, map, meta) {
	console.log(222);

	const callback = this.async();

	setTimeout(() => {
		callback(null, content);
	}, 1000)
}

module.exports.pitch = function() {
	console.log('pitch 222');
}