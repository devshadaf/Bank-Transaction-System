const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  return await transporter.sendMail({
    from: `"Amar Bank Account" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

const accountCreateEmail = async(to) => {
    const data = {
      to,
      subject: "Your Account Created Succesfully",
      html: `
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
            <h2 style="padding:20px; text-align:center; font-size:12px;">Welcome to Amar Bank 🎉</h2>
            <h4 style="padding:20px; text-align:center; font-size:12px;">Your account has been created successfully</h4>
            <p style="background:#f1f1f1; padding:20px; text-align:center; font-size:12px; color:#777;">
              © 2026 Amar Bank. All rights reserved.
            </p>
            </body>
        `,
    };
  await sendEmail(data);
};

const balanceAddedEmail = async(to,amount) => {
    const data = {
      to,
      subject: "Your Amount Added to Account Succesfully",
      html: `
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
            <h2 style="padding:20px; text-align:center; font-size:12px;">Thanks from Amar Bank 🎉</h2>
            <h4 style="padding:20px; text-align:center; font-size:12px;">Your ${amount} has been added to your Account</h4>
            <p style="background:#f1f1f1; padding:20px; text-align:center; font-size:12px; color:#777;">
              © 2026 Amar Bank. All rights reserved.
            </p>
            </body>
        `,
    };
  await sendEmail(data);
};

const transitionEmail = async (to, amount) => {
  const data = {
    to,
    subject: "Transition Succesfully",
    html: `
            <body style="margin:0; padding:0; background-color:#f4f4f4; font-family:Arial, sans-serif;">
            <h2 style="padding:20px; text-align:center; font-size:12px;">Thanks from Amar Bank 🎉</h2>
            <h4 style="padding:20px; text-align:center; font-size:12px;">Your ${amount} has been sent to ${to}</h4>
            <p style="background:#f1f1f1; padding:20px; text-align:center; font-size:12px; color:#777;">
              © 2026 Amar Bank. All rights reserved.
            </p>
            </body>
        `,
  };
  await sendEmail(data);
};

module.exports = { accountCreateEmail, balanceAddedEmail, transitionEmail };
