require('dotenv').config();

module.exports = {
    mongoAtlasURL: `mongodb+srv://admin-user:${process.env.MongoAtlasPassword}@cluster0.hu1gt.mongodb.net/userDB`,
    mongoLocalURL: `mongodb://localhost/userDB`
};