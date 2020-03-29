#!/usr/bin/env node

const commander = require('commander')

commander
    .version('v0.0.1')
    .description('This is a dummy demo CLI.')
    .option('-p, --param <type>', 'To input a parameter')
    .option('demo', 'To output demo')
    .parse(process.argv)

// Runs only if `name` argument is passed with a `<type>`...
if (commander.param) {
  console.log(`Your parameter is ${commander.param}.`);
}

// Runs only if `demo` argument is passed...
if (commander.demo) {
  console.log(`This is a DEMO.`);
}
