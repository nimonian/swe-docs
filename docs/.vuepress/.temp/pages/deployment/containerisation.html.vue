<template><div><h1 id="containerisation" tabindex="-1"><a class="header-anchor" href="#containerisation" aria-hidden="true">#</a> Containerisation</h1>
<p>When we write software, we write it on a machine we have set up in a particular way. We have our version of node, our installed dependencies and binaries, and so on. If we share our code with someone else, what happens if their machine is set up in a different way? They might not be able to run our code.</p>
<p>What we need to do, is wrap up everything into a nice little parcel - all of our code, its dependencies and even the operating system - and send it to someone so they can run it in a <strong>container</strong> on their machine.</p>
<h2 id="docker-basics" tabindex="-1"><a class="header-anchor" href="#docker-basics" aria-hidden="true">#</a> Docker basics</h2>
<p>First of all, if you're using VS Code, download the Docker extension - it will make things easier for you.</p>
<p>A <strong>container</strong> is a sandboxed environment in which our code and all of its dependencies can run on any machine.</p>
<p>An <strong>image</strong> is a blueprint which instructs the machine how to build the container.</p>
<p>A <strong>Dockerfile</strong> is a human-readable set of instructions which tells the machine how to build an image.</p>
<p>The workflow goes like: you write your code; then your write a Dockerfile and use that to build an image; then share your image; so other people can run it in a container.</p>
<p>Suppose we're building an app called randomiser. Our app has a separate frontend and backend. Here's the frontend code.</p>
<h3 id="frontend-code" tabindex="-1"><a class="header-anchor" href="#frontend-code" aria-hidden="true">#</a> Frontend code</h3>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- index.html --></span>
<span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>style.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bundle.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span> <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span> <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>msg<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>msg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Click below to get going!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>btn<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        Randomise
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// index.js</span>
<span class="token keyword">const</span> axios <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'axios'</span><span class="token punctuation">)</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">randomise</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'http://localhost:5000/random'</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> txt <span class="token operator">=</span> res<span class="token punctuation">.</span>data
  document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'msg'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerText <span class="token operator">=</span> txt<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'load'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> btn <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'btn'</span><span class="token punctuation">)</span>
  btn<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> randomise<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre v-pre class="language-css"><code><span class="token comment">/* style.css */</span>
<span class="token selector">body</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>49<span class="token punctuation">,</span> 61<span class="token punctuation">,</span> 61<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Verdana<span class="token punctuation">,</span> Geneva<span class="token punctuation">,</span> Tahoma<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">place-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.wrapper</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.msg</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">font-family</span><span class="token punctuation">:</span> Verdana<span class="token punctuation">,</span> Geneva<span class="token punctuation">,</span> Tahoma<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.btn</span> <span class="token punctuation">{</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 25px<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>194<span class="token punctuation">,</span> 38<span class="token punctuation">,</span> 152<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> solid 1px<span class="token punctuation">;</span>
  <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.btn:hover</span> <span class="token punctuation">{</span>
  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 3px 3px 0px <span class="token function">rgb</span><span class="token punctuation">(</span>119<span class="token punctuation">,</span> 119<span class="token punctuation">,</span> 119<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"frontend"</span><span class="token punctuation">,</span>
  <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"1.0.0"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"browserify index.js -o bundle.js"</span><span class="token punctuation">,</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"watchify index.js -o bundle.js &amp; live-server --port=3000"</span><span class="token punctuation">,</span>
    <span class="token property">"start"</span><span class="token operator">:</span> <span class="token string">"browserify index.js -o bundle.js &amp; live-server --port=3000"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"keywords"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token property">"license"</span><span class="token operator">:</span> <span class="token string">"ISC"</span><span class="token punctuation">,</span>
  <span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"browserify"</span><span class="token operator">:</span> <span class="token string">"^17.0.0"</span><span class="token punctuation">,</span>
    <span class="token property">"live-server"</span><span class="token operator">:</span> <span class="token string">"^1.2.2"</span><span class="token punctuation">,</span>
    <span class="token property">"watchify"</span><span class="token operator">:</span> <span class="token string">"^4.0.0"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"axios"</span><span class="token operator">:</span> <span class="token string">"^0.27.2"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="frontend-dockerfile" tabindex="-1"><a class="header-anchor" href="#frontend-dockerfile" aria-hidden="true">#</a> Frontend Dockerfile</h3>
<p>Before we continue, we should make a file called <code v-pre>.dockerignore</code> in the same directory as our <code v-pre>Dockerfile</code> containing</p>
<div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre v-pre class="language-Dockerfile"><code># .dockerignore
node_modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>The Dockerfile for our code could look like this:</p>
<div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre v-pre class="language-Dockerfile"><code># Dockerfile

# start with node version 16 on linux
FROM node:16

# change to /app directory inside the container
# if it doesn't exist, it gets created
WORKDIR /app

# copy package and package-lock
COPY package*.json ./

# install node dependencies
RUN npm install

# make the .dockerignore file first!
COPY . .

# make port 8080 accessible
EXPOSE 3000

CMD [&quot;npm&quot;, &quot;run&quot;, &quot;start&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that exposing port 3000 doesn't mean we can access it in our browser - we need to forward the port to a port on our local machine (we'll do this later with the <code v-pre>-p</code> flag).</p>
<h3 id="building-images" tabindex="-1"><a class="header-anchor" href="#building-images" aria-hidden="true">#</a> Building images</h3>
<p><strong>Dockerfile</strong> goes in, <strong>image</strong> comes out. Simple!</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># build the Dockerfile in cwd into an image, tage the image randomiser-frontend:</span>
$ <span class="token function">docker</span> build <span class="token parameter variable">-t</span> randomiser-frontend <span class="token builtin class-name">.</span>

<span class="token comment"># lists the images on your machine:</span>
$ <span class="token function">docker</span> images

<span class="token comment"># removes the image with id &lt;id> (could also use &lt;tag>):</span>
$ <span class="token function">docker</span> image <span class="token function">rm</span> <span class="token operator">&lt;</span>id<span class="token operator">></span>

<span class="token comment"># removes dangling images:</span>
$ <span class="token function">docker</span> image prune 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code v-pre>.</code> at the end of the first command is the path to the directory containing the dockerfile we want to build. Since the terminal is open in the same directory as the Dockerfile, <code v-pre>.</code> is all we need.</p>
<p>The <code v-pre>-t randomiser-frontend</code> tags our <em>image</em>, so we don't need to copy and remember the id Docker assigns to it. (Remember, <code v-pre>-t</code> tags the image, not the container.)</p>
<h3 id="running-containers" tabindex="-1"><a class="header-anchor" href="#running-containers" aria-hidden="true">#</a> Running containers</h3>
<p>Many <strong>containers</strong> can run the same <strong>image</strong>.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># To create a new container and run an image inside it:</span>
$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">4000</span>:3000 randomiser-frontend

<span class="token comment"># Then, to see a list of running containers, use:</span>
$ <span class="token function">docker</span> <span class="token function">ps</span>

<span class="token comment"># and to stop the container:</span>
$ <span class="token function">docker</span> container stop <span class="token operator">&lt;</span>id<span class="token operator">></span>

<span class="token comment"># and start it again:</span>
$ <span class="token function">docker</span> container start <span class="token operator">&lt;</span>id<span class="token operator">></span>

<span class="token comment"># to delete it:</span>
$ <span class="token function">docker</span> container <span class="token function">rm</span> <span class="token operator">&lt;</span>id<span class="token operator">></span>

<span class="token comment"># to prune containers not running:</span>
$ <span class="token function">docker</span> container prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The first command will run the image tagged randomiser-frontend in a new container and display the containers id to us. The <code v-pre>-d</code> runs the container in detached mode, so the process in <code v-pre>CMD</code> doesn't take over our terminal. The <code v-pre>-p x:y</code> maps port <code v-pre>x</code> on our local machine to the port <code v-pre>y</code> <code v-pre>EXPOSE</code>d by the container.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>With your container running, you can now head to http://localhost:3000 on your machine and see the app working!</p>
</div>
<h2 id="volumes" tabindex="-1"><a class="header-anchor" href="#volumes" aria-hidden="true">#</a> Volumes</h2>
<p>It is inconvenient to stop and start our container every time we make a change.</p>
<p>Since we're using watchify, any change to the source files will trigger a build for us. We can actually do this using a <strong>bind mount</strong>: this means a directory on the host machine is linked to a directory in the container. We can mount the source directory on the host machine to the /app directory using the <code v-pre>--mount</code> flag like so</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">4000</span>:3000 <span class="token punctuation">\</span>
<span class="token parameter variable">--mount</span> <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>"</span>,target<span class="token operator">=</span>/app <span class="token punctuation">\</span>
randomiser-frontend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now when we make changes to the source code, they will be reflected in the container, which will trigger watchify to restart the server for us.</p>
<h2 id="environment-variables" tabindex="-1"><a class="header-anchor" href="#environment-variables" aria-hidden="true">#</a> Environment variables</h2>
<p>If we make a <code v-pre>.env</code> file in the project root, we can add</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>PORT=3000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>and then put</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">4000</span>:3000 <span class="token punctuation">\</span>
<span class="token parameter variable">--mount</span> <span class="token assign-left variable">type</span><span class="token operator">=</span>bind,src<span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>"</span>,target<span class="token operator">=</span>/app <span class="token punctuation">\</span>
--env-file .env <span class="token punctuation">\</span>
randomiser-frontend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can now use ${PORT} throughout our app (including the EXPOSEd port in the Dockerfile). This is important when we deploy to Heroku, as it will inject a random PORT into our app.</p>
<h2 id="deploying-to-heroku" tabindex="-1"><a class="header-anchor" href="#deploying-to-heroku" aria-hidden="true">#</a> Deploying to Heroku</h2>
<p>Sign up for an account with <a href="https://id.heroku.com/login" target="_blank" rel="noopener noreferrer">Heroku<ExternalLinkIcon/></a>.</p>
<p>Install the <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noopener noreferrer">Heroku CLI<ExternalLinkIcon/></a> and login with</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ heroku login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>then you must login to Heroku's container registry with</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ heroku container:login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Make sure you're in the directory of the app you want to push, and run</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ heroku create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>to create your app on Heroku. Your app gets assigned a random name. You should now be able to see your app on the Heroku dashboard.</p>
<p>To build and then push your app, use</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ heroku container:push web <span class="token parameter variable">--app</span> calm-beyond-78023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This may take some time! You will see that the image created by this process was tagged with</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>registry.heroku.com/calm-beyond-78023/web:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This is in the form</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>&lt;registry>/&lt;app-name>/&lt;process-type>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>If you want to push a pre-built image you can use</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> tag <span class="token operator">&lt;</span>image-id<span class="token operator">></span> registry.heroku.com/<span class="token operator">&lt;</span>app-name<span class="token operator">></span>/<span class="token operator">&lt;</span>process-type<span class="token operator">></span>
$ <span class="token function">docker</span> push registry.heroku.com/<span class="token operator">&lt;</span>app-name<span class="token operator">></span>/<span class="token operator">&lt;</span>process-type<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>Finally, we release the app with</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ heroku container:release web --app calm-beyond-78023
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="deploying-to-google-cloud" tabindex="-1"><a class="header-anchor" href="#deploying-to-google-cloud" aria-hidden="true">#</a> Deploying to Google Cloud</h2>
<p>Create a new project on the <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console<ExternalLinkIcon/></a> and get the <a href="https://cloud.google.com/sdk/docs/install" target="_blank" rel="noopener noreferrer">cli installed<ExternalLinkIcon/></a> for your system. Under APIs and Services, enable the Artifacts API and the Kubernetes Engine API.</p>
<h3 id="config" tabindex="-1"><a class="header-anchor" href="#config" aria-hidden="true">#</a> Config</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># login in with google</span>
gcloud auth login

<span class="token comment"># install kubernetes with</span>
$ gcloud components <span class="token function">install</span> kubectl

<span class="token comment"># save project id as an env variable for ease:</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">PROJECT_ID</span><span class="token operator">=</span><span class="token operator">&lt;</span>get the project <span class="token function">id</span> from your cloud console<span class="token operator">></span>

<span class="token comment"># set it as your project id with the gcloud cli</span>
$ gcloud config <span class="token builtin class-name">set</span> project <span class="token variable">$PROJECT_ID</span>

<span class="token comment"># save your location as an environment variable</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">LOCATION</span><span class="token operator">=</span>europe-west1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>For GDPR purposes, EU user data should never pass outside of the EU except under special circumstances. It's a good idea to do some reading about this!</p>
</div>
<h3 id="pushing-to-a-repo" tabindex="-1"><a class="header-anchor" href="#pushing-to-a-repo" aria-hidden="true">#</a> Pushing to a repo</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># create a new repo for your containers</span>
$ gcloud artifacts repositories create random-repo --repository-format<span class="token operator">=</span>docker <span class="token parameter variable">--location</span><span class="token operator">=</span><span class="token variable">${LOCATION}</span> <span class="token parameter variable">--description</span><span class="token operator">=</span><span class="token string">"Docker repo"</span>

<span class="token comment"># have a look at the repo you have:</span>
$ gcloud artifacts repositories list

<span class="token comment"># and for convenience let's keep it as a var:</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">REPO</span><span class="token operator">=</span><span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo

<span class="token comment"># build and tag an image you want to deploy</span>
$ <span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token variable">${REPO}</span>/random-app:v1 <span class="token builtin class-name">.</span>

<span class="token comment"># sign in to the new registry with Docker</span>
$ gcloud auth print-access-token <span class="token operator">|</span> <span class="token function">docker</span> login <span class="token parameter variable">-u</span> oauth2accesstoken --password-stdin <span class="token variable">${LOCATION}</span>-docker.pkg.dev

<span class="token comment"># finally push your image to the repo</span>
$ <span class="token function">docker</span> push <span class="token variable">${REPO}</span>/random-app:v1

<span class="token comment"># you can check that your image has been pushed using</span>
$ gcloud artifacts <span class="token function">docker</span> images list <span class="token variable">${REPO}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You might need to run <code v-pre>gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin ${LOCATION}-docker.pkg.dev</code> again in the future, because the access token is short-lived.</p>
</div>
<h3 id="set-up-a-kubernetes-cluster" tabindex="-1"><a class="header-anchor" href="#set-up-a-kubernetes-cluster" aria-hidden="true">#</a> Set up a Kubernetes cluster</h3>
<p>For this section, you'll need <a href="https://kubernetes.io/docs/tasks/tools/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a>. You'll need to choose a zone for your Kubernetes cluster. You can run <code v-pre>gcloud compute zones list</code> to see what's available.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># set an env variable for convenience</span>
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">COMPUTE_ZONE</span><span class="token operator">=</span>europe-west2-a

<span class="token comment"># Set your region in config:</span>
$ gcloud config <span class="token builtin class-name">set</span> compute/zone <span class="token variable">${COMPUTE_ZONE}</span>

<span class="token comment"># create a cluster with</span>
$ gcloud container clusters create random-cluster

<span class="token comment"># now you should be able to see your new cluster with</span>
$ kubectl config get-contexts

<span class="token comment"># make sure your context is set to your new cluster</span>
$ kubectl config current-context

<span class="token comment"># if necessary, switch to the gke context:</span>
$ kubectl config use-context CONTEXT_NAME

<span class="token comment"># now check on your cluster with</span>
$ kubectl get nodes

<span class="token comment"># if you want a bit more info on one of them try this</span>
$ kubectl describe <span class="token function">node</span> NODE_NAME

<span class="token comment"># make sure you're connected to your cluster</span>
$ gcloud container clusters get-credentials random-cluster <span class="token parameter variable">--zone</span> <span class="token variable">${COMPUTE_ZONE}</span>

<span class="token comment"># create a Kubernetes deployment for your docker image</span>
$ kubectl create deployment random-app <span class="token parameter variable">--image</span><span class="token operator">=</span><span class="token variable">${REPO}</span>/random-app:v1

<span class="token comment"># in a separate terminal, watch your pods:</span>
$ kubectl get pods <span class="token parameter variable">--watch</span>

<span class="token comment"># set your deployment up to start with 3 replicas</span>
$ kubectl scale deployment random-app <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>

<span class="token comment"># set up horizontal scaling</span>
$ kubectl autoscale deployment random-app --cpu-percent<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--min</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">--max</span><span class="token operator">=</span><span class="token number">5</span>

<span class="token comment"># if you're not watching them already, take a look at your lovely pods!</span>
$ kubectl get pods

<span class="token comment"># you can also check the logs of any pod you want with</span>
$ kubectl logs pod <span class="token operator">&lt;</span>pod-name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="open-it-up-to-internet-traffic" tabindex="-1"><a class="header-anchor" href="#open-it-up-to-internet-traffic" aria-hidden="true">#</a> Open it up to internet traffic</h3>
<p>To expose the cluster to the internet, we use a service to group the pods together into a single static IP address reachable from any pod inside the cluster. The target-port should match the port on which our app's service is runnning.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># expose to the internet</span>
$ kubectl expose deployment random-app <span class="token parameter variable">--name</span><span class="token operator">=</span>random-app-service <span class="token parameter variable">--type</span><span class="token operator">=</span>LoadBalancer <span class="token parameter variable">--port</span> <span class="token number">80</span> --target-port <span class="token number">3000</span>

<span class="token comment"># we can find the details about our service by running</span>
kubectl get <span class="token function">service</span>

<span class="token comment"># you should see some output like this:</span>
NAME                TYPE           CLUSTER-IP    EXTERNAL-IP    PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
random-app-service   LoadBalancer   <span class="token number">10.12</span>.11.65   <span class="token number">34.89</span>.19.141   <span class="token number">80</span>:31710/TCP   2m40s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you visit the external IP in your browser, you should see your app up and running!</p>
<h3 id="update-your-app" tabindex="-1"><a class="header-anchor" href="#update-your-app" aria-hidden="true">#</a> Update your app</h3>
<p>If you make some changes in your app and rebuild it to a new version, you can push and update your app. Kubernetes uses rolling updates to ensure your app has zero downtime. If you're quick with the <code v-pre>watch kubectl get pods</code> command you can see your pods updating sequentially.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># rebuild your image</span>
$ <span class="token function">docker</span> build <span class="token parameter variable">-t</span> <span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app:v2 <span class="token builtin class-name">.</span>

<span class="token comment"># and push it to your registry</span>
$ <span class="token function">docker</span> push <span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app:v2

<span class="token comment"># you can perform a rolling update with</span>
$ kubectl <span class="token builtin class-name">set</span> image deployment/random-app random-app<span class="token operator">=</span><span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app:v2

<span class="token comment"># If you are quick, you can watch the rolling deploy take place with</span>
$ <span class="token function">watch</span> kubectl get pods
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="delete-everything" tabindex="-1"><a class="header-anchor" href="#delete-everything" aria-hidden="true">#</a> Delete everything</h3>
<p>To make sure you don't get charged for leaving your services running, you should clean them up.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># Delete the service</span>
$ kubectl delete <span class="token function">service</span> random-app-service

<span class="token comment"># Delete the cluster</span>
$ gcloud container clusters delete random-cluster <span class="token parameter variable">--zone</span> <span class="token variable">${COMPUTE_ZONE}</span>

<span class="token comment"># Delete your images</span>
$ gcloud artifacts <span class="token function">docker</span> images delete <span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app:v1 --delete-tags
$ gcloud artifacts <span class="token function">docker</span> images delete <span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app:v2 --delete-tags

<span class="token comment">#...or you can delete all images with</span>
$ gcloud artifacts <span class="token function">docker</span> images delete <span class="token variable">${LOCATION}</span>-docker.pkg.dev/<span class="token variable">${PROJECT_ID}</span>/random-repo/random-app

<span class="token comment"># and you can delete your repo with</span>
$ gcloud artifacts repositories delete random-repo -- location <span class="token variable">${LOCATION}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


