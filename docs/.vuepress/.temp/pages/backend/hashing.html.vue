<template><div><h1 id="hashing" tabindex="-1"><a class="header-anchor" href="#hashing" aria-hidden="true">#</a> Hashing</h1>
<p>The idea of hashing is quite simple: we take some data and scramble it up so it
is unrecognisable.</p>
<h2 id="properties-of-a-hashing-function" tabindex="-1"><a class="header-anchor" href="#properties-of-a-hashing-function" aria-hidden="true">#</a> Properties of a hashing function</h2>
<p>In order to be useful, a hashing function should satisfy certain properties.
We'll discuss these in turn.</p>
<h3 id="one-way" tabindex="-1"><a class="header-anchor" href="#one-way" aria-hidden="true">#</a> One way</h3>
<p>Unlike <a href="/backend/encryption">encryption</a>, a <em>hash</em> cannot be reversed. Once data
is hashed, the original data cannot be retrieved.</p>
<p>Although a secret key is sometimes used, the key cannot be used to &quot;decrypt&quot; the
hash. Once data is hashed, the original data is lost forever (unless it is saved
or remembered).</p>
<p>Hashing is often used for obscuring passwords saved in a database. Because the
passwords are hashed, even if the database is compromised and the passwords
leaked, nobody can use them to sign in because they've been scrambled, and the
password can't be figured out.</p>
<h3 id="deterministic" tabindex="-1"><a class="header-anchor" href="#deterministic" aria-hidden="true">#</a> Deterministic</h3>
<p>The same input data will always result in the same output hash. This is a good
thing, as it makes hashing useful for password protection.</p>
<p>This is a problem, however, for
<a href="/backend/encryption#semantic-safety">semantic safety</a> however. If lots of users
have the same popular password, e.g. <code v-pre>qwerty</code>, then an attacker might see the
same hash many times in our database and realise that this is <code v-pre>qwerty</code> and
therefore compromise several accounts at once.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Here are the internet's most popular passwords at the time of writing:</p>
<ol>
<li>123456</li>
<li>123456789</li>
<li>qwerty</li>
<li>password</li>
<li>12345</li>
<li>qwerty123</li>
<li>1q2w3e</li>
<li>12345678</li>
<li>111111</li>
<li>1234567890</li>
</ol>
<p>If you have used any of these, consider changing them!</p>
</div>
<p>To get around this problem, we use <a href="#salting">salting</a>, which we'll talk about
later.</p>
<h3 id="sensitive" tabindex="-1"><a class="header-anchor" href="#sensitive" aria-hidden="true">#</a> Sensitive</h3>
<p>If the input changes a little bit, the output changes completely.</p>
<p>For example, a hash might result in</p>
<ul>
<li><code v-pre>&quot;qwerty123&quot; -&gt; &quot;Yi2zDnUxvF2rKytfEsTnnEgWaYle7u2&quot;</code></li>
</ul>
<p>and the same hashing function to a slightly different input would give</p>
<ul>
<li><code v-pre>&quot;qwerty123&quot; -&gt; &quot;NfJARq7pOJGtbz/jawVwzF3llrhi1bk&quot;</code></li>
</ul>
<p>which is completely different. This prevents hackers from &quot;exploring&quot; our
hashing function to try and figure out the key.</p>
<h3 id="unrepresentative" tabindex="-1"><a class="header-anchor" href="#unrepresentative" aria-hidden="true">#</a> Unrepresentative</h3>
<p>The properties of the input shouldn't depend on the properties of the input. If
we hashed the single string <code v-pre>&quot;ok&quot;</code> we might get
<code v-pre>&quot;eIl/sPa/eYbfE06IS4BB2qTd6um9kci&quot;</code>; if we hashed the entire works of William
Shakespeare, we might get <code v-pre>&quot;u1eczrbxhHMGBAKcGJ9TZ7cq.ESwbGZ&quot;</code>. These have
exactly the same length and bear no relationship to the data they came from.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>In some ways, the hash of some data is like its <em>fingerprint</em>. It helps us
identify data when that data is presented to us, but on its own it tells us
nothing about the data it came from.</p>
</div>
<h2 id="salting" tabindex="-1"><a class="header-anchor" href="#salting" aria-hidden="true">#</a> Salting</h2>
<h3 id="computational-cost" tabindex="-1"><a class="header-anchor" href="#computational-cost" aria-hidden="true">#</a> Computational cost</h3>
<p>A popular algorithm used for encryption is <code v-pre>bcrypt</code>, based on the blowfish
algorithm. In JavaScript,</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bcrypt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> saltRounds <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">const</span> hashedPassword <span class="token operator">=</span> <span class="token keyword">await</span> bcrypt<span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span><span class="token string">'qwerty123'</span><span class="token punctuation">,</span> saltRounds<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <em>salt rounds</em> number in <code v-pre>bcrypt</code> tells us how many times the hashing
calculation is done. In this case, the calculation is done <code v-pre>2 ** 10 = 1024</code>
times. This is the <em>computational cost</em> of the hash function. This means the
<code v-pre>hash</code> function takes some time to excute, which is no problem when hashing a
single password, but makes a brute-force attack impossible, as hashing billions
of attempts would take many years.</p>
<h3 id="salt-value" tabindex="-1"><a class="header-anchor" href="#salt-value" aria-hidden="true">#</a> Salt value</h3>
<p>The output of the above hashing might look something like</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> hashed <span class="token operator">=</span> <span class="token string">'$2y$10$SV5DACmJsVVPkejogoW6aescb5ZV1jB9XuJUf/26cW5ooYAT2cKnu'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Although the <code v-pre>bcrypt</code> hash function is itself <a href="#deterministic">deterministic</a>,
if we were to run the code above again, we would get a completely different
hashed value. This is because bcrypt includes a 16 byte <em>salt</em> into the
algortithm. A bit like the
<a href="/backend/encryption#initialization-vectors">initialization vector</a> in
encryption, the salt is randomly generated each time the <code v-pre>hash</code> function is
called, and it is incorporated into each repetition of the algorithm to make
sure the output is random. This is why these repetitions are called &quot;salt
rounds&quot;.</p>
<p>It is fine for the salt to be made public: in fact, it is right there in the
hash itself!</p>
<p>If we take a look at the <code v-pre>hashed</code> value above, we can see that</p>
<ul>
<li><code v-pre>$2y</code> means the &quot;2Y blowfish&quot; algorithm was used</li>
<li><code v-pre>$10</code> means <code v-pre>10</code> salt rounds were used</li>
<li>The next 22 characters are the salt: <code v-pre>SV5DACmJsVVPkejogoW6ae</code></li>
<li>The rest is the actual hash: <code v-pre>scb5ZV1jB9XuJUf/26cW5ooYAT2cKnu</code></li>
</ul>
<h3 id="checking-passwords" tabindex="-1"><a class="header-anchor" href="#checking-passwords" aria-hidden="true">#</a> Checking passwords</h3>
<p>When a user sends us their password, we can</p>
<ol>
<li>extract the salt value</li>
<li>use it to re-hash the sent password</li>
<li>check the re-hash against the saved hash</li>
</ol>
<p>If the hashes match, we can allow the user to access their private data.
Importantly, we never save the actual password, we just make sure the user can
give us a password which produces the correct hash given the same salt value.</p>
<p>Another benefit of salting is that attackers can't create databases of unsalted
hashes and use those to reverse engineer people's passwords. These databases are
called rainbow tables and they have been computed for a large number of
passwords, algorithms and various static salt values.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Try googling <code v-pre>482c811da5d5b4bc6d497ffa98491e38</code> and see what you find.</p>
</div>
</div></template>


