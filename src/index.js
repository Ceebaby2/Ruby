// Ruby for Node
// diamond
// Helper methods from ruby ported to Node.

// NOOP
import {
  assign,
  each,
  functions,
} from 'lodash';

import $Stdout from './stdout';
import _Integer from './integer';
import _String from './string';
import PercentStrings from './percent_strings';

// # Getting Started
//
// ```bash
// npm install ruby --save
// ```
//
// ```js
// let r = require('ruby');
//
// let words = r.w('I am not throwing away my shot!');
// words; // ['I', 'am', 'not', 'throwing', 'away', 'my', 'shot!']
// ```

// NOOP
class Ruby {
  constructor() {

    // # $stdout - [Docs](stdout.html)
    //
    // A collection of methods that output to stdout. All the methods
    // are available both on the $stdout object and as standalone methods.
    //
    // * [putc](stdout.html#putc)
    // * [puts](stdout.html#puts)
    this.$stdout = new $Stdout();
    assign(this, this.$stdout);

    // # int - [Docs](integer.html)
    //
    // * [even](integer.html#even)
    // * [next](integer.html#next)
    // * [odd](integer.html#odd)
    // * [pred](integer.html#pred)
    // * [succ](integer.html#succ)
    // * [times](integer.html#times)
    // * [to_i](integer.html#to_i)
    this.int = new _Integer();

    // # str - [Docs](string.html)
    //
    // * [chars](string.html#chars)
    // * [downcase](string.html#downcase)
    // * [empty](string.html#empty)
    // * [reverse](string.html#reverse)
    // * [upcase](string.html#upcase)
    this.str = new _String();

    // # Percent Strings - [Docs](percent_strings.html)
    //
    // * [w](percent_strings.html#w)
    // * [percent_w](percent_strings.html#percent_w)
    assign(this, new PercentStrings());

  // NOOP
  }

  // # add_methods_to_number_prototype
  //
  // If you'd like the [Integer Methods](integer.html) as attributes on any number, just run this method.
  //
  // ```js
  // ruby.add_methods_to_number_prototype();
  // ```
  add_methods_to_number_prototype () {
    _addMethodsToPrototype(Number.prototype, this.int);
  }

  // # add_methods_to_string_prototype
  //
  // If you'd like the [String Methods](string.html) as attributes on any string, just run this method.
  //
  // ```js
  // ruby.add_methods_to_string_prototype();
  // ```
  add_methods_to_string_prototype () {
    _addMethodsToPrototype(String.prototype, this.str);
  }

// NOOP
}

function _generate_method_with_block (func) {
  return function (cb) {
    return func(this, cb);
  }
}

function _addMethodsToPrototype(prototype, object) {
  let methods = functions(object);

  each(methods, (method_name) => {
    let method = object[method_name];

    // More than one argument indicates that the second is a block
    if (method.length > 1) {
      prototype[method_name] = _generate_method_with_block(method);
    } else {
      Object.defineProperty(
        prototype,
        method_name,
        { get: method }
      );
    }
  });
}

export default new Ruby();
