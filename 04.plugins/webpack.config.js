const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin')

module.exports = {
	plugins: [
		new CopyWebpackPlugin({
			from: 'public',
			to: 'css',
			ignore: ['**/index.html'] // 忽略某个文件
		})
	]
}