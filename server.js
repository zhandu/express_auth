import express from "express";
import expressLayouts from 'express-ejs-layouts'
import route from "./routes/routes";
import vars from './middlewares/vars'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session'
const MongoStore = require('connect-mongodb-session')(session)

dotenv.config();
const { APP_LOCALHOST: hostname, APP_PORT: port, SESSION_SECRET_KEY: sessionSecretKey } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(expressLayouts)


const store = new MongoStore({
  collection: 'sessions',
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xmhlt.mongodb.net/${process.env.DB_NAME}`
})
app.use(session({
  secret: sessionSecretKey,
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(vars)
app.use('/', route);

async function main() {
  try {
      await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xmhlt.mongodb.net/${process.env.DB_NAME}`)
      app.listen(port, () => {
        console.log(`Example app listening at http://${hostname}:${port}`);
      })
  } catch (e) {
      console.log(e)
  }
}

main()
