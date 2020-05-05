// Find the full example of all available configuration options at
// https://github.com/muenzpraeger/create-lwc-app/blob/master/packages/lwc-services/example/lwc-services.config.js
module.exports = {
    resources: [
        { from: 'src/client/resources', to: 'dist/resources/' },
        { from: 'src/client/index.html', to: 'dist/index.html' },
        { from: 'src/client/manifest.json', to: 'dist/manifest.json' }
    ],
    sourceDir: './src/client',
    moduleDir: './src/client/modules',
    devServer: {
        proxy: { '/': 'http://localhost:3002' }
    }
};