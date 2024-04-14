const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url")
        }
    },
    experiments: {
        topLevelAwait: true,
        providedFallback: {
            stream: require.resolve("stream-browserify"),
        },
    },
    // Other webpack configuration options can be added here if needed
};
