import vuePlugin from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from 'rollup-plugin-commonjs';
import url from 'rollup-plugin-url';

const extensions = ['.js', '.vue', '.scss']; // 어떤 확장자를 처리 할 지 정함

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
  },
  plugins: [
    peerDepsExternal(),
    url(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
    }),
    vuePlugin(),
  ],
  external: [
    'core-js',
    'file-loader',
    '@vue/cli-plugin-babel',
    '@vue/cli-service',
    'vue-template-compiler',
    'sass',
    'sass-loader',
    'vue',
  ],
};
