# Encryption

You probably use encryption every day without even thinking about it. Every time
you visit a website with `https`, all the data you send and receive is
encrypted. Every time you save senstive data in a database, it is likely
encrypted. Some tools allow you to encrypt the files saved on your computer.
Let's take a closer look at encryption so we can appreciate how it works.

::: tip

_Encryption_ is a way of obscuring data so that the original data can be
retrieved again.

The process of getting the original data back is called _decryption_.

It is usually done to hide data for security reasons, so that only the intended
audience can read it.

:::

## Simple encryption

The methods presented here are historically interesting and will introduce to
the main ideas of encryption, but should never be relied upon to properly secure
data.

### Caesar cipher

Let's imagine we have a string we want to encrypt:

```js
const text = 'Meet me at the cinema, noon.'
```

A very basic method of encryption would be a Caesar encryption. We choose a
number, for example `3`, and _rotate_ each character in the string through the
alphabet by `3` places.

For example, if we rotate the first letter of our string by `3` places, we get
`"M" => "P"`. If we rotate every character in our string by `3` places, we get

```js
const encrypted = 'Phhw ph dw wkh flqhpd, qrrq.'
```

So long as our audience knows that `3` was used as the key, they can easily
rotate the letters back again to get the original data.

::: tip

The number `3` in this instance is called the _key_. A key is a piece of
information that we somehow use to encrypt the data, and that the audience can
then use to decrypt it.

:::

The problem with the Caesar cypher is that it is very easy to crack. An attacker
only needs to try `25` possible keys to get the original message back.

### One time pad

The _one time pad_ (OTP) encryption is very simple and very hard to crack. The
_key_ for the OTP cipher is an array of numbers equal to the length of the
string. We rotate each text character according to the number in the key. It's
like the Caesar cipher, but each letter gets its own number to rotate by.

For example, using the following key

```js
const key = [
  4, 18, 5, 11, 11, 21, 12, 11, 21, 21, 13, 15, 19, 25, 25, 15, 3, 1, 25
]
```

our encrypted string would be

```js
const encrypted = 'qwje xz af ecz pxgdla, crpm.'
```

This is more secure: the attacker would have to try
`227373675443232059478759765625` different keys to find the correct one. If the
two parties agree on a very long key beforehand, they can then use it to
encrypt, send and decrypt all future messages securely.

The problem with the OTP cipher is that the key is the same size as the data,
and securely sharing it can be risky. Nevertheless, it is a good example of how
data can be encrypted so that only key holders can practically decrypt it.

## Modern encryption

### AES

The _Advanced Encryption Standard_ is a way of encrypting data that is highly
secure, very fast, and requires a resonably small key. It is hard to explain AES
in full detail here as it is quite complex, but as a high level summary, it
breaks the data up into chunks and puts the chunks in a grid, then does several
complex mathematical operations based on the key. Each of these operations is
reversible only if you know the key that was used to perform them.

In spirit, it's a lot like the Caesar cipher, just much more complex and secure.

With 256 bit encryption, there are
`115792089237316195423570985008687907853269984665640564039457584007913129639936`
possible different keys an attacker would have to try in order to decrypt the
data. A key is a binary string of 256 digits, e.g. `110100010101101010...` but
we would often encode this in another way (e.g. hex or base64).

With this set up

```js
const text = 'Meet me at the cinema, noon.'
const key = 'lsMAEy-a6eycWF02wvBMZarFiVOoPQ6N'
```

the AES cipher would give us

```js
const encrypted =
  '1f21df28c7c29370cd228b3416dc70afb4f9ec31f53932ee59faf041e9236e7d'
```

as the output.

### Semantic safety

One problem with this method is that the same input text will always give the
same encryption, meaning that an attacker can explore different inputs and
outputs to try and get information about our key. If you always sign off your
messages with `'Best wishes!'` then a pattern might start to emerge. Certain
parts of the encrypted text might start to become _meaningful_ (i.e. semantic).
Therefore, we want to establish _semantic safety_.

::: tip

Semantic safety is achieved when the same inputs into a cipher do not give the
same outputs. There is an element of randomness which prevents the encrypted
text from having any meaning.

:::

### Initialization vectors

An initialization vector is a random string which is generated each time a new
piece of data is to be encrypted. The vector is mixed in with the data before
encryption, ensuring that the output will be random even if the exact same data
is encrypted twice.

The initialization vector is allowed to be public, and it is often communicated
along with the encrypted data itself. Usually, it is stuck on the front with a
colon `:` to separate it from the encryption itself.

::: tip

The initialization vector should be **half** the length of the key. If we're
doing 256 bit encryption, the vector should be 128 bits.

:::

If we change our setup a bit, we get

```js
const text = 'Meet me at the cinema, noon.'
const key = 'lsMAEy-a6eycWF02wvBMZarFiVOoPQ6N'
const vector = 'rBDmasfZkI82bl98'
```

and the encryption becomes

```js
const encryption =
  'rBDmasfZkI82bl98:c929a836631bc83f7354c8a8254933f146b6c860d2a69bb5dc638f10db7c6c6a'
```

We can see the initialization vector stuck on the front. The audience would
split the encryption at the `:` to get the vector, and use that along with the
key to decrypt the message. With a different vector, we would get a completely
different encryption.

::: warning

Each time you encrypt a new piece of data, you must generate a new vector. You
can save and send the vector in any way you like. The audience will need the
vector and the key to decrypt. The purpose of the vector is to establish
_semantic safety_.

:::

### AES in JavaScript

Here we have an implementation in JS.

::: warning

Note that the key is saved in a separate `.env` file and is imported into our
code. We should never save the secret key directly in our code. We should never
commit our `.env` file containing secret keys.

:::

```js
require('dotenv').config()
const crypto = require('crypto')

// the env variable ENCRYPTION_KEY contains 32 random bytes (256 bits) as hex
// this is converted to a buffer (binary) to use as the secret key
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

// we are using the aes encryption algorithm
// with a 256 bit key
// cbc requires an initialization vector
const algo = 'aes-256-cbc'

function encrypt(plainText) {
  // initialization vector
  const iv = crypto.randomBytes(16)

  // cipher implements the aes algo with the key and IV
  const cipher = crypto.createCipheriv(algo, key, iv)

  // encrypt the text
  let encryptedText = cipher.update(plainText, 'utf8', 'hex')
  encryptedText += cipher.final('hex')

  // we prefix the encryption with the IV because we need to use the same IV
  // to decrypt it later on
  // it is ok for the IV to be public (but never the key)
  return iv.toString('hex') + ':' + encryptedText
}

function decrypt(encryptedData) {
  // split it into the IV which we prefixed
  // and the text we want to decrypt
  const parts = encryptedData.split(':')

  // turn the IV into a buffer (it is currently hex)
  const iv = Buffer.from(parts[0], 'hex')

  // this is the encrypted text we want to decrypt again
  const encryptedText = parts[1]

  // decipher the text and format as utf-8 so we can read it!
  const decipher = crypto.createDecipheriv(algo, key, iv)
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8')
  decryptedText += decipher.final('utf8')

  return decryptedText
}

module.exports = { encrypt, decrypt }
```

With these functions, we could now encrypt data on the way into the database,
and decrypt it when a request is made. This means that, even if our database is
stolen, all the attacker has access to is a bunch of unintelligible nonsense. If
they also got the secret key, however, we are in trouble!
