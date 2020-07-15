const router = require('koa-router')();
const nodemailer = require('nodemailer');
const config = require('./env');

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.post('/send', async (ctx) => {
    const { to, subject, htmlContent, textContent } = ctx.request.body;

    const transporter = nodemailer.createTransport({
        host: `${config.name}.${config.domain}`,
        port: 587,
        secure: false,
        auth: {
            user: config.user,
            pass: config.password,
        },
        tls: { rejectUnauthorized: false },
    });

    const response = await transporter.sendMail({
        from: config.from,
        to: to, // list of receivers
        subject: subject, // Subject line
        text: textContent,
        html: htmlContent,
    });

    ctx.body = response;
});

module.exports = router;
