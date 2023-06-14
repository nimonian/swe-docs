<template><div><h1 id="securing-apis-with-basic-auth" tabindex="-1"><a class="header-anchor" href="#securing-apis-with-basic-auth" aria-hidden="true">#</a> Securing APIs with Basic Auth</h1>
<h2 id="on-the-frontend" tabindex="-1"><a class="header-anchor" href="#on-the-frontend" aria-hidden="true">#</a> On the frontend</h2>
<p>Basic Auth requires a user to send their username and password to the server in
order to access protected resources.</p>
<p>The first thing for us to understand, is how to encode in Base 64.</p>
<h3 id="encoding-to-base-64-in-dev-tools" tabindex="-1"><a class="header-anchor" href="#encoding-to-base-64-in-dev-tools" aria-hidden="true">#</a> Encoding to Base 64 in dev tools</h3>
<p>If you open developer tools in your browser, you can use</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">btoa</span><span class="token punctuation">(</span><span class="token string">'My cool string!'</span><span class="token punctuation">)</span>
<span class="token comment">// 'TXkgY29vbCBzdHJpbmch'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>to get the Base 64 encoding, and then</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">atob</span><span class="token punctuation">(</span><span class="token string">'TXkgY29vbCBzdHJpbmch'</span><span class="token punctuation">)</span>
<span class="token comment">// 'My cool string!'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>to get the string back.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Question: What is brown and sticky?</p>
<p>Answer: QSBzdGljayE</p>
</div>
<h3 id="encoding-to-base-64-in-node" tabindex="-1"><a class="header-anchor" href="#encoding-to-base-64-in-node" aria-hidden="true">#</a> Encoding to Base 64 in Node</h3>
<p>We don't have access to <code v-pre>atob()</code> in Node. It's a bit more complicated, but we
can do it like this:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// To encode in Base 64:</span>
<span class="token keyword">const</span> encoded <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'Admit it...'</span><span class="token punctuation">,</span> <span class="token string">'utf-8'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'base64'</span><span class="token punctuation">)</span>
<span class="token comment">// To decode again:</span>
<span class="token keyword">const</span> decoded <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>
  <span class="token string">'eW91IGxhdWdoZWQgYXQgdGhlIHN0aWNrIGpva2U='</span><span class="token punctuation">,</span>
  <span class="token string">'base64'</span>
<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'utf-8'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Question: What do you call a deer with no eyes?</p>
<p>Answer: Tm8gaWRlYS4uLg</p>
<p>🤣</p>
</div>
<h3 id="using-the-authorization-basic-header" tabindex="-1"><a class="header-anchor" href="#using-the-authorization-basic-header" aria-hidden="true">#</a> Using the Authorization: Basic header</h3>
<p>Let's suppose the user <code v-pre>mickey_m</code> has password <code v-pre>HeyPluto!123</code>. In order to send
the user's credentials to our api on the backend, we would encode the string
<code v-pre>mickey_m:HeyPluto!123</code> in Base 64 and then send it in the <code v-pre>Authorization</code>
header of a POST request. If you're using the Fetch API, here's how the
<code v-pre>headers</code> object would look</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token string-property property">'Authorization'</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Bearer </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token function">toBase64</span><span class="token punctuation">(</span><span class="token string">'mickey_m:HeyPluto!123'</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>where <code v-pre>toBase64</code> is a function you would need to write using what we've learned.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Note that Base 64 encoding is <strong>not an encryption method</strong>. Anybody who gets a
string in Base 64 can trivially convert it back to something they can read.</p>
</div>
<p>Again, Base 64 is <em>not encryption</em> and <em>not secure</em>. It just means that if
someone looks at the header with their eyes (for example if the whole request
object is logged to a file somewhere on the server, an innocent but dangerous
mistake) the reader can't immediately see the username and password. They might
not even realise it <em>is</em> a username and password. It's an example of &quot;security
through obscurity&quot;.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The real reason it is safe to send credentials in the <code v-pre>Authorization</code> header of
the http request is not because of Base 64 encoding, but because of <strong>https</strong>.
This means that the http request is properly encrypted before sending.</p>
<p>We send credentials in the header because <code v-pre>GET</code> requests should never include a
body. It also separates concerns: the body is for <strong>application data</strong> (i.e.
creating and modifying resources on the server); whereas the headers are for
<strong>metadata</strong>, including the authentication details.</p>
</div>
<p>With the <code v-pre>Authorization</code> header properly set with the encoded username and
password, we can make our authenticated http request to the server.</p>
<h2 id="on-the-backend" tabindex="-1"><a class="header-anchor" href="#on-the-backend" aria-hidden="true">#</a> On the backend</h2>
<h3 id="parsing-the-auth-header" tabindex="-1"><a class="header-anchor" href="#parsing-the-auth-header" aria-hidden="true">#</a> Parsing the auth header</h3>
<p>Let's suppose an api endpoint <code v-pre>GET api/v1/secret</code> should be only accessible by
authenticated users. If we send a request to this endpoint with the basic
authorization header, we can handle it on the back end and respond
appropriately.</p>
<p>The first step is to get the encoded credentials out of the authentication
header and parse it back into the email and password. We can then verify the
credentials before sending back any sensitive data.</p>
<h3 id="securing-an-endpoint" tabindex="-1"><a class="header-anchor" href="#securing-an-endpoint" aria-hidden="true">#</a> Securing an endpoint</h3>
<p>Here is an example based on express.js:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/api/v1/secret'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// get the auth header, e.g. "Bearer bWlja2V5X206SGV5UGx1dG8hMTIz"</span>
  <span class="token keyword">const</span> authHeader <span class="token operator">=</span> req<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>authorization

  <span class="token comment">// make sure it is formatted correctly</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>authHeader <span class="token operator">||</span> <span class="token operator">!</span>authHeader<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'Basic '</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token string">'Unauthorized'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// split off the credential, i.e. "bWlja2V5X206SGV5UGx1dG8hMTIz"</span>
  <span class="token keyword">const</span> encodedCredentials <span class="token operator">=</span> authHeader<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>

  <span class="token comment">// decode it - in this e.g. we get "mickey_m:HeyPluto!123"</span>
  <span class="token keyword">const</span> decodedCredentials <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>encodedCredentials<span class="token punctuation">,</span> <span class="token string">'base64'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span>
    <span class="token string">'utf-8'</span>
  <span class="token punctuation">)</span>

  <span class="token comment">// split credential at ":" to separate username and password</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>email<span class="token punctuation">,</span> password<span class="token punctuation">]</span> <span class="token operator">=</span> decodedCredentials<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">':'</span><span class="token punctuation">)</span>

  <span class="token comment">// make sure they are there!</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>email <span class="token operator">||</span> <span class="token operator">!</span>password<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token string">'Email and password are required'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// suppose we get the hashed password from our database like this</span>
  <span class="token keyword">const</span> hashedPassword <span class="token operator">=</span> <span class="token function">getHashFromDB</span><span class="token punctuation">(</span>email<span class="token punctuation">)</span>

  <span class="token comment">// now use bcrypt to check the password against the hash</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> bcrypt<span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>password<span class="token punctuation">,</span> hasedPassword<span class="token punctuation">)</span>

  <span class="token comment">// result is a boolean: false means password is incorrect</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">error</span><span class="token operator">:</span> <span class="token string">'Incorrect password'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// otherwise, the password is right, so send the secret data!</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">'here is the secret data!'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that we have used the <code v-pre>bcrypt</code> npm library - most frameworks offer access
to hashing libraries so you will need to look up the documentation for yours.</p>
<p>The above code could be set up as a middleware function so that it can be
dropped into any endpoint to parse out the authentication header for us and we
don't need to repeat this logic on every protected endpoint.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The exact way this is implemented in many frameworks may vary. It could be that
much of this logic is abstracted away behind some kind of authentication
library. That's fine! But it's good to know what's happening &quot;under the hood&quot;.</p>
</div>
<h3 id="creating-users" tabindex="-1"><a class="header-anchor" href="#creating-users" aria-hidden="true">#</a> Creating users</h3>
<p>The process of creating new users (letting them &quot;sign up&quot;) would repeat much of
the logic in the above code:</p>
<ol>
<li>
<p>Send the user data in the body of the request to <code v-pre>POST api/v1/user</code> (N.b. it
is ok to send the data in the body when creating a user because we are
actually modifying user data, not authenticating a request. However, <strong>we
must use https</strong>.)</p>
</li>
<li>
<p>On the server, get the data out of the body,
<a href="/backend/hashing">salt and hash</a> the password, then save it to the database
with the rest of the user data.</p>
</li>
</ol>
<p>Thats's it! Now you have a hashed password to compare authenticated requests
with in the future.</p>
<h2 id="limitations" tabindex="-1"><a class="header-anchor" href="#limitations" aria-hidden="true">#</a> Limitations</h2>
<p>There are many downsides to basic auth.</p>
<h3 id="security" tabindex="-1"><a class="header-anchor" href="#security" aria-hidden="true">#</a> Security</h3>
<p>First, the user must send their credentials with every single request. Having
the user type their password over and over again creates security issues:
they're more likely to choose weaker passwords for convenience; people can look
over their shoulder; etc.</p>
<p>Also, if the http request is compromised somehow, the attacker has the user's
password and the user and app developer won't even know it. It is generally very
hard to get users to rotate their passwords frequently enough so that
compromised passwords become defunct.</p>
<h3 id="convenience" tabindex="-1"><a class="header-anchor" href="#convenience" aria-hidden="true">#</a> Convenience</h3>
<p>Secondly, it's massively inconvenient. The user wants to &quot;stay logged in&quot; and
not send their password every time. We need a way of preserving the
authentication for future requests. This is where authorization comes in, and is
what we're studying next with <a href="/backend/jwt">token based access</a>!</p>
</div></template>


