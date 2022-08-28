import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import alias from '@rollup/plugin-alias';
import path from 'path';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mdx'];
const projectRootDir = path.resolve(__dirname);
const plugins = [
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, babelHelpers: 'bundled' }),
    alias({
        entries: [
            { find: '@components', replacement: `${projectRootDir}/src` }
        ],
    }),
];

export default [
    {
        input: 'src/index.ts',
        external: ['react', 'react-dom'],
        plugins,
        output: {
            dir: 'lib-esm',
            format: 'esm',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            name: 'lio-ui',
        },
    },
    {
        input: 'src/index.ts',
        external: ['react', 'react-dom'],
        plugins,
        output: {
            exports: 'named',
            dir: 'lib',
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            sourcemap: true,
            name: 'lio-ui',
        },
    },
];
