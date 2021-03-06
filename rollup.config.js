import { name, version } from './package.json'

import autoExternal from 'rollup-plugin-auto-external'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { resolve } from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'typescript'
import typescript2 from 'rollup-plugin-typescript2'

class Config {
  constructor(format) {
    this.input = resolve(__dirname, './src/index.ts')
    this.output = this.buildOutput(format)
    this.plugins = this.bulidPlugins(format)
    this.external = this.buildExternal(format)
  }

  buildOutput(format) {
    const map = new Map([
      ['es', 'es'],
      ['cjs', 'lib'],
      ['umd', 'dist']
    ])

    return [
      {
        name: camelize(name),
        file: `./${map.get(format)}/index.js`,
        sourcemap: true,
        format,
        exports: format !== 'es' ? 'named' : 'auto'
      },
      {
        name: camelize(name),
        file: `./${map.get(format)}/index.min.js`,
        sourcemap: true,
        format,
        exports: format !== 'es' ? 'named' : 'auto',
        plugins: [terser()]
      }
    ]
  }

  bulidPlugins(format) {
    // Make sure autoExternal is the last plugin
    // 保证 autoExternal 是最后一个插件
    const plugins = [
      nodeResolve({
        browser: true
      }),
      commonjs(),
      replace({
        __NAMESPACE__: name,
        __VERSION__: version
      }),
      typescript2({
        typescript,
        useTsconfigDeclarationDir: true,
        clean: true
      }),
      autoExternal()
    ]

    if (format === 'umd' || format === 'cjs') {
      plugins.pop()
    }

    return plugins
  }

  buildExternal(format) {
    if (format === 'umd') {
      return []
    }

    if (format === 'es') {
      return [/@babel\/runtime/]
    }

    if (format === 'cjs') {
      // Put all packages in dependencies which only ship cjs format in the array
      // 把所有 dependencies 中只提供了 cjs 格式的包全部放进来
      return [/@babel\/runtime/]
    }
  }

  toConfig() {
    return {
      input: this.input,
      output: this.output,
      plugins: this.plugins,
      external: this.external
    }
  }
}

export default ['es', 'cjs', 'umd'].map(format => new Config(format).toConfig())

/**
 * @description 连字符转驼峰（首字母大写）
 * @author Wei Guocai
 * @date 2020-07-29
 * @param {string} str
 * @returns
 */
function camelize(str) {
  const camelizeRE = /(^\w)(\w+)-(\w)(\w+$)/g

  return str.replace(camelizeRE, (_, p1, p2, p3, p4) => {
    if (p1 && p2 && p3 && p4) {
      return `${p1.toUpperCase()}${p2}${p3.toUpperCase()}${p4} `
    } else {
      return ''
    }
  })
}
