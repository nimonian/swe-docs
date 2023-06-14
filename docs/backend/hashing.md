# Hashing

The idea of hashing is quite simple: we take some data and scramble it up so it
is unrecognisable.

A common hashing library in javascript is `bcrypt`. This is how we use it:

```js
// import the library
const bcrypt = require('bcrypt')

// suppose we want to obscure this password
const password = 'qwerty123'

// we'll explain this later!
const saltRounds = 10

// hash the password
const hashedPassword = await bcrypt.hash(password, saltRounds)

console.log(hashedPassword)
// $2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW
```

## Properties of a hashing function

In order to be useful, a hashing function should satisfy certain properties.
We'll discuss these in turn.

### One way

Unlike [encryption](/backend/encryption), a _hash_ cannot be reversed. Once data
is hashed, the original data cannot be retrieved.

There is no way to go from
`$2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW` back to the
original text `qwerty123`.

Although a secret is sometimes used to "sign" the hash, the secret cannot be
used to "decrypt" the hash. This is why we don't call it a _key_, as this would
suggest it could be used to access the hashed data again, which is not true.
Once data is hashed, the original data is lost forever (unless it is saved or
remembered).

Hashing is often used for obscuring passwords saved in a database. Because the
passwords are hashed, even if the database is compromised and the passwords
leaked, nobody can use them to sign in because they've been scrambled, and the
password can't be figured out.

### Deterministic

The same input data will always result in the same output hash. This is a good
thing, as it makes hashing useful for password protection.

This is a problem, however, for
[semantic safety](/backend/encryption#semantic-safety) however. If lots of users
have the same popular password, e.g. `qwerty123`, then an attacker might see the
same hash many times in our database and realise that this is `qwerty123` and
therefore compromise several accounts at once.

::: tip

Here are the internet's most popular passwords at the time of writing:

1. 123456
1. 123456789
1. qwerty
1. password
1. 12345
1. qwerty123
1. 1q2w3e
1. 12345678
1. 111111
1. 1234567890

If you have used any of these, consider changing them!

:::

To get around this problem, we use [salting](#salting), which we'll talk about
later.

### Sensitive

If the input changes a little bit, the output changes completely.

For example, a hash might result in

- `"qwerty123" => "$2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW"`

and the same hashing function on a slightly different input would give

- `"qwerty124" => "$2y$10$4yJ5D8jI4P.HEp9hK3FVu.phl0PHDXNdoDp4z/FIoUHgtzT/q9rMq"`

which is completely different. This prevents hackers from "exploring" our
hashing function to try and figure out passwords.

### Unrepresentative

The properties of the input shouldn't depend on the properties of the input. If
we hashed the single string `"ok"` we might get
`"eIl/sPa/eYbfE06IS4BB2qTd6um9kci"`; if we hashed the entire works of William
Shakespeare, we might get `"u1eczrbxhHMGBAKcGJ9TZ7cq.ESwbGZ"`. These have
exactly the same length and bear no relationship to the data they came from.

::: tip

In some ways, the hash of some data is like its _fingerprint_. By looking at the
someone's fingerprint alone, you can't tell anything about the person it came
from. But if you have a record of their fingerprint, you can use it to identify
them.

:::

## Salting

### Computational cost

Let's look again at our code using `bcrypt`.

```js
const bcrypt = require('bcrypt')
const saltRounds = 10
const hashedPassword = await bcrypt.hash('qwerty123', saltRounds)
```

The _salt rounds_ number in `bcrypt` tells us how many times the hashing
calculation is done. In this case, the calculation is done `2 ** 10 = 1024`
times. This is the _computational cost_ of the hash function. Since it is
running >1000 times, the `hash` function takes some time to excute. This is no
problem when hashing a single password, but makes a brute-force attack
impossible, as hashing billions of attempts would take many years.

### Salt value

The output of the above hashing might look something like

```js
// hashedPassword:
'$2y$10$SV5DACmJsVVPkejogoW6aescb5ZV1jB9XuJUf/26cW5ooYAT2cKnu'
```

Although the `bcrypt` hash function is itself [deterministic](#deterministic),
if we were to run the code above again to hash the password, we would get a
completely different hashed value. This is because bcrypt includes a 16 byte
_salt_ into the algortithm. Similar to the
[initialization vector](/backend/encryption#initialization-vectors) in
encryption, the salt is randomly generated each time the `hash` function is
called, and it is incorporated into each repetition of the algorithm to make
sure the output is random. This is why these repetitions are called "salt
rounds".

::: tip

The salt value is some random bytes added to the data to make the data unique
before hashing.

Using a salt value means that hashing the same password twice will result in
different outputs.

:::

It is fine for the salt to be made public: in fact, it is right there in the
hash itself!

Let's break down the hash into parts:

- `$2y` means the "2y crypt_blowfish" algorithm was used
- `$10` means `10` salt rounds were used
- The next 22 characters are the salt: `SV5DACmJsVVPkejogoW6ae`
- The rest is the actual hash: `scb5ZV1jB9XuJUf/26cW5ooYAT2cKnu`

The salt value used to hash the data is right there in the output of the `hash`
function. It does not matter if an attacker has access to this, it will not help
them reverse the hash and it will not harm the semantic safety of the outputs.

### Checking passwords

When a user sends us their password, we can

1. extract the salt value
2. use it to re-hash the sent password
3. check the re-hash against the saved hash

If the hashes match, we can allow the user to access their private data.
Importantly, we never save the actual password, we just make sure the user can
give us a password which produces the correct hash given the same salt value.

Another benefit of salting is that attackers can't create databases of unsalted
hashes and use those to reverse engineer people's passwords. These databases are
called rainbow tables and they have been computed for a large number of
passwords, algorithms and various static salt values.

::: tip

Try googling `3fc0a7acf087f549ac2b266baf94b8b1` and see what you find.

:::

## Other uses for hashing

Password storage isn't the only reason to hash data.

### Data integrity

When you send someone some data, how can they be sure they are getting exactly
what you sent? Perhaps an attacker intercepted the data and tampered with it!

A solution is to send the data, and separately send a hash of the data (this
hash is sometimes referred to as a _checksum_). The audience can independently
hash the data on their end and check that it matches the checksum. If a single
bit of data had been changed at any point, the audience's hash would be
completely different from the checksum.

### Caching

Imagine you have an api service which translates text from English into Klingon.
The process of translating the text uses an AI model and is expensive to do, so
we'd like to minimise the amount of actual translating.

Suppose someone sends

```js
{
  english: 'Hello, Kronos! We are humans from planet Earth and we come in peace!'
}
```

to our api for translation. Here's what we can do:

1.  Translate the English value into Klingon
2.  Hash the English value to make a unique id
3.  Save the English, Klingon and hash in our database

```js
// save to db
{
  id: '8713af6d68e33aa39767a047da26f1d4',
  english: 'Hello, Kronos! We are humans from planet Earth and we come in peace!',
  klingon: 'Qo\'noS ta\'pu\' tIq! tera\'Daq chenpu\' yabwIj, qa\'pu\' chenmoHlu\'!'
}
```

Now, if someone requests to translate the exact same English string, we don't
need to actually translate it, we just search for its ID in the database and
return the data from there. This could be very powerful for something like an
image compression service, or an AI video analysis service.

This technique is sometimes called a _hash table_ and it is also a very common
pattern for speeding up algorithms so that they don't need to expensively
compute the same values over and over again.
