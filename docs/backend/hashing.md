# Hashing

The idea of hashing is quite simple: we take some data and scramble it up so it
is unrecognisable.

## Properties of a hashing function

In order to be useful, a hashing function should satisfy certain properties.
We'll discuss these in turn.

### One way

Unlike [encryption](/backend/encryption), a _hash_ cannot be reversed. Once data
is hashed, the original data cannot be retrieved.

Although a secret key is sometimes used, the key cannot be used to "decrypt" the
hash. Once data is hashed, the original data is lost forever (unless it is saved
or remembered).

Hashing is often used for obscuring passwords saved in a database. Because the
passwords are hashed, even if the database is compromised and the passwords
leaked, nobody can use them to sign in because they've been scrambled, and the
password can't be figured out.

### Deterministic

The same input data will always result in the same output hash. This is a good
thing, as it makes hashing useful for password protection.

This is a problem, however, for
[semantic safety](/backend/encryption#semantic-safety) however. If lots of users
have the same popular password, e.g. `qwerty`, then an attacker might see the
same hash many times in our database and realise that this is `qwerty` and
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

- `"qwerty123" -> "Yi2zDnUxvF2rKytfEsTnnEgWaYle7u2"`

and the same hashing function to a slightly different input would give

- `"qwerty123" -> "NfJARq7pOJGtbz/jawVwzF3llrhi1bk"`

which is completely different. This prevents hackers from "exploring" our
hashing function to try and figure out the key.

### Unrepresentative

The properties of the input shouldn't depend on the properties of the input. If
we hashed the single string `"ok"` we might get
`"eIl/sPa/eYbfE06IS4BB2qTd6um9kci"`; if we hashed the entire works of William
Shakespeare, we might get `"u1eczrbxhHMGBAKcGJ9TZ7cq.ESwbGZ"`. These have
exactly the same length and bear no relationship to the data they came from.

::: tip

In some ways, the hash of some data is like its _fingerprint_. It helps us
identify data when that data is presented to us, but on its own it tells us
nothing about the data it came from.

:::

## Salting

### Computational cost

A popular algorithm used for encryption is `bcrypt`, based on the blowfish
algorithm. In JavaScript,

```js
const bcrypt = require('bcrypt')
const saltRounds = 10
const hashedPassword = await bcrypt.hash('qwerty123', saltRounds)
```

The _salt rounds_ number in `bcrypt` tells us how many times the hashing
calculation is done. In this case, the calculation is done `2 ** 10 = 1024`
times. This is the _computational cost_ of the hash function. This means the
`hash` function takes some time to excute, which is no problem when hashing a
single password, but makes a brute-force attack impossible, as hashing billions
of attempts would take many years.

### Salt value

The output of the above hashing might look something like

```js
const hashed = '$2y$10$SV5DACmJsVVPkejogoW6aescb5ZV1jB9XuJUf/26cW5ooYAT2cKnu'
```

Although the `bcrypt` hash function is itself [deterministic](#deterministic),
if we were to run the code above again, we would get a completely different
hashed value. This is because bcrypt includes a 16 byte _salt_ into the
algortithm. A bit like the
[initialization vector](/backend/encryption#initialization-vectors) in
encryption, the salt is randomly generated each time the `hash` function is
called, and it is incorporated into each repetition of the algorithm to make
sure the output is random. This is why these repetitions are called "salt
rounds".

It is fine for the salt to be made public: in fact, it is right there in the
hash itself!

If we take a look at the `hashed` value above, we can see that

- `$2y` means the "2Y blowfish" algorithm was used
- `$10` means `10` salt rounds were used
- The next 22 characters are the salt: `SV5DACmJsVVPkejogoW6ae`
- The rest is the actual hash: `scb5ZV1jB9XuJUf/26cW5ooYAT2cKnu`

### Checking passwords

When a user sends us their password, we can

1.  extract the salt value
2.  use it to re-hash the sent password
3.  check the re-hash against the saved hash

If the hashes match, we can allow the user to access their private data.
Importantly, we never save the actual password, we just make sure the user can
give us a password which produces the correct hash given the same salt value.

Another benefit of salting is that attackers can't create databases of unsalted
hashes and use those to reverse engineer people's passwords. These databases are
called rainbow tables and they have been computed for a large number of
passwords, algorithms and various static salt values.

::: tip

Try googling `482c811da5d5b4bc6d497ffa98491e38` and see what you find.

:::
