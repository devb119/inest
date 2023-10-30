const fs = require("fs");
const fastCsv = require("fast-csv");
path = require("path");
const _ = require("underscore");
const { execSync } = require("child_process");

const dataPath = "E:\\HUST\\Lab\\INEST\\data\\";

const orderReccentFiles = (dir) =>
  fs
    .readdirSync(dir)
    .map((file) => ({ file, mtime: fs.lstatSync(dataPath + file).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  return files.length ? files[1].file : undefined;
};

function pushFileToServer() {
  const filepath = dataPath + getMostRecentFile(dataPath);
  const command = `scp -P 1111 ${filepath} aiotlab@222.252.4.92:/mnt/disk2/ducanh/filebrowser/INEST/data/dokhi`;
  execSync(command, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);

    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });
}

setInterval(pushFileToServer, 5000);
