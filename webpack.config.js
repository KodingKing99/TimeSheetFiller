const path = require('path');
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: {
    content: './src/content.js',
    background: './src/background.js',
    popup: './src/popup.js',
    messages: './src/messages.js',
    message_bus: './src/message_bus.js',
    holidays: './src/holidays.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin({
        patterns: [
            { from: "src/manifest.json", to: "manifest.json" },
            { from: "src/popup.html", to: "popup.html" },
            { from: "src/working-hours16.png", to: "working-hours16.png" },
            { from: "src/working-hours32.png", to: "working-hours32.png" },
            { from: "src/working-hours128.png", to: "working-hours128.png" },
            { from: "src/styles.css", to: "styles.css" },

        ],
    }),
  ]
};