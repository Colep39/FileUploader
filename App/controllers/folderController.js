const { createFolder, getFoldersByUser, deleteFolder, updateFolder } = require('../models/folderModel');

async function handleCreateFolder(req, res){
    const { name } = req.body;
    const userId = req.user.id;
    try {
        const folder = await createFolder(name, userId);
        return res.status(201).json(folder);
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

async function handleDeleteFolder(req, res){
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const deleted = await deleteFolder(id, userId);
        if (deleted.count === 0){
            return res.status(404).send('Folder not found');
        }
        return res.status(204).send();
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

async function handleGetFoldersByUser(req, res){
    const userId = req.user.id;
    try {
        const folders = await getFoldersByUser(userId);
        return res.status(200).json(folders);
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Internal server error');
    }
}

async function handleUpdateFolder(req, res){
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;
    try {
        const updated = await updateFolder(id, name, userId);
        if (updated.count === 0){
            return res.status(404).send('Folder not found');
        }
        return res.status(200).json({ message: 'Folder updated successfullly'});
    }
    catch(error){
        console.error(error);
        return res.status(500).send('Interal server error');
    }
}

module.exports = { handleCreateFolder, handleGetFoldersByUser, handleDeleteFolder, handleUpdateFolder };