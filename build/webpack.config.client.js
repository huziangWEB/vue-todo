/*
* @Author: huziangWEB
* @Date:   2018-06-09 01:05:46
* @Last Modified by:   huziangWEB
* @Last Modified time: 2018-06-09 02:05:47
*/
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
	new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
	
]
const devServer = {
								    port: 8000,
								    host: '0.0.0.0',
								    overlay: {
								      errors: true,
								    },
								    hot: true
								  }
let config

if (isDev) {
	config = merge( baseConfig, {
		devtool: '#cheap-module-eval-source-map',
		module: {
			rules: [
				{
			    test: /\.styl/,
			    use: [
			      'style-loader',
			      'css-loader',
			      {
			        loader: 'postcss-loader',
			        options: {
			          sourceMap: true,
			        }
			      },
			      'stylus-loader'
			    ]
			  }
			]
		},
		devServer,
		plugins: defaultPlugins.concat([
					new webpack.HotModuleReplacementPlugin(),
		    	new webpack.NoEmitOnErrorsPlugin()
				])
	})


} else {
	config = merge(baseConfig, {
		entry: {
					    app: path.join(__dirname, '../client/index.js'),
					    vendor: ['vue']
					  },
	  output: {
	  	filename: '[name].[chunkhash:8].js'
	  },
	  module: {
	  	rules:  [
	  		{
					test: /\.styl/,
		      use: ExtractPlugin.extract({
		        fallback: 'style-loader',
		        use: [
		          'css-loader',
		          {
		            loader: 'postcss-loader',
		            options: {
		              sourceMap: true,
		            }
		          },
		          'stylus-loader'
		        ]
		      })
		    }
		  ]
	  },
	  plugins: defaultPlugins.concat([
	  	  	new ExtractPlugin('styles.[contentHash:8].css'),
	  	    new webpack.optimize.CommonsChunkPlugin({
	  	      name: 'vendor'
	  	    }),
	  	    new webpack.optimize.CommonsChunkPlugin({
	  	      name: 'runtime'
	  	    })
	  	  ])
	})
}

module.exports = config