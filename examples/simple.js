// simple.js
'use strict';

const Depot = require('mtd');
const help = require('../lib/mtd-help');

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
