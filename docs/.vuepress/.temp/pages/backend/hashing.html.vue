<template><div><h1 id="hashing" tabindex="-1"><a class="header-anchor" href="#hashing" aria-hidden="true">#</a> Hashing</h1>
<p>The idea of hashing is quite simple: we take some data and scramble it up so it
is unrecognisable.</p>
<p>A common hashing library in javascript is <code v-pre>bcrypt</code>. This is how we use it:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// import the library</span>
<span class="token keyword">const</span> bcrypt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span>

<span class="token comment">// suppose we want to obscure this password</span>
<span class="token keyword">const</span> password <span class="token operator">=</span> <span class="token string">'qwerty123'</span>

<span class="token comment">// we'll explain this later!</span>
<span class="token keyword">const</span> saltRounds <span class="token operator">=</span> <span class="token number">10</span>

<span class="token comment">// hash the password</span>
<span class="token keyword">const</span> hashedPassword <span class="token operator">=</span> <span class="token keyword">await</span> bcrypt<span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> saltRounds<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hashedPassword<span class="token punctuation">)</span>
<span class="token comment">// $2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="properties-of-a-hashing-function" tabindex="-1"><a class="header-anchor" href="#properties-of-a-hashing-function" aria-hidden="true">#</a> Properties of a hashing function</h2>
<p>In order to be useful, a hashing function should satisfy certain properties.
We'll discuss these in turn.</p>
<h3 id="one-way" tabindex="-1"><a class="header-anchor" href="#one-way" aria-hidden="true">#</a> One way</h3>
<p>Unlike <a href="/backend/encryption">encryption</a>, a <em>hash</em> cannot be reversed. Once data
is hashed, the original data cannot be retrieved.</p>
<p>There is no way to go from
<code v-pre>$2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW</code> back to the
original text <code v-pre>qwerty123</code>.</p>
<p>Although a secret is sometimes used to &quot;sign&quot; the hash, the secret cannot be
used to &quot;decrypt&quot; the hash. This is why we don't call it a <em>key</em>, as this would
suggest it could be used to access the hashed data again, which is not true.
Once data is hashed, the original data is lost forever (unless it is saved or
remembered).</p>
<p>Hashing is often used for obscuring passwords saved in a database. Because the
passwords are hashed, even if the database is compromised and the passwords
leaked, nobody can use them to sign in because they've been scrambled, and the
password can't be figured out.</p>
<h3 id="deterministic" tabindex="-1"><a class="header-anchor" href="#deterministic" aria-hidden="true">#</a> Deterministic</h3>
<p>The same input data will always result in the same output hash. This is a good
thing, as it makes hashing useful for password protection.</p>
<p>This is a problem, however, for
<a href="/backend/encryption#semantic-safety">semantic safety</a> however. If lots of users
have the same popular password, e.g. <code v-pre>qwerty123</code>, then an attacker might see the
same hash many times in our database and realise that this is <code v-pre>qwerty123</code> and
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
<li><code v-pre>&quot;qwerty123&quot; =&gt; &quot;$2y$10$AEBqzPKmF65TndeHVtTT7.Df1UFSD95BTigmv6BhcxYCl4Ad7qGiW&quot;</code></li>
</ul>
<p>and the same hashing function on a slightly different input would give</p>
<ul>
<li><code v-pre>&quot;qwerty124&quot; =&gt; &quot;$2y$10$4yJ5D8jI4P.HEp9hK3FVu.phl0PHDXNdoDp4z/FIoUHgtzT/q9rMq&quot;</code></li>
</ul>
<p>which is completely different. This prevents hackers from &quot;exploring&quot; our
hashing function to try and figure out passwords.</p>
<h3 id="unrepresentative" tabindex="-1"><a class="header-anchor" href="#unrepresentative" aria-hidden="true">#</a> Unrepresentative</h3>
<p>The properties of the input shouldn't depend on the properties of the input. If
we hashed the single string <code v-pre>&quot;ok&quot;</code> we might get
<code v-pre>&quot;eIl/sPa/eYbfE06IS4BB2qTd6um9kci&quot;</code>; if we hashed the entire works of William
Shakespeare, we might get <code v-pre>&quot;u1eczrbxhHMGBAKcGJ9TZ7cq.ESwbGZ&quot;</code>. These have
exactly the same length and bear no relationship to the data they came from.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>In some ways, the hash of some data is like its <em>fingerprint</em>. By looking at the
someone's fingerprint alone, you can't tell anything about the person it came
from. But if you have a record of their fingerprint, you can use it to identify
them.</p>
</div>
<h2 id="salting" tabindex="-1"><a class="header-anchor" href="#salting" aria-hidden="true">#</a> Salting</h2>
<h3 id="computational-cost" tabindex="-1"><a class="header-anchor" href="#computational-cost" aria-hidden="true">#</a> Computational cost</h3>
<p>Let's look again at our code using <code v-pre>bcrypt</code>.</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bcrypt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'bcrypt'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> saltRounds <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">const</span> hashedPassword <span class="token operator">=</span> <span class="token keyword">await</span> bcrypt<span class="token punctuation">.</span><span class="token function">hash</span><span class="token punctuation">(</span><span class="token string">'qwerty123'</span><span class="token punctuation">,</span> saltRounds<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <em>salt rounds</em> number in <code v-pre>bcrypt</code> tells us how many times the hashing
calculation is done. In this case, the calculation is done <code v-pre>2 ** 10 = 1024</code>
times. This is the <em>computational cost</em> of the hash function. Since it is
running &gt;1000 times, the <code v-pre>hash</code> function takes some time to excute. This is no
problem when hashing a single password, but makes a brute-force attack
impossible, as hashing billions of attempts would take many years.</p>
<h3 id="salt-value" tabindex="-1"><a class="header-anchor" href="#salt-value" aria-hidden="true">#</a> Salt value</h3>
<p>The output of the above hashing might look something like</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// hashedPassword:</span>
<span class="token string">'$2y$10$SV5DACmJsVVPkejogoW6aescb5ZV1jB9XuJUf/26cW5ooYAT2cKnu'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Although the <code v-pre>bcrypt</code> hash function is itself <a href="#deterministic">deterministic</a>,
if we were to run the code above again to hash the password, we would get a
completely different hashed value. This is because bcrypt includes a 16 byte
<em>salt</em> into the algortithm. Similar to the
<a href="/backend/encryption#initialization-vectors">initialization vector</a> in
encryption, the salt is randomly generated each time the <code v-pre>hash</code> function is
called, and it is incorporated into each repetition of the algorithm to make
sure the output is random. This is why these repetitions are called &quot;salt
rounds&quot;.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The salt value is some random bytes added to the data to make the data unique
before hashing.</p>
<p>Using a salt value means that hashing the same password twice will result in
different outputs.</p>
</div>
<p>It is fine for the salt to be made public: in fact, it is right there in the
hash itself!</p>
<p>Let's break down the hash into parts:</p>
<ul>
<li><code v-pre>$2y</code> means the &quot;2y crypt_blowfish&quot; algorithm was used</li>
<li><code v-pre>$10</code> means <code v-pre>10</code> salt rounds were used</li>
<li>The next 22 characters are the salt: <code v-pre>SV5DACmJsVVPkejogoW6ae</code></li>
<li>The rest is the actual hash: <code v-pre>scb5ZV1jB9XuJUf/26cW5ooYAT2cKnu</code></li>
</ul>
<p>The salt value used to hash the data is right there in the output of the <code v-pre>hash</code>
function. It does not matter if an attacker has access to this, it will not help
them reverse the hash and it will not harm the semantic safety of the outputs.</p>
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
<p>Try googling <code v-pre>3fc0a7acf087f549ac2b266baf94b8b1</code> and see what you find.</p>
</div>
<h2 id="other-uses-for-hashing" tabindex="-1"><a class="header-anchor" href="#other-uses-for-hashing" aria-hidden="true">#</a> Other uses for hashing</h2>
<p>Password storage isn't the only reason to hash data.</p>
<h3 id="data-integrity" tabindex="-1"><a class="header-anchor" href="#data-integrity" aria-hidden="true">#</a> Data integrity</h3>
<p>When you send someone some data, how can they be sure they are getting exactly
what you sent? Perhaps an attacker intercepted the data and tampered with it!</p>
<p>A solution is to send the data, and separately send a hash of the data (this
hash is sometimes referred to as a <em>checksum</em>). The audience can independently
hash the data on their end and check that it matches the checksum. If a single
bit of data had been changed at any point, the audience's hash would be
completely different from the checksum.</p>
<h3 id="caching" tabindex="-1"><a class="header-anchor" href="#caching" aria-hidden="true">#</a> Caching</h3>
<p>Imagine you have an api service which translates text from English into Klingon.
The process of translating the text uses an AI model and is expensive to do, so
we'd like to minimise the amount of actual translating.</p>
<p>Suppose someone sends</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">english</span><span class="token operator">:</span> <span class="token string">'Hello, Kronos! We are humans from planet Earth and we come in peace!'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>to our api for translation. Here's what we can do:</p>
<ol>
<li>Translate the English value into Klingon</li>
<li>Hash the English value to make a unique id</li>
<li>Save the English, Klingon and hash in our database</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// save to db</span>
<span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'8713af6d68e33aa39767a047da26f1d4'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">english</span><span class="token operator">:</span> <span class="token string">'Hello, Kronos! We are humans from planet Earth and we come in peace!'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">klingon</span><span class="token operator">:</span> <span class="token string">'Qo\'noS ta\'pu\' tIq! tera\'Daq chenpu\' yabwIj, qa\'pu\' chenmoHlu\'!'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, if someone requests to translate the exact same English string, we don't
need to actually translate it, we just search for its ID in the database and
return the data from there. This could be very powerful for something like an
image compression service, or an AI video analysis service.</p>
<p>This technique is sometimes called a <em>hash table</em> and it is also a very common
pattern for speeding up algorithms so that they don't need to expensively
compute the same values over and over again.</p>
</div></template>


