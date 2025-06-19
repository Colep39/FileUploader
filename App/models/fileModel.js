const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createFile({ userId, name, size, url }){
    return await prisma.file.create({
        data: { userId, name, size, url },
    });
}

async function getFilesByUser(userId){
    return await prisma.file.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
}

async function deleteFile(fileId, userId) {
    return await prisma.file.deleteMany({
        where: {
            id: fileId,
            userId,
        }
    });
}

async function downloadFile(fileId, userId) {
    const file = await prisma.file.findUnique({
        where: { id: fileId, userId },

    });
    if (!file){
        throw new Error('File not found');
    }
    return file;
}

module.exports = { createFile, getFilesByUser, deleteFile, downloadFile };