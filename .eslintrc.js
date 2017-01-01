module.exports = {
	'env': {
		'es6': true,
		'node': true,
		'mocha': true
	},
	'globals': {
		'expect': true,
		'sinon': true
	},
	'extends': 'eslint:recommended',
	'rules': {
		'block-spacing': ['error'],
		'brace-style': ['error'],
		'computed-property-spacing': ['error'],
		'eqeqeq': ['error'],
		'indent': ['warn', 'tab', { 'SwitchCase': 1 }],
		'key-spacing': ['error'],
		'keyword-spacing': ['error'],
		'linebreak-style': ['error', 'unix'],
		'newline-per-chained-call': ['error'],
		'no-console': ['off'],
		'no-empty': ['warn'],
		'no-empty-function': ['error'],
		'no-negated-condition': ['error'],
		'no-trailing-spaces': ['error', { 'skipBlankLines': true }],
		'no-underscore-dangle': ['error'],
		'no-whitespace-before-property': ['error'],
		'object-curly-spacing': ['error', 'always', { 'objectsInObjects': false, 'arraysInObjects': false }],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'space-before-blocks': ['error'],
		'space-before-function-paren': ['error'],
		'space-in-parens': ['error'],
		'space-infix-ops': ['error'],
		'prefer-const': 'error'
	}
};
