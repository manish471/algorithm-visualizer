const config = {
    db_local: 'mongodb://localhost:27017/algorithms-visualizer',
    db_cloud:'mongodb+srv://avuser:avdbpwd@algorithm-visualizer.cboto.mongodb.net/algorithm-visualizer?retryWrites=true&w=majority',
    frontEndServer:'https://algorithm-visualizer-livid.vercel.app',
    googleClientID:'945383315679-16s0g0par0bn36au8mbver0jemv959od.apps.googleusercontent.com',
    googleClientSecret:'zTlp6qLOF-fb1C1f-7gMLrJe',
    githubClientID:'868a43b1ba3fc3820a75',
    githubClientSecret:'7bba18fe95a87e0f0c29297231da6fdfe347236f'
}

config.cookieSession = {
    maxAge: 24 * 60 * 60 * 1000,
    keys:['youcannothackthiscookie'],
}

module.exports = config;