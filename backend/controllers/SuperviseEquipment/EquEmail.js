

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'wickramanju@gmail.com',
    pass: 'dcsdc csc fxr'
  }
});

/**
 
 * @param {string} email 
 * @param {string} subject 
 * @param {string} body 
 * @returns {Promise<string>} 
 */
const sendEmail = (email, subject, body) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'wickramanju@gmail.com',
      to: email,
      subject: subject,
      text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
        return reject('Failed to send email');
      }
      console.log('Email sent:', info.response);
      resolve('Email sent successfully');
    });
  });
};

module.exports = sendEmail;
