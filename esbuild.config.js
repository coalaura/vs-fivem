const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');

esbuild.build({
    entryPoints: ['./src/extension.js'],
    bundle: true,
    outfile: 'dist/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    plugins: [
        copyStaticFiles({
            src: 'src/view',
            dest: 'dist/view',
        }),
    ],
}).catch(() => process.exit(1));