const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vivobcn@gmail.com',
        pass: 'password',
    },
});
const mailOptions = {
    from: 'vivobcn@gmail.com',
    to: 'vivobcn@gmail.com',
    subject: 'hello world!',
    html: 'hello world!',
};
transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    }
    console.log(`Message sent: ${info.response}`);
});