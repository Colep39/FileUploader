const { getFilesByUser } = require('../models/fileModel');
const { getFoldersByUser } = require('../models/folderModel');

async function handleDashboard(req, res) {
  try {
    const files = await getFilesByUser(req.user.id);
    const folders = await getFoldersByUser(req.user.id);

    res.render('dashboard', {
      user: req.user,
      files,
      folders
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
}

module.exports = { handleDashboard };
