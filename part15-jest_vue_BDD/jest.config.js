module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	testMatch: ['**/__tests__/**/**/*.[jt]s?(x)'],
	collectCoverageFrom: [
		'src/**/*.{js,vue}',
		'!**/node_modules/**', // 排除node_modules
		'!**/vendor/**', // 排除vendor
		'!src/**/App.vue', // 排除App.vue
		'!src/**/main.js' // 排除main.js
	]
};
