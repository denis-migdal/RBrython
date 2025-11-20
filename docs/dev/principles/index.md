## Goals

RBrython aims at better interactions between Python and JavaScript code while avoiding conversions.

RBrython focuses on the core of Python, it doesn't aim to maintain standard Python libraries.

RBrython does not directly focuses on runtime performances. However performances can be achieved through an optimizer, or by re-writing critical parts in JavaScript (which should be made easier by RBrython).

RBrython does not aim for transcription performances and prefers AoT compilation.

## Principles

### Principle 0

RBrython should respect the principles of clean code and clean architecture.

### Principle 1

In order to limit the scope of changes, the several RBrython parts should be as independent as possible.

For example, corelib and stdlib should not rely on runlib. This means that they either have to be implemented in Python, or in vanilla JavaScript. Indeed, as they are huge code bases, each minor changes in the runlib interface would be hell.

### Principle 3

RBrython should be free from JavaScript-Python data conversions. Python use of classes/functions from JavaScript should be transparent, and vice versa.

### Principle 4

RBrython should represent Python data as vanilla JavaScript data showing intend, not behavior. RBrython Python specific behaviors should be implemented inside Python operations, and should be reflected on the data.

For example, declaring a method should be written in JavaScript as:
```js
class X {
  foo() {}
}
```

Then, the following Python code `X.foo(x)` should be made possible without changing the class definition in JavaScript, but by changing the call behavior. 

### Principle 5

RBrython should document as much as possible to help third party interventions. RBrython will also try documenting equivalent Brython features.