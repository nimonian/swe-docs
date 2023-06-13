<template><div><h1 id="tokens" tabindex="-1"><a class="header-anchor" href="#tokens" aria-hidden="true">#</a> Tokens</h1>
<p>If a user needed to type their email and password every time they wanted to
request something from the server, they would very quickly stop using the app.
We want to <strong>authenticate once</strong> with email and password, and then <strong>authorise</strong>
further requests without authenticating again.</p>
<p>A very common implementation of this strategy is <em>javascript web tokens</em>.</p>
<h2 id="what-are-jwts" tabindex="-1"><a class="header-anchor" href="#what-are-jwts" aria-hidden="true">#</a> What are JWTs?</h2>
<p>Instead of username and password, we give each user a special token to prove
their identity. These look like</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> token <span class="token operator">=</span>
  <span class="token string">'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMDI3MzR9.zNYcb1c9v8EO-oszD8cs4LDEzuS-epfQINWHfwQ48SI'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>A user tells us their username and password once, and in return they get a token
like this. Then, whenever they want to access a protected resource, they show us
this token.</p>
<p>If we split this at the full stops <code v-pre>.</code> we get three parts:</p>
<ul>
<li>
<p><strong>Header:</strong> The first part <code v-pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</code> is called
the header, and is a Base 64 encoding of some metadata about the token.</p>
</li>
<li>
<p><strong>Payload:</strong> The middle part
<code v-pre>eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMDI3MzR9</code> is the payload. It is a
Base 64 encoding of an object of data about the user, such as their name,
along with the time at which the token was made.</p>
</li>
<li>
<p><strong>Signature:</strong> The last part <code v-pre>zNYcb1c9v8EO-oszD8cs4LDEzuS-epfQINWHfwQ48SI</code> is
called the signature. We'll talk about that shortly!</p>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Use the <code v-pre>atob()</code> function in the browser, or <code v-pre>Buffer.from()</code> in node, to decode
the payload from Base64 into a readable string. See what you get!</p>
</div>
<h3 id="making-id-tokens" tabindex="-1"><a class="header-anchor" href="#making-id-tokens" aria-hidden="true">#</a> Making id tokens</h3>
<p>Let's say one of our users is called Morpheus and we want to use his name
<code v-pre>morpheus</code> as a token. Well, this is dumb. Anbody could send us the word
<code v-pre>morpheus</code> and get access to Morpheus' secrets.</p>
<p>Maybe we could hash the word <code v-pre>morpheus</code> on the server and add that to the token?
We'll use an algorithm I just invented called <code v-pre>stupidHash()</code>:</p>
<ol>
<li>Map each letter to its position in the alphabet (e.g m =&gt; 13)</li>
<li>Multiply the numbers together</li>
</ol>
<p>We get the hash <code v-pre>896313600</code>. Now, when Morpheus gives us his password, we send a
token <code v-pre>morpheus.896313600</code> to our user on the frontend. A few minutes later, a
user sends it back to us, and says &quot;Hey, I got this special token you made for
me! Can I have Morpheus' secret document from the database?&quot;</p>
<p>This is better, but if an attacker knew our algorithm, they could take the
username <code v-pre>morpheus</code> and work out the hash <code v-pre>896313600</code> and now they have the
exact same token. Damn.</p>
<h3 id="signing-tokens" tabindex="-1"><a class="header-anchor" href="#signing-tokens" aria-hidden="true">#</a> Signing tokens</h3>
<p>Well, what if we chose a <code v-pre>SECRET_PHRASE</code> and kept that on the server? If we
appended this to the username before hashing it, the result is called a
<strong>signature</strong>. When we maintain a secret and mix it in with some data before
hashing it, this is called <strong>signing</strong> the data.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>We use a secret key to <em>sign</em> the token. Signing the token means we hide
something in the token which comes uniquely from our server. When the token is
given back to us, we can be certain that it was signed by our server, and is
therefore an authentic token.</p>
</div>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// server.js</span>
<span class="token keyword">const</span> <span class="token constant">SECRET_PHRASE</span> <span class="token operator">=</span> <span class="token string">'thereisnospoon'</span>
<span class="token keyword">const</span> signature <span class="token operator">=</span> <span class="token function">stupidHash</span><span class="token punctuation">(</span><span class="token string">'morpheus'</span> <span class="token operator">+</span> <span class="token constant">SECRET_PHRASE</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> token <span class="token operator">=</span> <span class="token string">'morpheus'</span> <span class="token operator">+</span> <span class="token string">'.'</span> <span class="token operator">+</span> signature
<span class="token comment">// morpheus.281661577413970231296000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, even if a hacker knew the username <code v-pre>morpheus</code> and the <code v-pre>stupidHash()</code>
algorithm, they wouldn't be able to replicate Morpheus' token, because they
don't know the secret phrase! So, if someone gives the token
<code v-pre>morpheus.281661577413970231296000</code> back to the server, we know it must be
Morpheus. (This assumes the token hasn't been stolen from Morpheus, which is a
different matter.)</p>
<p>This is the right idea, but it is also a terrible algorithm - it could easily be
hacked by brute force.</p>
<h3 id="so-what-are-jwts" tabindex="-1"><a class="header-anchor" href="#so-what-are-jwts" aria-hidden="true">#</a> So what are JWTs?</h3>
<p>A JWT is formed by taking a javascript object such as</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'morpheus'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">iat</span><span class="token operator">:</span> <span class="token string">'1653102734'</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>and signing it with a large, random secret string. The hashing algorithm is much
better than stupidHash (usually SHA256). The <code v-pre>iat</code> property stands for <em>issued
at</em> and is the time at which the token was generated (in
<a href="https://www.codingem.com/epoch-time/" target="_blank" rel="noopener noreferrer">epoch seconds<ExternalLinkIcon/></a>).</p>
<h2 id="working-with-jwts" tabindex="-1"><a class="header-anchor" href="#working-with-jwts" aria-hidden="true">#</a> Working with JWTs</h2>
<h3 id="generating-jwts" tabindex="-1"><a class="header-anchor" href="#generating-jwts" aria-hidden="true">#</a> Generating JWTs</h3>
<p>The npm library <a href="https://www.npmjs.com/package/jsonwebtoken" target="_blank" rel="noopener noreferrer">jsonwebtoken<ExternalLinkIcon/></a> can
sign JWTs with a secret for us. It will also add an <code v-pre>iat</code> value for us so we
don't need to calculate that. We should <code v-pre>npm i jsonwebtoken</code> and then</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> jwt <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'jsonwebtoken'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'morpheus'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">'thereisnospoon'</span><span class="token punctuation">)</span>
<span class="token comment">// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9ycGhldXMiLCJpYXQiOjE2NTMxMjE0MjZ9.d-U-OdG1eTVhfBeX9yJK8rbSeGyDg00wx4M1it3qDbc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Of course, <code v-pre>'thereisnospoon'</code> is a poor secret - we should generate a large
random string (256 bits or 32 bytes) and store it as an environment variable so
we can use it in our code without hard-coding it in:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'dotenv'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'morpheus'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">TOKEN_SECRET</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="the-jwt-flow" tabindex="-1"><a class="header-anchor" href="#the-jwt-flow" aria-hidden="true">#</a> The JWT flow</h3>
<p>The whole flow looks like this:</p>
<ol>
<li>
<p>A user sends their username and password to a server endpoint such as
<code v-pre>/api/v1/login</code></p>
</li>
<li>
<p>The server checks the username and password against the hash in our database
with <code v-pre>bcypt.compare()</code></p>
</li>
<li>
<p>If successful, the server signs an object containing some identifying
information for the user, thus creating a JWT. The object in the payload
should <strong>not</strong> contain the password or the hashed password for the user.</p>
</li>
<li>
<p>The server sends this JWT to the user and the frontend stores it in
<code v-pre>localStorage</code> or as a cookie.</p>
</li>
<li>
<p>If the user needs to access a protected resource, they send the JWT. The
server uses <code v-pre>jwt.verify()</code> to check that the token was signed with our
secret and that the payload hasn't been tampered.</p>
</li>
<li>
<p>If the token is authentic, we grant access to the protected resource.</p>
</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The process of checking the token with <code v-pre>jwt.verify()</code> could be written in a
middleware function so it can be dropped in to any protected resource.</p>
</div>
<h2 id="refresh-tokens" tabindex="-1"><a class="header-anchor" href="#refresh-tokens" aria-hidden="true">#</a> Refresh tokens</h2>
<p>The JWT we made above and sent to the user is called an <strong>access token</strong>. The
problem with our method so far is that, if our access token got stolen, it gives
the thief unlimited access to secrets on the server.</p>
<h3 id="expiring-tokens" tabindex="-1"><a class="header-anchor" href="#expiring-tokens" aria-hidden="true">#</a> Expiring tokens</h3>
<p>For this reason, when we create a token, we should make it expire. In practice,
tokens usually expire after about <code v-pre>1h</code> (depending on security needs), but we
will make ours expire after <code v-pre>30s</code> to make testing easier:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> access_token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'morpheus'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">TOKEN_SECRET</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">expiresIn</span><span class="token operator">:</span> <span class="token string">'30s'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, if we try to use this token after 31 seconds, it will not work and
<code v-pre>jwt.verify()</code> will fail. This is great - if the token gets stolen, the damage
the thief can do is mitigated.</p>
<p>So does the user have to send us their password every time the token expires?
No - this is where <strong>refresh tokens</strong> come in.</p>
<ol>
<li>
<p>When the user first sends their password to authenticate with the server, we
create two tokens: one which expires called the <code v-pre>access_token</code>, and another
which does not expire called the <code v-pre>refresh_token</code>.</p>
</li>
<li>
<p>We save the refresh token in a list of <code v-pre>validRefreshTokens</code> on the server
(ideally in a database) but an array will do for now.</p>
</li>
<li>
<p>We send them both back to the user, and the user uses the access token to
get secrets from the server until it expires.</p>
</li>
<li>
<p>Now, if the user needs a new <code v-pre>access_token</code>, they can send their refresh
token to an api endpoint such as <code v-pre>/api/v1/refresh</code> - if the token is
verified as authentic, and if it is in the list of valid tokens, then we
grant a new <code v-pre>access_token</code>.</p>
</li>
</ol>
<p>When the user wants to sign out, we remove their refresh token from the list of
valid refresh tokens.</p>
</div></template>


