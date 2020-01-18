#!/usr/bin/env node
var os = require('os')
var path = require('path')
var { spawn } = require('child_process')
var match = process.version.match(/v(\d+)\.(\d+)/)
var major = parseInt(match[1], 10)
var minor = parseInt(match[2], 10)

if (major >= 9 || (major === 8 && minor >= 6)) {
  const cmd = (command, args) => {
    var sp = spawn(path.join(__dirname, command) /*command*/ , args.slice(2) /*args*/ , {} /*options, [optional]*/ );
    sp.stdout.pipe(process.stdout);
    sp.stderr.pipe(process.stderr);
    sp.on('exit', function (code) {
      // console.log('child process exited with code ' + code);
    });
  }

  switch(os.type()) {
    case 'Linux':
      cmd('linux-panda-api', process.argv)
      break
    case 'Darwin':
      cmd('mac-panda-api', process.argv)
      break
    case 'Windows_NT':
      cmd('win-panda-api.exe', process.argv)
      break
  }
} else {
  console.error('Node 8 or greater is required.')
}
