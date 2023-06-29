# parselicious
a module for parsing strings used inhouse for BardsBallad modifier strings.

# Installation
You can install it via your preferred package manager.
`npm i -S parselicious`

# Usage
Import the module.

```js
import parse from 'parselicious';

// or require it.
const parse = require('pareselicious').default
```

Then provide the string and variables that are accessible for the string.
```js

const vars = {
  name: 'Bob',
  number: '111-111-1111',
  birthYear: 2001,
  currentYear: new Date.now().getCurrentYear()
}

const result = parse('Hey! My name is ${name} my number is ${number} and I\'m currently *{currentYear - birthYear} years old.', vars)
// Hey! My name is Bob my number is 111-111-1111 and I'm currently 22 years old.
```

# Features
* Doesn't use Eval so is safe to run on user generated content.
* Limits what variables the parser has acess to keep secrets safe.
* Math expressions via *{} *{10 + 2 ^ 10}
* Conditionals via ?{} ?{3 < 10 ? less : more}
* variable replacements via ${} ${age}

# TODO:
1. Make a way to keep math variables for further down the line something like *{math + expression}[variableName] ?{variableName > 10 ? true : false}
2. Add support for math expressions inside of conditional expressions.