const esbuild = require('esbuild');
const copyStaticFiles = require('esbuild-copy-static-files');

const isWatchMode = process.argv.includes('--watch');

const watchNotifyPlugin = {
    name: 'watch-notify',
    setup(build) {
        build.onEnd(result => {
            if (result.warnings.length > 0) {
                result.warnings.forEach(warning => console.warn(warning.text));
            }

            if (result.errors.length > 0) {
                result.errors.forEach(error => console.error(error.text));

                console.error('Build failed!');

                return;
            }

            console.log('Build finished!');
        });
    },
};

async function build() {
    const context = await esbuild.context({
        entryPoints: ['./src/extension.js'],
        bundle: true,
        outfile: 'dist/extension.js',
        external: ['vscode', 'antlr4'],
        format: 'cjs',
        platform: 'node',
        plugins: [
            copyStaticFiles({
                src: 'src/view',
                dest: 'dist/view',
            }),
            copyStaticFiles({
                src: 'src/templates',
                dest: 'dist/templates',
            }),
            watchNotifyPlugin,
        ],
    });

    console.log('Building extension...');
    await context.rebuild();

    if (isWatchMode) {
        console.log('Watching for changes...');
        await context.watch();
    } else {
        await context.dispose();
        console.log('Done!');
    }
}

build().catch((e) => {
    console.error(e);
    process.exit(1);
});