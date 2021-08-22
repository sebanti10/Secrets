require('dotenv').config();

// ${process.env.MongoAtlasPassword}
module.exports = {
    mongoAtlasURL: `mongodb+srv://admin-user:Test123@cluster0.hu1gt.mongodb.net/userDB`,
    mongoLocalURL: `mongodb://localhost/userDB`
};