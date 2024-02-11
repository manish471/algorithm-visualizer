const babel = require('@babel/core');
const stepify = require('./stepify');

module.exports = transpiler = (code,input)=>{

    const transpiled = babel.transform(code, {
        plugins: [
            [stepify(input), {
                disallow: {
                    async: true,
                },
            }]
        ],
        parserOpts: {
            strictMode: true
        },

    })


    return transpiled.code;
} 