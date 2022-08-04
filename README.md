# type-safe-template-literal

A simple tagged template that allows to use stricter, type-safe template literals in TypeScript.

## Installation

The package can be used both with CommonJS `require` and ESM `import`. For readability purposes, it is recommended to alias the function with a simpler word (in the following examples, the function is assigned to "t").

```sh
npm install @clmmatteo/type-safe-template-literal
```

```ts
//If you use CommonJS
const {
  typeSafeTemplateLiteral: t,
} = require("@clmmatteo/type-safe-template-literal");
```

```ts
//If you use ESM modules
import { typeSafeTemplateLiteral as t } from "@clmmatteo/type-safe-template-literal";
```

## The problem

In TypeScript, this is perfectly valid code:

```ts
function greeting(name?: string): string {
  return `Hi! My name is ${name}!`;
}
console.log(greeting());
//Result: "Hi! My name is undefined!"
```

In other words, any type that can be coerced to a string (including `undefined`, `null`, and objects that have a `.toString()` method) can be used in a template literal without any warning.

## The solution

If you want stricter warnings, you can use the tagged template exported by this package in order to **only allow strings** inside your template literal.

Using the previous example (notice the addition of the tagged template _t\`...\`_ in the return expression):

```ts
function greeting(name?: string): string {
  return t`Hi! My name is ${name}!`;
  //                        ^^^^
  // Type 'undefined' is not assignable to type 'string'.
}
```

TypeScript warns us when using variables that aren't, or may not be, strings, so that we can make informed decisions.

```ts
function greeting(name?: string): string {
  return t`Hi! My name is ${name ? name : "still to be decided"}!`;
}
console.log(greeting());
//Result: "Hi! My name is still to be decided!"
```

## Other effects

Any variable that isn't, or may not be, a string, triggers an error (even numbers!). This forces you to better think about how you want to format the string representation of the data you're using.

In the following example, the function is using numbers instead of strings. How should very big numbers, or numbers with decimals, be formatted?

```ts
function multiplier(x: number, y: number): string {
  return t`${x} times ${y} is ${x * y}`;
  //         ^          ^       ^^^^^
  //Argument of type 'number' is not assignable to parameter of type 'string'.
}
```

In the following example, the function is using a date. How should the date be formatted?

```ts
function sayToday(): string {
  return t`Today is ${new Date()}`;
  //                  ^^^^^^^^^^
  //Argument of type 'Date' is not assignable to parameter of type 'string'.
}
```

In the following example, the `greeting` method of the class is using a property that may be undefined.

```ts
class Human {
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }

  greeting(): string {
    return t`Hi! My name is ${this.name}!`;
    //                        ^^^^^^^^^
    //Type 'undefined' is not assignable to type 'string'.
  }
}
```
