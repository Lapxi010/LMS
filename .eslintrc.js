module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	settings: {
		"import/resolver": {
			alias: {
				map: [
					["@fonts", "./src/vendor/fonts"],
					["@pages", "./src/pages"],
					["@components", "./src/components"],
					["@store", "./src/store"],
					["@utils", "./src/utils"],
				],
				extensions: [".ts", ".tsx"],
			},
		},
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'max-len': [
			1, 180
		],
	}
};
