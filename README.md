# ruby-ast

Ruby to abstract syntax tree converter

## Requirements

- ruby 1.9+

## Why?

Some libraries like rollup or webpack can use assets in various formats to build applications. This tool should be able to convert Ruby code into an abstract syntax tree that can be consumed or converted by other tools, e.g. such that convert ruby to js, which in the end would let you use ruby in js apps.

## How does it work?

This package uses `Ripper` which is a Ruby script parser from the standard library. The method `Ripper.sexp` is called in a child process via a tiny cli script and returns a json with an abstract syntax tree (a symbolic expression tree, called S-expression).

## Examples

```js
import { convert } from '@buxlabs/ruby-ast'
convert('puts "Hello world!"')
.then(result => {
  console.log(result) // [ 'program', [ [ 'command', [Array], [Array] ] ] ]
}) 
```

## Status

Experimental, as most of Ripper methods are not locked. Not suggested for production use.

Instead of relying on a builtin parser it could also be a js lib without any dependencies but the maintenance cost is currently too high.

## Todo

- find good s-expression docs,
- add more tests,
- add benchmarks,
- consider other execution approaches,
- expose other Ripper methods
