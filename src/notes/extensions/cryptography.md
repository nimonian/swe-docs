# Cryptography

Cryptography is the art of hiding information in such a way that it can only be retrieved by the intended audience. There are many, many different cryptography strategies. One of the oldest ones was used by Julius Caesar and is know as the *Caesar shift cypher*.

## Caesar shift

There is a convention in cryptography that the original text is lowercase, and the cyphertext is uppercase. Here is an example of a Caesar shifted message:

```js
const msg = 'hello this is a secret message'
const cyp = 'MJQQT YMNX NX F XJHWJY RJXXFLJ'
```

The cypher is produced by taking the alphabet and rotating it (shifting it) by 5 characters. In this case, the key is 5, but you can use any key. After rotating by 5, the alphabet looks like this:
```js
'abcdefghijklmnopqrstuvwxyz'
'FGHIJKLMNOPQRSTUVWXYZABCDE'
```
so `a` becomes `F` and `b` becomes `G` and so on. In order to decode the text, we need to figure out what the key is, and undo the rotation.

### Challenge

Fork the repo [here](https://github.com/si-mv/crypto-jamz).

Create two functions: `caesarEncode` and `caesarDecode`.

`caesarEncode` should accept two parameters: a string `msg` and a number `key`, and it should return the encrypted text.

`caesarDecode` should do the opposite: it should accept a string `cyp` and a number `key`, and it should return the decrypted text.

::: tip
Use your decode function to find out the secret message from this cypher:
```
y sekbt ru rekdt yd q dkjixubb qdt sekdj coiubv q aydw ev ydvydyju ifqsu
```
Bonus points if you can determine the author of the quote!
:::
