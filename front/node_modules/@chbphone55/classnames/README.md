# classnames

<img alt="Dependency Status" src="https://david-dm.org/ChrisBrownie55/classnames.svg" />
<img src="https://api.codeclimate.com/v1/badges/8879bdee9b5f03fe7119/maintainability" alt="Maintainability Rating" />
<img src="https://snyk.io/test/github/ChrisBrownie55/classnames/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" />
<img src="https://badge.fury.io/js/%40chbphone55%2Fclassnames.svg" alt="npm version" />
<img src="https://img.shields.io/npm/dw/@chbphone55/classnames.svg" alt="downloads" />

A simple and small JavaScript utility for joining class names together. Made for use with frameworks like React, but can be used how you see fit.

## **Installation:**
```bash
npm i @chbphone55/classnames
# or
yarn add @chbphone55/classnames
```

## **Usage:**

### First let's import it
```js
// Node
const classNames = require('@chbphone55/classnames');

// ESM
import classNames from '@chbphone55/classnames';
```

### Now let's use it
```js
/* STRINGS */
classNames('loading-indicator', 'red-bg');
// => 'loading-indicator red-bg'

/* OBJECTS, falsey values cause extra spaces */
classNames({ animated: 'truthy value', 'inactive-bg': false });
// => 'animated '

/* OBJECTS & STRINGS */
classNames('loading-indicator', { animated: true });
// => 'loading-indicator animated'

/* ARRAYS (recursively flattened) */
classNames(['activated', { nested: true }]);
// => 'activated nested'

/*
  All other types will be ignored but will cause extra spaces
  if they are either, falsey object (null) or not an object/string/array
*/
classNames('test', undefined);
// => 'test '

classNames(null, 'test');
// => ' test'

/* Multiple of same value will not be removed as there is no need */
classNames('test', 'test', 'test');
// => 'test test test'
```

### NOTE: extra spaces will not affect use with DOM elements (includes framework elements like React)

## What about using it in React.js?

You simply pass the call to `classNames()` as the value for the attribute `className={}`

```jsx
/* REACT CLASS COMPONENT */
class MyComponent extends React.Component {
  render() {
    const { className } = this.props;
    return <div className={classNames('test', className)}></div>;
  }
}

/* REACT FUNCTION COMPONENT */
function MyComponent({ className }) {
  return <div className={classNames('test', className)}></div>;
}
```

# License
[MIT](https://github.com/ChrisBrownie55/classnames/blob/master/LICENSE) Copyright © 2018 Christopher Brown

Influenced by Jed Watson's [classnames](https://github.com/JedWatson/classnames)
