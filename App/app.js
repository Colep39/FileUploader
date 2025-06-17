const path = require("node:path");
require("dotenv").config();
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const routes = require("./routes/router");
const { PrismaClient } = require('@prisma/client');
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;

const pool = require("./db");
const app = express();
const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Passport session setup
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// App routes
app.use("/", routes);
app.get("/", (req, res) => {
    
})

passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return done(null, false, { message: "No user" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? done(null, user) : done(null, false, { message: "Bad password" });
  }));
  
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
});

// Authentication routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { username, password: hash } });
    res.redirect('/login');
  });
  
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            console.error(err);
            return res.redirect('/dashboard');
        }
    })
    res.redirect('/login');
})
  
app.listen(3000, () => {
    console.log('Server is running at http://localhost:' + PORT);
});