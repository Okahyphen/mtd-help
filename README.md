# `mtd-help`

[![NPM version][npm-image]][npm-url] [![Downloads][npm-downloads]][npm-url]

This module provides an easy way to define a `help` track for applications using [mtd][mtd].

## Install

Using [npm](https://www.npmjs.com/).

```shell
$ npm install mtd-help
```

## Example

A simple example.

```javascript
// simple.js
'use strict';

const Depot = require('mtd');
const help = require('mtd-help');

new Depot()

.default('help', [], help(
  { name: 'Help Example',
    hide: false },
  { foo: 'A line about foo.',
    bar: 'A line about bar.',
    help: 'Display this message.' }
))

.track(
  'foo',
  [
    { $: 'zal', alias: 'z', info: 'A description for zal.' },
    { $: 'qux', _: 'hello, world', alias: 'q', info: 'A description for qux.' }
  ],
  (zal, qux) => console.log(zal, qux)
)

.track(
  'bar',
  [ { $: 'baz', alias: 'b', info: 'A description for baz.' } ],
  baz => console.log(baz)
)

.embark();

```

Running our example application either as `$ node simple.js` or verbosely as `$ node simple.js help` will print the following to our terminal, complete with pretty colours.

```
Help Example

[ Multiple: On ][ Reruns: Off ][ Warnings: On ]

[ bar ] A line about bar.
  --baz, -b  
    A description for baz.

[ foo ] A line about foo.
  --zal, -z  
    A description for zal.
  --qux, -q  (default: hello, world)
    A description for qux.

[ help ] (default) Display this message.

```

## Documentation

Require the module, as you would any other Node module.

```javascript
const help = require('mtd-help');
```

`help` is now a factory function that creates a suitable `Track` _block_. It has the following signature.

```javascript
factory (
    settings: HelpSettings,
    descriptions: GenericObject = {}
): Block
```

`HelpSettings` is an interface that looks like:

```javascript
interface HelpSettings {
    /*
     * The name of your application,
     * displayed at the top of the help print out.
     */
    name: string;

    /*
     * Whether to list the track that is
     * associated with the block generated
     * in the final output.
     */
    hide: boolean;
}
```

`descriptions` is a `GenericObject`:

```javascript
interface GenericObject extends Object {
    [index: string]: any;
}
```

Its keys should be strings, corresponding to `Track` handles in your application. Each value should be a description of the matching track.

---

Enjoy!

[oka.io](http://oka.io/)

[npm-url]: https://www.npmjs.com/package/mtd-help
[npm-image]: http://img.shields.io/npm/v/mtd-help.svg
[npm-downloads]: http://img.shields.io/npm/dm/mtd-help.svg

[mtd]: https://github.com/Okahyphen/mtd
