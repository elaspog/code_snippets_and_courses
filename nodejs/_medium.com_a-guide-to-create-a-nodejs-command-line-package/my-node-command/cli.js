#!/usr/bin/env node

// Grub provided args.
const [,, ...args] = process.argv

// Print hello world provided args.
console.log(`Hello World ${args}`)
