# FileUploader
File Uploading App (similar to google drive) for the odin project to practice ORM applications
Dependencies:
- prisma @prisma/client connect-session-prisma multer dotenv
- bcryptjs express express-session passport nodemon passport-local ejs method-override
- @quixo3/prisma-session-store
- multer is for file uploading
# To initialize Prisma:
- npx prisma init
# To migrate the database:
- npx prisma migrate dev --name init