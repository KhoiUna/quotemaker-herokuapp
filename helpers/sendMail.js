const http = require("https");

module.exports = (email, username) => {
  const options = {
    method: "POST",
    hostname: "api.sendgrid.com",
    port: null,
    path: "/v3/mail/send",
    headers: {
      authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      "content-type": "application/json",
    },
  };

  const req = http.request(options, function (res) {
    let chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: email,
            },
          ],
          dynamic_template_data: {
            username: username.toUpperCase(),
          },
          subject: "Welcome mail!",
        },
      ],
      from: {
        email: process.env.ADMIN_EMAIL,
        name: "Welcome to QuoteMaker",
      },
      template_id: process.env.SENDGRID_TEMPLATE_ID,
    })
  );

  console.log("Email sent");
  req.end();
};
