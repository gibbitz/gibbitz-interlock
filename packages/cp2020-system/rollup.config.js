import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { string } from "rollup-plugin-string";
import { SYSTEM_NAME } from './src/module/constants/system.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises';

const isProd = process.env.NODE_ENV === 'production'
const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url))
)

const customResolver = resolve({
  extensions: ['.js', '.json', '.scss', '.css']
})

const { compilerOptions: { paths, baseUrl }} = JSON.parse(
  await readFile(
    new URL('./jsconfig.json', import.meta.url)
  )
);

// generate path aliases from jsconfig file compilerOptions.paths where the aliases are for folders

const baseDir = path.resolve(rootDir, baseUrl)
const entries = Object.keys(paths).reduce(
  (aliases, key) => {
    if (key.indexOf('/*') !== -1) {
      aliases[key.replace('/*', '')] = path.resolve(baseDir, paths[key][0].replace('/*', ''))
    }
    return aliases
  }
  , {}
)

export default (async () => ({
  input: `src/module/${SYSTEM_NAME}.js`,
	plugins: [
    alias({
      entries,
      customResolver
    }),
		resolve(),
    string({
      include: '**/**.hbs'
    }),
		isProd && (await import('@rollup/plugin-terser')).default()
	],
	output: {
    file: `dist/${SYSTEM_NAME}/system.js`,
    sourcemap: isProd ? false : 'inline',
		format: 'esm'
	},
  // handlebars pretends JS is classical and requires confusing "this" context
  context: 'this'
}))();