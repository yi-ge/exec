#!/usr/bin/env node
var os = require('os')
var path = require('path')
var { spawn } = require('child_process')
var match = process.version.match(/v(\d+)\.(\d+)/)
var major = parseInt(match[1], 10)
var minor = parseInt(match[2], 10)

if (major >= 9 || (major === 8 && minor >= 6)) {
  const cmd = (command) => {
    var ls = spawn(path.join(__dirname, command) /*command*/ , [] /*args*/ , {} /*options, [optional]*/ );
    ls.stdout.on('data', function (data) {
      console.log(data.toString());
    });

    ls.stderr.on('data', function (data) {
      console.log(data.toString());
    });

    ls.on('exit', function (code) {
      // console.log('child process exited with code ' + code);
    });
  }

  switch(os.type()) {
    case 'Linux':
      cmd('linux-panda-api')
      break
    case 'Darwin':
      cmd('mac-panda-api')
      break
    case 'Windows_NT':
      cmd('win-panda-api.exe')
      break
  }
} else {
  console.error('Node 8 or greater is required.')
}
