<template><div><h1 id="encryption" tabindex="-1"><a class="header-anchor" href="#encryption" aria-hidden="true">#</a> Encryption</h1>
<p>You probably use encryption every day without even thinking about it. Every time
you visit a website with <code v-pre>https</code>, all the data you send and receive is
encrypted. Every time you save senstive data in a database, it is likely
encrypted. Some tools allow you to encrypt the files saved on your computer.
Let's take a closer look at encryption so we can appreciate how it works.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><em>Encryption</em> is a way of obscuring data so that the original data can be
retrieved again.</p>
<p>The process of getting the original data back is called <em>decryption</em>.</p>
<p>It is usually done to hide data for security reasons, so that only the intended
audience can read it.</p>
</div>
<h2 id="simple-encryption" tabindex="-1"><a class="header-anchor" href="#simple-encryption" aria-hidden="true">#</a> Simple encryption</h2>
<p>The methods presented here are historically interesting and will introduce to
the main ideas of encryption, but should never be relied upon to properly secure
data.</p>
<h3 id="caesar-cipher" tabindex="-1"><a class="header-anchor" href="#caesar-cipher" aria-hidden="true">#</a> Caesar cipher</h3>
<p>Let's imagine we have a string we want to encrypt:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token string">'Meet me at the cinema, noon.'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>A very basic method of encryption would be a Caesar encryption. We choose a
number, for example <code v-pre>3</code>, and <em>rotate</em> each character in the string through the
alphabet by <code v-pre>3</code> places.</p>
<p>For example, if we rotate the first letter of our string by <code v-pre>3</code> places, we get
<code v-pre>&quot;M&quot; =&gt; &quot;P&quot;</code>. If we rotate every character in our string by <code v-pre>3</code> places, we get</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> encrypted <span class="token operator">=</span> <span class="token string">'Phhw ph dw wkh flqhpd, qrrq.'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>So long as our audience knows that <code v-pre>3</code> was used as the key, they can easily
rotate the letters back again to get the original data.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The number <code v-pre>3</code> in this instance is called the <em>key</em>. A key is a piece of
information that we somehow use to encrypt the data, and that the audience can
then use to decrypt it.</p>
</div>
<p>The problem with the Caesar cypher is that it is very easy to crack. An attacker
only needs to try <code v-pre>25</code> possible keys to get the original message back.</p>
<h3 id="one-time-pad" tabindex="-1"><a class="header-anchor" href="#one-time-pad" aria-hidden="true">#</a> One time pad</h3>
<p>The <em>one time pad</em> (OTP) encryption is very simple and very hard to crack. The
<em>key</em> for the OTP cipher is an array of numbers equal to the length of the
string. We rotate each text character according to the number in the key. It's
like the Caesar cipher, but each letter gets its own number to rotate by.</p>
<p>For example, using the following key</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">25</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>our encrypted string would be</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> encrypted <span class="token operator">=</span> <span class="token string">'qwje xz af ecz pxgdla, crpm.'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This is more secure: the attacker would have to try
<code v-pre>227373675443232059478759765625</code> different keys to find the correct one. If the
two parties agree on a very long key beforehand, they can then use it to
encrypt, send and decrypt all future messages securely.</p>
<p>The problem with the OTP cipher is that the key is the same size as the data,
and securely sharing it can be risky. Nevertheless, it is a good example of how
data can be encrypted so that only key holders can practically decrypt it.</p>
<h2 id="modern-encryption" tabindex="-1"><a class="header-anchor" href="#modern-encryption" aria-hidden="true">#</a> Modern encryption</h2>
<h3 id="aes" tabindex="-1"><a class="header-anchor" href="#aes" aria-hidden="true">#</a> AES</h3>
<p>The <em>Advanced Encryption Standard</em> is a way of encrypting data that is highly
secure, very fast, and requires a resonably small key. It is hard to explain AES
in full detail here as it is quite complex, but as a high level summary, it
breaks the data up into chunks and puts the chunks in a grid, then does several
complex mathematical operations based on the key. Each of these operations is
reversible only if you know the key that was used to perform them.</p>
<p>In spirit, it's a lot like the Caesar cipher, just much more complex and secure.</p>
<p>With 256 bit encryption, there are
<code v-pre>115792089237316195423570985008687907853269984665640564039457584007913129639936</code>
possible different keys an attacker would have to try in order to decrypt the
data. A key is a binary string of 256 digits, e.g. <code v-pre>110100010101101010...</code> but
we would often encode this in another way (e.g. hex or base64).</p>
<p>With this set up</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token string">'Meet me at the cinema, noon.'</span>
<span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token string">'lsMAEy-a6eycWF02wvBMZarFiVOoPQ6N'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>the AES cipher would give us</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> encrypted <span class="token operator">=</span>
  <span class="token string">'1f21df28c7c29370cd228b3416dc70afb4f9ec31f53932ee59faf041e9236e7d'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>as the output.</p>
<h3 id="semantic-safety" tabindex="-1"><a class="header-anchor" href="#semantic-safety" aria-hidden="true">#</a> Semantic safety</h3>
<p>One problem with this method is that the same input text will always give the
same encryption, meaning that an attacker can explore different inputs and
outputs to try and get information about our key. If you always sign off your
messages with <code v-pre>'Best wishes!'</code> then a pattern might start to emerge. Certain
parts of the encrypted text might start to become <em>meaningful</em> (i.e. semantic).
Therefore, we want to establish <em>semantic safety</em>.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Semantic safety is achieved when the same inputs into a cipher do not give the
same outputs. There is an element of randomness which prevents the encrypted
text from having any meaning.</p>
</div>
<h3 id="initialization-vectors" tabindex="-1"><a class="header-anchor" href="#initialization-vectors" aria-hidden="true">#</a> Initialization vectors</h3>
<p>An initialization vector is a random string which is generated each time a new
piece of data is to be encrypted. The vector is mixed in with the data before
encryption, ensuring that the output will be random even if the exact same data
is encrypted twice.</p>
<p>The initialization vector is allowed to be public, and it is often communicated
along with the encrypted data itself. Usually, it is stuck on the front with a
colon <code v-pre>:</code> to separate it from the encryption itself.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The initialization vector should be <strong>half</strong> the length of the key. If we're
doing 256 bit encryption, the vector should be 128 bits.</p>
</div>
<p>If we change our setup a bit, we get</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token string">'Meet me at the cinema, noon.'</span>
<span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token string">'lsMAEy-a6eycWF02wvBMZarFiVOoPQ6N'</span>
<span class="token keyword">const</span> vector <span class="token operator">=</span> <span class="token string">'rBDmasfZkI82bl98'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>and the encryption becomes</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> encryption <span class="token operator">=</span>
  <span class="token string">'rBDmasfZkI82bl98:c929a836631bc83f7354c8a8254933f146b6c860d2a69bb5dc638f10db7c6c6a'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>We can see the initialization vector stuck on the front. The audience would
split the encryption at the <code v-pre>:</code> to get the vector, and use that along with the
key to decrypt the message. With a different vector, we would get a completely
different encryption.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Each time you encrypt a new piece of data, you must generate a new vector. You
can save and send the vector in any way you like. The audience will need the
vector and the key to decrypt. The purpose of the vector is to establish
<em>semantic safety</em>.</p>
</div>
<h3 id="aes-in-javascript" tabindex="-1"><a class="header-anchor" href="#aes-in-javascript" aria-hidden="true">#</a> AES in JavaScript</h3>
<p>Here we have an implementation in JS.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Note that the key is saved in a separate <code v-pre>.env</code> file and is imported into our
code. We should never save the secret key directly in our code. We should never
commit our <code v-pre>.env</code> file containing secret keys.</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'dotenv'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> crypto <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'crypto'</span><span class="token punctuation">)</span>

<span class="token comment">// the env variable ENCRYPTION_KEY contains 32 random bytes (256 bits) as hex</span>
<span class="token comment">// this is converted to a buffer (binary) to use as the secret key</span>
<span class="token keyword">const</span> key <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ENCRYPTION_KEY</span><span class="token punctuation">,</span> <span class="token string">'hex'</span><span class="token punctuation">)</span>

<span class="token comment">// we are using the aes encryption algorithm</span>
<span class="token comment">// with a 256 bit key</span>
<span class="token comment">// cbc requires an initialization vector</span>
<span class="token keyword">const</span> algo <span class="token operator">=</span> <span class="token string">'aes-256-cbc'</span>

<span class="token keyword">function</span> <span class="token function">encrypt</span><span class="token punctuation">(</span><span class="token parameter">plainText</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// initialization vector</span>
  <span class="token keyword">const</span> iv <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">randomBytes</span><span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">)</span>

  <span class="token comment">// cipher implements the aes algo with the key and IV</span>
  <span class="token keyword">const</span> cipher <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">createCipheriv</span><span class="token punctuation">(</span>algo<span class="token punctuation">,</span> key<span class="token punctuation">,</span> iv<span class="token punctuation">)</span>

  <span class="token comment">// encrypt the text</span>
  <span class="token keyword">let</span> encryptedText <span class="token operator">=</span> cipher<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>plainText<span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">,</span> <span class="token string">'hex'</span><span class="token punctuation">)</span>
  encryptedText <span class="token operator">+=</span> cipher<span class="token punctuation">.</span><span class="token function">final</span><span class="token punctuation">(</span><span class="token string">'hex'</span><span class="token punctuation">)</span>

  <span class="token comment">// we prefix the encryption with the IV because we need to use the same IV</span>
  <span class="token comment">// to decrypt it later on</span>
  <span class="token comment">// it is ok for the IV to be public (but never the key)</span>
  <span class="token keyword">return</span> iv<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'hex'</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">':'</span> <span class="token operator">+</span> encryptedText
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">decrypt</span><span class="token punctuation">(</span><span class="token parameter">encryptedData</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// split it into the IV which we prefixed</span>
  <span class="token comment">// and the text we want to decrypt</span>
  <span class="token keyword">const</span> parts <span class="token operator">=</span> encryptedData<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">':'</span><span class="token punctuation">)</span>

  <span class="token comment">// turn the IV into a buffer (it is currently hex)</span>
  <span class="token keyword">const</span> iv <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>parts<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">'hex'</span><span class="token punctuation">)</span>

  <span class="token comment">// this is the encrypted text we want to decrypt again</span>
  <span class="token keyword">const</span> encryptedText <span class="token operator">=</span> parts<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

  <span class="token comment">// decipher the text and format as utf-8 so we can read it!</span>
  <span class="token keyword">const</span> decipher <span class="token operator">=</span> crypto<span class="token punctuation">.</span><span class="token function">createDecipheriv</span><span class="token punctuation">(</span>algo<span class="token punctuation">,</span> key<span class="token punctuation">,</span> iv<span class="token punctuation">)</span>
  <span class="token keyword">let</span> decryptedText <span class="token operator">=</span> decipher<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>encryptedText<span class="token punctuation">,</span> <span class="token string">'hex'</span><span class="token punctuation">,</span> <span class="token string">'utf-8'</span><span class="token punctuation">)</span>
  decryptedText <span class="token operator">+=</span> decipher<span class="token punctuation">.</span><span class="token function">final</span><span class="token punctuation">(</span><span class="token string">'utf8'</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> decryptedText
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> encrypt<span class="token punctuation">,</span> decrypt <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With these functions, we could now encrypt data on the way into the database,
and decrypt it when a request is made. This means that, even if our database is
stolen, all the attacker has access to is a bunch of unintelligible nonsense. If
they also got the secret key, however, we are in trouble!</p>
</div></template>


