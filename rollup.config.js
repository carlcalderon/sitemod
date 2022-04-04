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
				emitCss: true,
				compilerOptions: {
					dev: !production
				}
			}),
			resolve({
				browser: true,
				dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
			}),
			commonjs(),
			css({output: 'sitemod.css'}),
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
