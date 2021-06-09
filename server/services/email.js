const nodemailer = require("nodemailer");

async function sendEmail(sortedNames) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "flavie39@ethereal.email",
      pass: "stcYTwVYdme1remrJt",
    },
  });

  sortedNames.map(
    async ({ name, pair, email }) =>
      await transporter.sendMail({
        from: 'Crud Sort Pair" <sortPair@crud.com>',
        to: `${email}`,
        subject: "Seu amigo secreto",
        text: `Olá <b>${name}</b>, seu amigo secreto é o <b>${pair}</b>`,
        html: `Olá <b>${name}</b>, seu amigo secreto é o <b>${pair}</b>`,
      })
  );
}

module.exports.sendEmail = sendEmail;
