# Securing APIs with Basic Auth

## On the frontend

Basic Auth requires a user to send their username and password to the server in
order to access protected resources.

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

to get the string back.

::: warning

Note that Base 64 encoding is **not an encryption method**. Anybody who gets a
string in Base 64 can trivially convert it back to something they can read.

:::

::: tip

Question: What is brown and sticky?

Answer: QSBzdGljayE

:::

### Encoding to Base 64 in Node

We don't have access to `atob()` in Node. It's a bit more complicated, but we
can do it like this:

```js
// To encode in Base 64:
const encoded = Buffer.from('Admit it...', 'utf-8').toString('base64')
// To decode again:
const decoded = Buffer.from(
  'eW91IGxhdWdoZWQgYXQgdGhlIHN0aWNrIGpva2U=',
  'base64'
).toString('utf-8')
```

::: tip

Question: What do you call a deer with no eyes?

Answer: Tm8gaWRlYS4uLg

:rofl:

:::

### Using the Authorization: Basic header

Let's suppose the user `mickey_m` has password `HeyPluto!123`. In order to send
the user's credentials to our api on the backend, we would encode the string
`mickey_m:HeyPluto!123` in Base 64 and then send it in the `Authorization`
header of a POST request. If you're using the Fetch API, here's how the
`headers` object would look

```js
headers: {
  'Authorization': `Bearer ${toBase64('mickey_m:HeyPluto!123')}`
}
```

where `toBase64` is a function you would need to write using what we've learned.

Again, Base 64 is _not encryption_ and _not secure_. It just means that if
someone looks at the header with their eyes (for example if the whole request
object is logged to a file somewhere on the server, an innocent but dangerous
mistake to make) the reader can't immediately see the username and password.
They might not even realise it _is_ a username and password. It's an example of
"security through obscurity".

::: tip

The real reason it is safe to send credentials in the `Authorization` header of
the http request is not because of Base 64 encoding, but because of **https**.
This means that the http request is properly encrypted before sending.

We send credentials in the header because `GET` requests should never include a
body. It also separates concerns: the body is for application data (i.e.
creating and modifying resources on the server); whereas the headers are for
metadata, including the authentication details.

:::

## On the backend

### Parsing the auth header

Let's suppose an api endpoint `api/v1/secrets` should be only accessible by
authenticated users. If we send a request to this endpoint with the basic
authorization header, we can retrieve it in the backend.

Here is an example based on express.js:

```js
// get the auth header, e.g. "Bearer bWlja2V5X206SGV5UGx1dG8hMTIz"
const authHeader = req.headers.authorization

// make sure it is formatted correctly
if (!authHeader || !authHeader.startsWith('Basic ')) {
  return res.status(401).json({ error: 'Unauthorized' })
}

// split off the credential, i.e. "bWlja2V5X206SGV5UGx1dG8hMTIz"
const encodedCredentials = authHeader.split(' ')[1]

// decode it - in this e.g. we get "mickey_m:HeyPluto!123"
const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString(
  'utf-8'
)

// split credential at ":" to separate username and password
const [email, password] = decodedCredentials.split(':')

// make sure they are there!
if (!email || !password) {
  return res.status(400).json({ error: 'Email and password are required' })
}

// now we have access to the password to do what we want, for example
// we could hash and save the password in the database:

const saltRounds = 10
const hashedPassword = await bcrypt.hash(password, saltRounds)
createUserInDB(email, hashedPassword)
```

Note that we have used the `bcrypt` npm library - most frameworks offer access
to hashing libraries so you will need to look up the documentation for yours.

The above code could be set up as a middleware function so that it can be
dropped into any endpoint to parse out the authentication header for us.

### Checking the password

Usually, the password has been saved in the database as a hash. To check if the
password is correct, we can hash the provided password and check it against the
hash in the database. Because the hash has usually been
[salted](/backend/hashing#salting), this is a bit tricky. However, most
libraries will do this for use with some kind of `compare` function.

Below is an example of this being implemented in express.js. We pick up from
where the above snippet ends.

```js
// parse the provided password from the auth header
const [email, password] = decodedCredentials.split(':')

// suppose we get the hash from our database like this
const savedHash = getHashFromDB(email)

// now use bcrypt to check the password against the hash
const result = await bcrypt.compare(password, savedHash)

// result is a boolean: false means password is incorrect
if (!result) {
  return res.status(401).json({ error: 'Incorrect password' })
}

// otherwise, we can be confident the user is authenticated
res.status(200).json({ message: 'Here is some secret data!' })
```
