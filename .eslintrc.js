module.exports = {
	'env': {
		'es6': true,
		'node': true
	},

	'extends': [
		'eslint:recommended',
		'plugin:jsdoc/recommended',
	],

	'parserOptions': {
		'ecmaVersion': 2018
	},

	'rules': {
		'comma-dangle': ['error', 'always-multiline'],
		'arrow-parens': ['error', 'as-needed'],

		'indent': ['error', 'tab', { SwitchCase: 1 }],
		'object-curly-spacing': ['error', 'always'],
		'space-infix-ops': ['error'],

		'max-len': ['error', {
			code: 120,
			ignoreUrls: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true,
			ignoreRegExpLiterals: true
		}],

		'eqeqeq': ['error', 'always'],

		// jsdoc/require-jsdoc instead
		'require-jsdoc': 'off',

		'jsdoc/require-param-description': 'off',
	    'jsdoc/require-returns-description': 'off',
	    'jsdoc/require-description-complete-sentence': 'off',
	    'jsdoc/require-example': 'off',

	    // https://github.com/gajus/eslint-plugin-jsdoc/issues/99
	    'jsdoc/no-undefined-types': 'off',

	    // Likely hooks are added for future tests added to the same file
	    'mocha/no-hooks-for-single-case': 'off',

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
		]
	},

	'settings': {
		'jsdoc': {
			'tagNamePreference': {
				'fires': 'emits',
			},
		},
	},
};