# Securing APIs with Basic Auth

## On the frontend

Basic Auth requires a user to send their username and password to the server in order to access protected resources.

The first thing for us to understand, is how to encode in Base 64.

### Encoding to Base 64 in dev tools

If you open developer tools in your browser, you can use
```js
btoa('My cool string!')
// 'TXkgY29vbCBzdHJpbmch'
```
to get the Base 64 encoding, and then
```js
atob('TXkgY29vbCBzdHJpbmch')
// 'My cool string!'
```
to get it back.

::: tip
Question: What is brown and sticky?

Answer: QSBzdGljayE
:::

### Encoding to Base 64 in Node

We don't have access to `atob()` in Node. It's a bit more complicated, but we can do it like this:
```js
// To encode in Base 64:
const encoded = Buffer.from('Admit it...', 'utf-8').toString('base64')
// To decode again:
const decoded = Buffer.from('eW91IGxhdWdoZWQgYXQgdGhlIHN0aWNrIGpva2U=', 'base64').toString('utf-8')
```

::: tip
Question: What do you call a deer with no eyes?

Answer: Tm8gaWRlYS4uLg

:rofl:
:::

### Using the Authorization: Basic header

Let's suppose the user `mickey_m` has password `HeyPluto!123`. In order to send the user's credentials to our api on the backend, we would encode the string `mickey_m:HeyPluto!123` in Base 64 and then send it in the `Authorization` header of a POST request. If you're using the Fetch API, here's how the `headers` object would look
```js
headers: {
  'Authorization': `Bearer ${toBase64('mickey_m:HeyPluto!123')}`
}
```
where `toBase64` is a function you would need to write using what we've learned about `Buffer` above.

## On the backend

### The basic-auth package

Let's suppose an api endpoint `api/v1/secrets` should be only accessible by authenticated users. If we send a request to this endpoint with the basic authorization header, we can retrieve it from the `req` object in the backend. There is a useful module called [basic-auth](https://www.npmjs.com/package/basic-auth) which can help parse the username and password
```js
// server.js
const basicAuth = require('basic-auth')

app.get('/api/v1/secrets', (req, res) => {
  const user = basicAuth(req)
  // Now user.name and user.pass are available
})
```
We can then check whether the password matches the one in our database.

### Using middleware

If would be annoying to have to write the code which parses and checks the password in every endpoint that needs protecting. To help with that, we can write a **middleware** function.

Here's an example of a stupid middleware:
```js
function woohoo (req, res, next) {
  req.woo = 'hoo!'
  next()
}
```
Then, on some endpoint, we could write
```js
app.get('/api/v1/some/endpoint', woohoo, (req, res) => {
  console.log(req.woo) // => 'hoo!'
})
```
We can put the `woohoo` function onto any endpoint we like.

You can imagine we could write a middleware function called `authenticate` which we drop in to any endpoint which requires protection. The `authenticate` function would make sure the user exists and make sure the password is correct before calling `next()` so the endpoint can continue processing.

## Hashing and salting

### Hashing functions

It is a bad idea to save passwords in your database. If somebody hacked the database, the users would lose their accounts forever (you'd have to deactivate their account, but they how do they prove who they are to reacivate it?). Instead, we **hash** the password. A hash is a function which takes some data and scrambles it in a particular way:

 - the same data will always result in the same hash
 - if you know the hash, it is infeasible to get the data back
 - all hashes have the same length regardless of the data size
 - a small change in the data will completely change the hash

Think of the hash of some data as being like the fingerprint of the data: it's much smaller, but effectively unique.

::: details
There are more possible different data than there are hashes. Let's say our hash function hashes data into strings of length 64. There are more possible data inputs than there are strings of length 64, and therefore there must be some data inputs that would result in the same hash. This is called a **collision**. But, in practice, there are an *overwhelmingly large* number of strings of length 64. You cannot even imagine how big this number is. So the likelihood of ever having a collision that causes problems is very, very small.
:::

### Hashing passwords

Before storing the user's password on the server, we could hash it. Then, when the user sends us their password, we could hash it using the same algorithm and check it matches the hash in our database. If the hashes match, we know they gave us the right password.

### Hashing alone isn't enough

The problem with this is, if hackers got our database, they could look at all the hashes and see if any of the users have the same hash. If they do, it's probably a common string like `password123`. They can experiment a bit and eventually compromise some accounts.

Also, if they got our hashes, they could simply google the hash. Lots of people have spent lots of time hashing various words and phrases using all the popular hashing functions. Hackers can even download a *rainbow table*, which is a huge database of common phrases and their hashes with various algorithms.

::: tip
Try googling `482c811da5d5b4bc6d497ffa98491e38`
:::

### Salting

The solution is to add a string of 10 or so random characters onto the password before hashing. This random string is called a **salt**. This means that even if two users have the same password, their salted hash will be different.

### bcrypt

The npm library [bcrypt](https://www.npmjs.com/package/bcrypt) uses a powerful hashing algorithm and is recommended for use in modern applications. It is called `bcrypt` because the algorithm used to hash is called the *blowfish* algorithm: blowfish + cryptography = bcrypt. Here is how we use it:
```js
const bcrypt = require('bcrypt')

const saltLength = 10
const password = 'GetPwnd5000'

const hash = bcrypt.hashSync(password, saltLength)
// $2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy
```
And to check if the password is correct:
```js
const passwordMatches = bcrypt.compareSync('GetPwnd5000', '$2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy')
// true
```

::: warning
Rather than `.hashSync()` and `.compareSync()`, you should use the async versions of these methods `.hash()` and `.compare()`. bcrypt's algorithm is cpu intensive, and using async will start the process on a separate thread and thus will not block your server from processing further incoming requests.
:::

::: details
You might be wondering - if the salt is random, how can bcrypt compare the password to the saved hash? Look carefully at the hash: `$2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy`

At the beginning, you see `$2b$10$` - this tells bcrypt that the `2b` algorithm was used with `10` salt characters. The first 22 characters of the remaining string `EMX0KBM5mRJLCHxClch1ie` are a radix-64 encoding of the salt, and the remaining part `B5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy` is the actual hash.

You might wonder *isn't storing the salt dangerous?* The answer is no - [hiding the salt is unnecessary](https://stackoverflow.com/a/215165).
:::

## :package: Assignment: Improving Cloudbox

### Add hashing and salting

 - Use bcrypt to hash and salt the password whenever a user is created. Replace all existing users' passwords with salted hashes.
 - Refactor your frontend code so that it no longer sends username and password in the body, but correctly encodes and includes it in the basic auth header.
 - Refactor your protected endpoints to use bcrypt's compare method.
 - In doing the above, it is a very good idea to extract all of this logic into a middleware called `authorize` - whenever a user wants to use a protected endpoint, they have to supply their username and password in the basic auth header and the authorize middleware will extract and compare it before responding.
