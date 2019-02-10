const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

const IS_DEV = process.env.NODE_ENV === 'dev';

const config = {
	mode: IS_DEV ? 'development' : 'production',
	devtool: IS_DEV ? 'eval' : 'source-map',
	entry: './src/js/app.js',
	output: {
		filename: 'js/[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.scss$/,
				use: [
					IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[ext]',
							fallback: 'file-loader',
							outputPath: 'public/images',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							mozjpeg: {
								progressive: true,
								quality: 75,
							},
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							limit: 10000,
							name: '[name].[ext]',
						},
					},
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							attrs: [':data-src'],
							minimize: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'windows.jQuery': 'jquery',
			Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
			Button: 'exports-loader?Button!bootstrap/js/dist/button',
			Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
			Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
			Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
			Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
			Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
			Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
		}),
		new CopyWebpackPlugin([
			{
				from: './src/public',
				to: 'public',
			},
		]),
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			favicon: path.resolve(__dirname, './src/public/icon.ico'),
			minify: !IS_DEV && {
				collapseWhitespace: true,
				preserveLineBreaks: true,
				removeComments: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: IS_DEV
				? 'css/[name].css'
				: 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].css',
		}),
		new webpack.HashedModuleIdsPlugin(),
		new PreloadWebpackPlugin({
			include: 'initial',
		}),
		new CssUrlRelativePlugin(),
	],
	devServer: {
		contentBase: path.join(__dirname, 'src'),
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true,
				},
			},
		},
		minimizer: [],
	},
};

if (!IS_DEV) {
	const TerserPlugin = require('terser-webpack-plugin');
	const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

	config.optimization.minimizer.push(
		new TerserPlugin(),
		new OptimizeCSSAssetsPlugin({})
	);
}

module.exports = config;
