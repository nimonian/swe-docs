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

::: warning

Note that Base 64 encoding is **not an encryption method**. Anybody who gets a
string in Base 64 can trivially convert it back to something they can read.

:::

Again, Base 64 is _not encryption_ and _not secure_. It just means that if
someone looks at the header with their eyes (for example if the whole request
object is logged to a file somewhere on the server, an innocent but dangerous
mistake) the reader can't immediately see the username and password. They might
not even realise it _is_ a username and password. It's an example of "security
through obscurity".

::: tip

The real reason it is safe to send credentials in the `Authorization` header of
the http request is not because of Base 64 encoding, but because of **https**.
This means that the http request is properly encrypted before sending.

We send credentials in the header because `GET` requests should never include a
body. It also separates concerns: the body is for **application data** (i.e.
creating and modifying resources on the server); whereas the headers are for
**metadata**, including the authentication details.

:::

With the `Authorization` header properly set with the encoded username and
password, we can make our authenticated http request to the server.

## On the backend

### Parsing the auth header

Let's suppose an api endpoint `GET api/v1/secret` should be only accessible by
authenticated users. If we send a request to this endpoint with the basic
authorization header, we can handle it on the back end and respond
appropriately.

The first step is to get the encoded credentials out of the authentication
header and parse it back into the email and password. We can then verify the
credentials before sending back any sensitive data.

### Securing an endpoint

Here is an example based on express.js:

```js
app.get('/api/v1/secret', (req, res) => {
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

  // suppose we get the hashed password from our database like this
  const hashedPassword = getHashFromDB(email)

  // now use bcrypt to check the password against the hash
  const result = await bcrypt.compare(password, hasedPassword)

  // result is a boolean: false means password is incorrect
  if (!result) {
    return res.status(401).json({ error: 'Incorrect password' })
  }

  // otherwise, the password is right, so send the secret data!
  res.json({ msg: 'here is the secret data!' })
})
```

Note that we have used the `bcrypt` npm library - most frameworks offer access
to hashing libraries so you will need to look up the documentation for yours.

The above code could be set up as a middleware function so that it can be
dropped into any endpoint to parse out the authentication header for us and we
don't need to repeat this logic on every protected endpoint.

::: tip

The exact way this is implemented in many frameworks may vary. It could be that
much of this logic is abstracted away behind some kind of authentication
library. That's fine! But it's good to know what's happening "under the hood".

:::

### Creating users

The process of creating new users (letting them "sign up") would repeat much of
the logic in the above code:

1. Send the user data in the body of the request to `POST api/v1/user` (N.b. it
   is ok to send the data in the body when creating a user because we are
   actually modifying user data, not authenticating a request. However, **we
   must use https**.)

2. On the server, get the data out of the body,
   [salt and hash](/backend/hashing) the password, then save it to the database
   with the rest of the user data.

Thats's it! Now you have a hashed password to compare authenticated requests
with in the future.

## Limitations

There are many downsides to basic auth.

### Security

First, the user must send their credentials with every single request. Having
the user type their password over and over again creates security issues:
they're more likely to choose weaker passwords for convenience; people can look
over their shoulder; etc.

Also, if the http request is compromised somehow, the attacker has the user's
password and the user and app developer won't even know it. It is generally very
hard to get users to rotate their passwords frequently enough so that
compromised passwords become defunct.

### Convenience

Secondly, it's massively inconvenient. The user wants to "stay logged in" and
not send their password every time. We need a way of preserving the
authentication for future requests. This is where authorization comes in, and is
what we're studying next with [token based access](/backend/jwt)!
