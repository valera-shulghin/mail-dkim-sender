const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

// request parameters parser
app.use(require('koa-body')({
    formidable: {
        uploadDir: `${__dirname}/public/uploads`, // This is where the files will be uploaded
        keepExtensions: true,
    },
    multipart: true,
    urlencoded: true,
}));

app.use(require(`./sendMail`).routes());

app.listen(3000, () => {
    console.log(`API listening on port 3000`);
});
