const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
var fs = require("fs");

var Registry = require("winreg"),
  regKey = new Registry({
    hive: Registry.HKLM, // open registry hive HKEY_CURRENT_USER
    key: "\\SOFTWARE\\WOW6432Node\\ORACLE", // key containing autostart programs
  });

var logger = fs.createWriteStream("data.json", {
  flags: "w", // 'a' means appending (old data will be preserved)
});

var valor = {
  bascula: {
    SATURNO: 11,
    SIPEL: 11,
  },
};

logger.write(JSON.stringify(valor)); // append string to your file

app.get("/", (req, res) => {
  res.send(valor);
});

app.get("/entrada", (req, res) => {
  regKey.get("REG_DEV_VALOR_SATURNO", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result.value);
    }
  });
});

app.get("/salida", (req, res) => {
  regKey.get("REG_DEV_VALOR_SIPEL", (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result.value);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
