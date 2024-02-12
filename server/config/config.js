const config = {
    db_local: 'mongodb://localhost:27017/algorithms-visualizer',
    db_cloud:'mongodb+srv://avuser:avdbpwd@algorithm-visualizer.k17ulhi.mongodb.net/algorithm-visualizer?retryWrites=true&w=majority',
    frontEndServer:'https://algorithm-visualizer-server.onrender.com/',
    googleClientID:'920749689036-avuoaed91ebqp60oj58fa0stmgtv0khk.apps.googleusercontent.com',
    googleClientSecret:'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',
    githubClientID:'82cf8a0540501bb4d44f',
    githubClientSecret:'fbcf18f24515d701170323121c844428e1a43572'
}

config.cookieSession = {
    maxAge: 24 * 60 * 60 * 1000,
    keys:['youcannothackthiscookie'],
}

module.exports = config;