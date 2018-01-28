require('dotenv').config();
const ssh2Client = require('ssh2').Client;
const exec = require('child_process').exec;

const root = process.env.SERVER_LOCATION;
const user = process.env.SERVER_USERNAME;
const password = process.env.SERVER_PASSWORD;
const hostName = process.env.SERVER_HOSTNAME;
const files = ['./src/*.js', './package.json', '.env'];

const executeRemote = command => {
    return new Promise((resolve, reject) => {
      const ssh2client = new ssh2Client();
      const connectOptions = {host: hostName, port: 22, username: user, password: password};
      ssh2client.on('ready', () => {
        ssh2client.exec(command, (err, stream) => {
          if (err)
            throw err;
          stream
            .on('close', () => {
              ssh2client.end();
              resolve();
            })
            .on('data', data => {
              console.log(data.toString('utf-8'));
            })
            .stderr.on('data', err => {
              console.log('Error: ', err.toString('utf-8'));
              reject('Error executing command [' + command + '] with error: ', err);
          });
        })
      });
      ssh2client.connect(connectOptions);
    });
  };

  const executeLocal = command =>{
    return new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (stdout)
          console.log(stdout);
        if (stderr)
          console.log(stderr);
        if (!err)
          resolve();
        else
          reject(err);
      });
    });
  };

  module.exports.deployProject = () => {
    console.log('\nStarting deploy');

    return executeRemote('mkdir -p ' + root)
      .then(() => {
        return executeLocal('scp ' + files.join(' ') + ' ' + user + '@' + hostName + ':' + root)
      })
      .then(() => {
        console.log('Done!');
      })
      .catch(err => {
        console.log(`Error in deploy: ${err}`);
      });
  };

