const config = {}

config.cookieSession = {
    maxAge: 24 * 60 * 60 * 1000,
    keys:['youcannothackthiscookie'],
}

module.exports = config;