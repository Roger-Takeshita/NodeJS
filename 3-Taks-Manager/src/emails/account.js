const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'no-reply@rogertakeshita.com',
        subject: '[Roger Takeshita] Thanks for joining in!',
        html: `Welcome to the app, <strong>${name}</strong>. Let me know how you get along with the app.`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'no-reply@rogertakeshita.com',
        subject: '[Roger Takeshita] Sorry to see you go!',
        html: `Goodbye, <strong>${name}</strong>. I hope to see you back sometime soon.`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
