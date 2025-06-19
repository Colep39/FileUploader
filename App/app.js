const path = require("node:path");
require("dotenv").config();
// const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const bcrypt = require("bcryptjs");
// const LocalStrategy = require('passport-local').Strategy;
const routes = require("./routes/router");
const { PrismaClient } = require('@prisma/client');
// const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;
const PORT = process.env.PORT || 3000;

// const pool = require("./db");
const app = express();
// const prisma = new PrismaClient();
require('./config/passport')(passport); // passport configuration

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const methodOverride = require("method-override");
app.use(methodOverride('_method'));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Passport session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// App routes
app.use("/", routes);
app.get("/", (req, res) => {
   if(req.isAuthenticated()) {
        return res.redirect("/dashboard");
   }
   return res.redirect("/login");
});
app.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.user});
});
app.get("/login", (req, res) => {
    if(req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    res.render("login");
});
app.get("/register", (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect("/dashboard");
    }
    res.render("register");
})
app.get("/uploadFile", isAuthenticated, (req, res) => {
    res.render("uploadFile", { user: req.user });
})
app.get("/newFolder", isAuthenticated, (req, res) => {
    res.render("newFolder", { user: req.user });
})

  
app.listen(3000, () => {
    console.log('Server is running at http://localhost:' + PORT);
});