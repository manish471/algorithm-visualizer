const config = {
    db_local: 'mongodb://localhost:27017/algorithms-visualizer',
    db_cloud:'mongodb+srv://avuser:avdbpwd@algorithm-visualizer.cboto.mongodb.net/algorithm-visualizer?retryWrites=true&w=majority',
    frontEndServer:'https://algorithm-visualizer-livid.vercel.app',
    googleClientID:'945383315679-16s0g0par0bn36au8mbver0jemv959od.apps.googleusercontent.com',
    googleClientSecret:'zTlp6qLOF-fb1C1f-7gMLrJe',
    githubClientID:'82cf8a0540501bb4d44f',
    githubClientSecret:'fbcf18f24515d701170323121c844428e1a43572'
}

config.cookieSession = {
    maxAge: 24 * 60 * 60 * 1000,
    keys:['youcannothackthiscookie'],
}

module.exports = config;