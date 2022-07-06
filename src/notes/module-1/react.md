# React

## Getting started

Make sure node is installed, and
```bash
$ npx create-react-app react-todos
$ cd react-todos
$ npm start
```
in the directory you'd like your project to live.

In `index.html`, you will find
```html
<div id="root"></div>
```
which is the single element into which our app is injected (this is a single page app). The code which does this is in `index.js`:
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
The app component is formed by using a function in the `App.js` file.

The html return by the `App()` function is actually jsx, which has some differences. For example, we don't use `class=` we use `className=` and so on.

## JS in JSX

Modify `App.js`:
```js
function App() {
  const name = 'Simon'
  const x = 3

  return (
    <div className="container">
      <h1>Hello React</h1>
      <h2>Nice to meet {name}</h2>
      <h3>{x + 1} is my favourite number!</h3>
    </div>
  );
}

export default App
```
This demonstrates how you can use js in your jsx.

## Components

Make a directory for components and make `Header.js`:
```js
// components/Header.js
const Header = () => {
  return (
    <div>
      <h1>React Todo</h1>
    </div>
  )
}

export default Header
```
Now in `App.js`:
```js
// App.js
import Header from './components/Header'

function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}

export default App
```
So you can make components, import them and use them as normal jsx elements.

## Props

```js
// Header.js
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

export default Header
```
and
```js
// App.js
import Header from './components/Header'

function App() {
  return (
    <div className="container">
      <Header title="Cool todos!" />
    </div>
  );
}

export default App
```
so you can pass props.

We could add a default by adding
```js
Header.defaultProps = {
  title: 'Awesome todos!'
}
```
to the `Header.js` file.

We could make use of destructuring to make it more concise:
```js
const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}
```

We can enforce prop types with
```js
import PropTypes from 'prop-types'

Header.propTypes = {
  title: PropTypes.string
}
```
