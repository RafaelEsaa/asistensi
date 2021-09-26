const config = {
    SERVER: {
        PORT: process.env.PORT || 8887,
        JWT_SECRET: process.env.JWT_SECRET || 'secret',
        JWT_TIMEOUT: process.env.JWT_TIMEOUT || 86400
    },
    MONGO_URL:
        process.env.MONGO_URL ||
        'mongodb://localhost:27017/game-of-thrones',
};

module.exports = config;
