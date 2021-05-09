let proxyObj = {};

proxyObj['/api'] = {
    ws: false,
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/'
    }
};
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        proxy: proxyObj
    },
};


