require('dotenv').config();

// ${process.env.MongoAtlasPassword}
// curl -X POST -d "code=<auth-code>&client_id=162584818514-s6gd9qrv44emir3ero6rionliper64jp.apps.googleusercontent.com&client_secret=9JGBI2dg5QHBmxx4HqO5rUQ2"&grant_type=authorization_code" http://localhost:8000/auth/token

module.exports = {
    mongoAtlasURL: `mongodb+srv://admin-user:${process.env.MongoAtlasPassword}@cluster0.hu1gt.mongodb.net/userDB`,
    mongoLocalURL: `mongodb://localhost/userDB`,
    callBackLocalURL: "http://localhost:3000/auth/google/secrets",
    callBackProdURL: "https://post-your-anonymous-secrets.herokuapp.com/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
};