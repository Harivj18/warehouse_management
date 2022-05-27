const nodemail = require("nodemailer");
var sender = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: "sosapp24@gmail.com",
    pass: "SOSAPP@24",
  },
});
module.exports.getemail = function (params, paramsmsg) {
  var composemail = {
    from: "sosapp24@gmail.com",
    to: params,
    subject: "node email",
    text: paramsmsg,
  };
  sender.sendMail(composemail, function (err, res) {
    if (err) {
      console.log("Mail not sent", err);
    } else {
      console.log("Mail sent", res);
    }
  });
};
