const babel = require('@babel/core');

module.exports = isdatastructure = (code,input)=>{

    let isDatastructure = false;

    const output = babel.transformSync(code, {
        plugins: [
          function myCustomPlugin() {
            return {
              visitor: {
                ClassDeclaration(path) {
                    isDatastructure = input === path.node.id.name;
                },
              },
            };
          },
        ],
    });


    return isDatastructure;
} 