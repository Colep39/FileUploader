const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createFolder(name, userId) {
  return await prisma.folder.create({
    data: { name, userId },
  });
}

async function getFoldersByUser(userId) {
  return await prisma.folder.findMany({
    where: { userId },
  });
}

async function deleteFolder(folderId, userId) {
  return await prisma.folder.deleteMany({
    where: {
      id: folderId,
      userId,
    },
  });
}

async function updateFolder(folderId, name, userId) {
  return await prisma.folder.updateMany({
    where: { id: folderId, userId },
    data: { name },
  });
}

module.exports = {
  createFolder,
  getFoldersByUser,
  deleteFolder,
  updateFolder,
};
