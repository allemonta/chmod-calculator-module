# chmod-calculator

A simple 0-dependencies chmod parser and calculator.

## Installation

```sh
npm install chmod-calculator
```

## Usage

Basic example:

```ts
import Mode from "chmod-calculator"

const mode = new Mode("rwxrw-r--")

console.log(mode.toString("octal"))       // 0764
console.log(mode.toString("grouped"))     // u=rwx,g=rw,o=r
console.log(mode.object) 
/* 
    {
        OWNER: { READ: true, WRITE: true, EXECUTE: true },
        GROUP: { READ: true, WRITE: true, EXECUTE: false },
        OTHERS: { READ: true, WRITE: false, EXECUTE: false }
    }
*/
```

Multiple constructors:

```ts
const m1 = new Mode("rwxrw-r--")
const m2 = new Mode("u=rw,g=rw,o=r")
const m3 = new Mode({
    OWNER: { READ: true, WRITE: true, EXECUTE: true },
    GROUP: { READ: true, WRITE: true, EXECUTE: false },
    OTHERS: { READ: true, WRITE: false, EXECUTE: false }
})
```

## Build

```sh
npm install
npm run build
```

## Test

```sh
npm run test
```

## Improvements

- [ ] Find better names
- [ ] Export static parse function
