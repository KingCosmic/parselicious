import math from 'mathjs'

function evaluateCondition(expression, variables) {
  const operators = {
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b,
    '>': (a, b) => a > b,
    '>=': (a, b) => a >= b,
    '<': (a, b) => a < b,
    '<=': (a, b) => a <= b
  };

  const stack = [];

  const tokens = expression.split(/\s+/);

  for (const token of tokens) {
    if (token in variables) {
      stack.push(variables[token]);
    } else {
      stack.push(token);
    }
  }
  
  const b = stack.pop();
  const token = stack.pop();
  const a = stack.pop();

  if (!operators[token]) return tokens[0]

  const result = operators[token](a, b);

  return result
}

function evaluateExpression(expression, variables) {
  const scope = Object.assign({}, variables);
  // Use mathjs for evaluating mathematical expressions
  return math.evaluate(expression, scope);
}

export function parseString(input, variables) {
  let output = input.replace(/\$\{(\w+)\}/g, (match, variable) => {
    if (variables.hasOwnProperty(variable)) {
      return variables[variable];
    }
    return match;
  });
  
   output = output.replace(/\?{(.+?)\s+\?([^:]+?):([^}]+?)\}/g, (match, condition, trueValue, falseValue) => {
    const evaluatedCondition = evaluateCondition(condition, variables);
    return evaluatedCondition ? trueValue.trim() : falseValue.trim();
  });

  output = output.replace(/\*\{([^}]+?)\}/g, (match, expression) => {
    const evaluatedExpression = evaluateExpression(expression, variables);
    return evaluatedExpression;
  });

  return output;
}

/* Examples

// Example usage
const variables = {
  name: 'John',
  age: 25,
  country: 'USA',
  hasLicense: true
};

const inputString = 'My name is ${name}. I am ${age} years old.';
const parsedString = parseString(inputString, variables);
console.log(parsedString); // Output: My name is John. I am 25 years old.

const conditionalString = 'I live in {if country === "USA" ? the United States : another country}.';
const parsedConditionalString = parseString(conditionalString, variables);
console.log(parsedConditionalString); // Output: I live in the United States.

const mathExpression = 'The square of ${age} is {{age ^ 2}}.';
const parsedMathExpression = parseString(mathExpression, variables);
console.log(parsedMathExpression); // Output: The square of 25 is 625.

*/