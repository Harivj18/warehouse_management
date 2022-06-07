const nodemail = require("nodemailer");
const sender = nodemail.createTransport({
  secure: true,
  requireTLS: true,
  port: 465,
  secured: true,
  service: "gmail",
  auth: {
    user: "sosapp24@gmail.com",
    pass: "SOSAPP@24",
  },
});
module.exports.getemail = function (params, paramsmsg) {
  const composemail = {
    from: "sosapp24@gmail.com",
    to: params,
    subject: "node email",
    text: paramsmsg,
  };
  sender.sendMail(composemail, function (err, res) {
    if (err) {
      console.log("Mail not sent", err);
    } else {
      console.log("Mail sent successfully!!", res);
    }
  });
};
