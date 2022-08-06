module.exports = {
	purge: {
		mode: 'all',
		preserveHtmlElements: true,
		content: [
			'./pages/**/*.{js,jsx,ts,tsx}',
			'./src/components/**/*.{js,jsx,ts,tsx}',
		],
	},
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {},
		container: {
			center: true,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
