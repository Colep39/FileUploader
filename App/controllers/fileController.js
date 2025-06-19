const { createFile, getFilesByUser, deleteFile, downloadFile } = require('../models/fileModel');

async function uploadFile(req, res) {
    try {
      const { user } = req;
      const file = req.file;
  
      if (!file) {
        return res.status(400).send('No file uploaded');
      }
  
      const newFile = await createFile({
        userId: user.id,
        name: file.originalname, // ✅ fixed here
        size: file.size,
        url: file.path,
      });
  
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
}

async function handleGetFilesByUser(req, res) {
    try{
        const { user } = req;
        const files = await getFilesByUser(user.id);
        if (!files || files.length === 0) {
            return res.status(404).send('No files found for this user');
        }
        return res.render('dashboard', { user: req.user, files });
        
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

async function handleDeleteFile(req, res) {
    try {
        const { id } = req.params;
        const { user } = req;
        const deleted = await deleteFile(id, user.id);
        if (deleted.count === 0){
            return res.status(404).send('File not found');
        }
        return res.status(204).send();
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

async function handleDownloadFile(req, res){
    try {
        const { id } = req.params;
        const { user } = req;
        const file = await downloadFile(id, user.id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.download(file.url, file.filename);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

module.exports = { uploadFile, handleGetFilesByUser, handleDeleteFile, handleDownloadFile };