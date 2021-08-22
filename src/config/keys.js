require('dotenv').config();

module.exports = {
    mongoAtlasURL: `mongodb+srv://admin-user:${process.env.MongoAtlasPassword}@cluster0.hu1gt.mongodb.net/userDB`,
    mongoLocalURL: `mongodb://localhost/userDB`,
    callBackLocalURL: "http://localhost:3000/auth/google/secrets",
    callBackProdURL: "https://post-your-anonymous-secrets.herokuapp.com/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
};