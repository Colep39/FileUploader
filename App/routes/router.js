const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/upload');
const isAuthenticated = require('../middleware/isAuthenticated');

const fileController = require('../controllers/fileController');
const folderController = require('../controllers/folderController');
const userController = require('../controllers/userController');

router.get('/dashboard', isAuthenticated, fileController.handleGetFilesByUser, folderController.handleGetFoldersByUser, (req, res) => {
    res.render('dashboard', {user: req.user});
})

router.post('/register', userController.registerUser);
router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
    })
);
router.post('/upload', upload.single('file'), isAuthenticated, fileController.uploadFile);

router.post('/folders', isAuthenticated, folderController.handleCreateFolder);
router.get('/folders', isAuthenticated, folderController.handleGetFoldersByUser);
router.put('/folders/:id', isAuthenticated, folderController.handleUpdateFolder);
router.delete('/folders/:id', isAuthenticated, folderController.handleDeleteFolder);

router.get('/files', isAuthenticated, fileController.handleGetFilesByUser);
router.delete('/files/:id', isAuthenticated, fileController.handleDeleteFile);
router.get('/files/:id/download', isAuthenticated, fileController.handleDownloadFile);
router.post('/files', isAuthenticated, fileController.uploadFile);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err){
            console.error(err);
            return res.redirect('/dashboard');
        }
        res.redirect('/login');
    })
})

module.exports = router;