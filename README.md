# `mtd-help`

[![NPM version][npm-image]][npm-url] [![Downloads][npm-downloads]][npm-url]

This is a very simple module that provides an easy way to define a `help` track for applications using [mtd][mtd].

## Install

Using [npm](https://www.npmjs.com/).

```shell
$ npm install mtd-help
```

## Example

```javascript
// example.js
var mtd = require('mtd'),
    help = require('mtd-help');
 
mtd({
  alpha: ['Our first command line option', 'a'],
  beta: ['Our second command line option', 'b']
})
 
.track('one', function (alpha) {})
.track('two', function (beta) {})
 
.track('help', help({ name: 'example', hide: true }, {
  one: 'This is our first track.',
  two: 'This is our second track.'
}))
 
.embark();
```

Running `node example help` will print the following to `stdout`.

```
example
 
[ one ] This is our first track.
        --alpha, -a     Our first command line option
 
[ two ] This is our second track.
        --beta, -b      Our second command line option
```

## Usage

Requiring `mtd-help` returns a function that, when invoked, encapsulates the given arguments and returns a function suitable for use as an `mtd` track block.

Here is the function signature for `mtd-help`.

```javascript
function wrap (settings :: Object, details :: Object)
```

The `settings` object is looking for two properties:

- `name :: String` - The name heading of the application.
- `hide :: Boolean` - Whether the `help` track should be listed in the track list.

The `details` object should be filled with properties whose names correspond with track names in the application. These properties should contain `String` values, giving a description of the purpose of each track.

---

Enjoy!

[Oka.io](http://oka.io/) | [@Okahyphen](https://twitter.com/Okahyphen)

[npm-url]: https://www.npmjs.com/package/mtd-help
[npm-image]: http://img.shields.io/npm/v/mtd-help.svg
[npm-downloads]: http://img.shields.io/npm/dm/mtd-help.svg

[mtd]: https://github.com/Okahyphen/mtd
