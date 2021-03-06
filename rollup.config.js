import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

function createConfig(input, outputPath, outputName) {
	return {
		input,
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: `${outputPath}/${outputName}.js`
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file — better for performance
				css: css => {
					css.write(`${outputPath}/${outputName}.css`);
				}
			}),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			css({output: 'dist/build/vendor.css'}),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	}
}

export default [
	createConfig('src/sitemod.js', 'dist/build', 'sitemod')
]
