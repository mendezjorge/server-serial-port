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
  regKey.get("IMP_FACTURA", (err, result) => {
    res.json(result.value);
  });
});

app.get("/entrada", (req, res) => {
  readWriteAsync(function (data) {
    var { bascula } = JSON.parse(data);
    res.json(bascula.SATURNO);
  });
});

app.get("/salida", (req, res) => {
  readWriteAsync(function (data) {
    var { bascula } = JSON.parse(data);
    res.json(bascula.SIPEL);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function readWriteAsync(callback) {
  fs.readFile("data.json", "utf-8", function (err, data) {
    if (err) throw err;
    callback(data);
  });
}
