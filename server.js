const xpresser = require('xpresser');
const $ = xpresser({
    name: 'FoodStore',
    paths: {
        base: __dirname,
        public: 'dist',
    }
})


$.on.boot(next => {
    $.router.get("/*", http => {
        const distFolder = $.path.base('dist/index.html');
        return http.res.sendFile(distFolder);
    })

    return next()
})


$.boot()