// var zlib = require('zlib');
// exports.handler = function(input, context) {
//     console.log(input);
//     var payload = Buffer.from(input.awslogs.data, 'base64');
//     zlib.gunzip(payload, function(e, result) {
//         if (e) {
//             context.fail(e);
//         } else {
//             result = JSON.parse(result.toString('ascii'));
//             console.log("Event Data:", JSON.stringify(result, null, 2));
//             context.succeed();
//         }
//     });
// };

// 구성 -> 환경변수로 webhook을 받도록 합니다.
const ENV = process.env;
if (!ENV.webhook) throw new Error("Missing environment variable: webhook");

const webhook = ENV.webhook;

const https = require("https");
const zlib = require("zlib");

exports.handler = (input, context) => {
  var payload = Buffer.from(input.awslogs.data, "base64");
  zlib.gunzip(payload, async (e, result) => {
    if (e) {
      context.fail(e);
    }

    const resultAscii = result.toString("ascii");

    let resultJson;

    try {
      resultJson = JSON.parse(resultAscii);
    } catch (e) {
      console.log(
        `[알람발송실패] JSON.parse(result.toString('ascii')) Fail, resultAscii= ${resultAscii}`
      );
      context.fail(e);
      return;
    }

    // console.log(`result Ascii = ${resultAscii}`);
    console.log(`logEvents = ${JSON.stringify(resultJson.logEvents[0])}`);

    const logJson = toJson(resultJson.logEvents[0]);
    try {
      const message = slackMessage(logJson);
      console.log(message);
      await exports.postSlack(message, webhook);
    } catch (e) {
      console.log(`slack message fail= ${JSON.stringify(logJson)}`);
      return;
    }
  });
};

function toJson(logEvent) {
  let message = logEvent.message;

  const currentTime = toYyyymmddhhmmss(logEvent.timestamp);

  message = '"age" must be an interger';

  return {
    currentTime: currentTime,
    message: message,
  };
}

// 타임존 UTC -> KST
function toYyyymmddhhmmss(timestamp) {
  if (!timestamp) {
    return "";
  }

  function pad2(n) {
    return n < 10 ? "0" + n : n;
  }

  var kstDate = new Date(timestamp + 32400000);
  return (
    kstDate.getFullYear().toString() +
    "-" +
    pad2(kstDate.getMonth() + 1) +
    "-" +
    pad2(kstDate.getDate()) +
    " " +
    pad2(kstDate.getHours()) +
    ":" +
    pad2(kstDate.getMinutes()) +
    ":" +
    pad2(kstDate.getSeconds())
  );
}

function slackMessage(messageJson) {
  const message = `When: ${messageJson.currentTime}\nMessage:${messageJson.message}`;

  return {
    attachments: [
      {
        color: "#2eb886",
        title: `Error Detecting`,
        fields: [
          {
            value: message,
            short: false,
          },
        ],
      },
    ],
  };
}

exports.postSlack = async (message, slackUrl) => {
  return await request(exports.options(slackUrl), message);
};

exports.options = (slackUrl) => {
  const { host, pathname } = new URL(slackUrl);
  return {
    hostname: host,
    path: pathname,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding("utf8");
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve(responseBody);
      });
    });

    req.on("error", (err) => {
      console.error(err);
      reject(err);
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}
