const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'files/temp/'});
const fs = require('fs');
const path = require('path');
const unzip = require('unzip');

const BOTNAME = {
  first: 'first',
  second: 'second'
};

router.post('/:botName', (req, res, next) => {
  const botName = req.params.botName;
  const uploadHandler = (err) => {
    if (err) {
      next(err);
      return;
    }

    const file = req.file;
    const destFolder = path.join('files/bots/', botName);
    cleanFolder(destFolder);

    const archivePath = path.join(destFolder, 'archive.zip');
    fs.rename(file.path, archivePath, (err) => {
      if (err) {
        next(err);
        return;
      }

      fs.createReadStream(archivePath)
        .pipe(unzip.Extract({ path: destFolder }))
        .on('error', (err) => {
          safeDeleteFile(archivePath);
          next(err);
        })
        .on('close', () => {
          safeDeleteFile(archivePath);
          res.send({});
        });
    });
  };
  if (botName === BOTNAME.first) {
    upload.single('firstFileInput')(req, res, uploadHandler);
  } else if (botName === BOTNAME.second) {
    upload.single('secondFileInput')(req, res, uploadHandler);
  } else {
    next('Wrong bot number parameter!');
  }
});

router.use((err, req, res, next) => {
  console.error(err);
  const errorDescription = err.message || err;
  res.send({error: errorDescription});
});

const deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const cleanFolder = (path) => {
  try {
    deleteFolderRecursive(path);
    fs.mkdirSync(path);
  } catch (err) {
    console.error(err);
  }
};

const safeDeleteFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch(err) {
    console.error(err);
  }
};

module.exports = router;