# Tokens

If a user needed to type their email and password every time they wanted to
request something from the server, they would very quickly stop using the app.
We want to **authenticate once** with email and password, and then **authorise**
further requests without authenticating again.

A very common implementation of this strategy is _javascript web tokens_.

## What are JWTs?

Instead of username and password, we give each user a special token to prove
their identity. These look like

```js
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMDI3MzR9.zNYcb1c9v8EO-oszD8cs4LDEzuS-epfQINWHfwQ48SI'
```

A user tells us their username and password once, and in return they get a token
like this. Then, whenever they want to access a protected resource, they show us
this token.

If we split this at the full stops `.` we get three parts:

- **Header:** The first part `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` is called
  the header, and is a Base 64 encoding of some metadata about the token.

- **Payload:** The middle part
  `eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMDI3MzR9` is the payload. It is a
  Base 64 encoding of an object of data about the user, such as their name,
  along with the time at which the token was made.

- **Signature:** The last part `zNYcb1c9v8EO-oszD8cs4LDEzuS-epfQINWHfwQ48SI` is
  called the signature. We'll talk about that shortly!

::: tip

Use the `atob()` function in the browser, or `Buffer.from()` in node, to decode
the payload from Base64 into a readable string. See what you get!

:::

### Making id tokens

Let's say one of our users is called Morpheus and we want to use his name
`morpheus` as a token. Well, this is dumb. Anbody could send us the word
`morpheus` and get access to Morpheus' secrets.

Maybe we could hash the word `morpheus` on the server and add that to the token?
We'll use an algorithm I just invented called `stupidHash()`:

1.  Map each letter to its position in the alphabet (e.g m => 13)
1.  Multiply the numbers together

We get the hash `896313600`. Now, when Morpheus gives us his password, we send a
token `morpheus.896313600` to our user on the frontend. A few minutes later, a
user sends it back to us, and says "Hey, I got this special token you made for
me! Can I have Morpheus' secret document from the database?"

This is better, but if an attacker knew our algorithm, they could take the
username `morpheus` and work out the hash `896313600` and now they have the
exact same token. Damn.

### Signing tokens

Well, what if we chose a `SECRET_PHRASE` and kept that on the server? If we
appended this to the username before hashing it, the result is called a
**signature**. When we maintain a secret and mix it in with some data before
hashing it, this is called **signing** the data.

::: tip

We use a secret key to _sign_ the token. Signing the token means we hide
something in the token which comes uniquely from our server. When the token is
given back to us, we can be certain that it was signed by our server, and is
therefore an authentic token.

:::

```js
// server.js
const SECRET_PHRASE = 'thereisnospoon'
const signature = stupidHash('morpheus' + SECRET_PHRASE)
const token = 'morpheus' + '.' + signature
// morpheus.281661577413970231296000
```

Now, even if a hacker knew the username `morpheus` and the `stupidHash()`
algorithm, they wouldn't be able to replicate Morpheus' token, because they
don't know the secret phrase! So, if someone gives the token
`morpheus.281661577413970231296000` back to the server, we know it must be
Morpheus. (This assumes the token hasn't been stolen from Morpheus, which is a
different matter.)

This is the right idea, but it is also a terrible algorithm - it could easily be
hacked by brute force.

### So what are JWTs?

A JWT is formed by taking a javascript object such as

```js
{
    name: 'morpheus',
    iat: '1653102734'
}
```

and signing it with a large, random secret string. The hashing algorithm is much
better than stupidHash (usually SHA256). The `iat` property stands for _issued
at_ and is the time at which the token was generated (in
[epoch seconds](https://www.codingem.com/epoch-time/)).

## Working with JWTs

### Generating JWTs

The npm library [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) can
sign JWTs with a secret for us. It will also add an `iat` value for us so we
don't need to calculate that. We should `npm i jsonwebtoken` and then

```js
const jwt = require('jsonwebtoken')
const token = jwt.sign({ name: 'morpheus' }, 'thereisnospoon')
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMjE0MjZ9.d-U-OdG1eTVhfBeX9yJK8rbSeGyDg00wx4M1it3qDbc
```

Of course, `'thereisnospoon'` is a poor secret - we should generate a large
random string (256 bits or 32 bytes) and store it as an environment variable so
we can use it in our code without hard-coding it in:

```js
require('dotenv').config()
const token = jwt.sign({ name: 'morpheus' }, process.env.TOKEN_SECRET)
```

### The JWT flow

The whole flow looks like this:

1.  A user sends their username and password to a server endpoint such as
    `/api/v1/login`

1.  The server checks the username and password against the hash in our database
    with `bcypt.compare()`

1.  If successful, the server signs an object containing some identifying
    information for the user, thus creating a JWT. The object in the payload
    should **not** contain the password or the hashed password for the user.

1.  The server sends this JWT to the user and the frontend stores it in
    `localStorage` or as a cookie.

1.  If the user needs to access a protected resource, they send the JWT. The
    server uses `jwt.verify()` to check that the token was signed with our
    secret and that the payload hasn't been tampered.

1.  If the token is authentic, we grant access to the protected resource.

::: tip

The process of checking the token with `jwt.verify()` could be written in a
middleware function so it can be dropped in to any protected resource.

:::

## Refresh tokens

The JWT we made above and sent to the user is called an **access token**. The
problem with our method so far is that, if our access token got stolen, it gives
the thief unlimited access to secrets on the server.

### Expiring tokens

For this reason, when we create a token, we should make it expire. In practice,
tokens usually expire after about `1h` (depending on security needs), but we
will make ours expire after `30s` to make testing easier:

```js
const access_token = jwt.sign({ name: 'morpheus' }, process.env.TOKEN_SECRET, {
  expiresIn: '30s'
})
```

Now, if we try to use this token after 31 seconds, it will not work and
`jwt.verify()` will fail. This is great - if the token gets stolen, the damage
the thief can do is mitigated.

So does the user have to send us their password every time the token expires?
No - this is where **refresh tokens** come in.

1.  When the user first sends their password to authenticate with the server, we
    create two tokens: one which expires called the `access_token`, and another
    which does not expire called the `refresh_token`.

1.  We save the refresh token in a list of `validRefreshTokens` on the server
    (ideally in a database) but an array will do for now.

1.  We send them both back to the user, and the user uses the access token to
    get secrets from the server until it expires.

1.  Now, if the user needs a new `access_token`, they can send their refresh
    token to an api endpoint such as `/api/v1/refresh` - if the token is
    verified as authentic, and if it is in the list of valid tokens, then we
    grant a new `access_token`.

When the user wants to sign out, we remove their refresh token from the list of
valid refresh tokens.
