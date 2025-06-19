const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser({ username, password }){
    return await prisma.user.create({
        data: { username, password },
    });
}

async function findUserByUsername(username){
    return await prisma.user.findUnique({
        where: { username },
    });
}

module.exports = { createUser, findUserByUsername };