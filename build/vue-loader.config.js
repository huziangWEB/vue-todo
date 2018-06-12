// const docsLoader = require.resolve('./doc-loader')


module.exports = (isDev) => {
	return {
		preserveWhitepace: true, //防止vue文件模板空格被渲染
		extractCSS: !isDev,
		cssModules: {
			localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
			camelCase: true
		},
		//hotReload: false  //根据环境变量生成
		// loaders: {
		// 	'docs': docsLoader,
		// 	js: 'coffe-loader'

		// },
		// preLoader: {
		// },
		// postLoader: {
			
		// }
	}
}