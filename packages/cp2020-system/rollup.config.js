import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import { string } from "rollup-plugin-string";
import { SYSTEM_PROJECT_NAME } from './src/module/constants/system.js'
import path from 'path'
import { fileURLToPath } from 'url'

const isProd = process.env.NODE_ENV === 'production'
const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url))
)

const customResolver = resolve({
  extensions: ['.js', '.json', '.scss', '.css']
})

export default (async () => ({
  input: `src/module/${SYSTEM_PROJECT_NAME}.js`,
	plugins: [
    alias({
      entries: {
        '@actorListeners': path.resolve(rootDir, 'src/module/sheets/listeners/actor'),
        '@assets': path.resolve(rootDir, 'src/assets'),
        '@constants': path.resolve(rootDir, 'src/module/constants'),
        '@data': path.resolve(rootDir, 'src/data'),
        '@documents': path.resolve(rootDir, 'src/module/documents'),
        '@effects': path.resolve(rootDir, 'src/module/effects'),
        '@itemListeners': path.resolve(rootDir, 'src/module/sheets/listeners/item'),
        '@models': path.resolve(rootDir, 'src/module/data'),
        '@packs': path.resolve(rootDir, 'src/packs'),
        '@rolls': path.resolve(rootDir, 'src/module/rolls'),
        '@sheets': path.resolve(rootDir, 'src/module/sheets'),
        '@templates': path.resolve(rootDir, 'src/templates'),
        '@utils': path.resolve(rootDir, 'src/module/utils'),
      },
      customResolver
    }),
		resolve(),
    string({
      include: '**/**.hbs'
    }),
		isProd && (await import('@rollup/plugin-terser')).default()
	],
	output: {
    file: `dist/${SYSTEM_PROJECT_NAME}/system.js`,
    sourcemap: isProd ? false : 'inline',
		format: 'esm'
	},
  // handlebars pretends JS is classical and requires confusing "this" context
  context: 'this'
}))();