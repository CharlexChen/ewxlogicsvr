import * as chokidar from 'chokidar';
import { exec, spawn } from 'child_process';

const watcher = chokidar.watch('./web/', {
  ignored: /(^|[\/\\])\../,
  persistent: true,
});

watcher.on('ready', () => {
  watcher.on('change', (path) => {
    console.log(`File ${path} has been changed. recompiling...`);
    buildWebClient();
  });
  exec('pnpm run build:web', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log('[build:web] done', stdout, stderr);
    startNestServer();
    console.log('[web]', 'Watching for file changes...');
  });
});

function buildWebClient() {
  startProcessBySpawn('pnpm', ['build:web'])
}

function startNestServer() {
  return startProcessBySpawn('pnpm', ['start:watch']);
}


function startProcessBySpawn(command: string, args: any, label = '') {
  const childProcess = spawn(command, args);
  childProcess.stdout.on('data', (data) => {
    console.log(`${label}${data}`);
  });
  childProcess.stderr.on('data', (data) => {
    console.error(`${label}${data}`);
  });
  childProcess.on('close', (code) => {
    console.log(`process exit, [code] ${code}`);
  });
  return childProcess;
}