#!/usr/bin/env node

const createTestCafe = require('testcafe');
const { spawn } = require('child_process');

async function startServer() {
  const child = spawn('yarn', ['dev'], {
    detached: true
  });
  return child;
}

async function runTest() {
  const child = await startServer();
  const testcafe = await createTestCafe('localhost', 1337, 1338);

  try {
    const runner = testcafe.createRunner();

    const failedCount = await runner
        .src(['pages/**/*.spec.ts'])
        .browsers(['chrome:headless'])
        .run();

    console.log('Tests failed: ' + failedCount);
  }
  finally {
    child.stdin.pause();
    child.kill();
    await testcafe.close();
  }
}

runTest();
