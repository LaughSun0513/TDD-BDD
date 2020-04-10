module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
    'plugin:vue/essential',
    '@vue/standard',
		'plugin:vue/essential',
    'plugin:prettier/recommended',
  ],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		"prettier/prettier": "error",
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
	},
	overrides: [
		{
			files: [
        '**/__tests__/unit/**/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
			env: {
				jest: true
			}
    }
  ]
}