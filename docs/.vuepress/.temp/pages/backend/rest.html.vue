<template><div><h1 id="rest-apis" tabindex="-1"><a class="header-anchor" href="#rest-apis" aria-hidden="true">#</a> REST APIs</h1>
<p><a href="https://si-mv.github.io/slides/multiverse/2-1-1-rest-apis.html#/" target="_blank" rel="noopener noreferrer">Slides<ExternalLinkIcon/></a></p>
<ul>
<li>REST = Representational State Transfer</li>
<li>REST is an <em>architectural style</em> which emphasises interacting with data with http requests to url endpoints</li>
<li>API = Application Programming Interface - it's a way of interacting with an app with code</li>
<li>The four main http methods which roughly correspond to CRUD are GET (read), POST (create), PUT (update), DELETE (delete)</li>
<li>The most common status codes are</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">Code</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">200</td>
<td>Success</td>
</tr>
<tr>
<td style="text-align:center">201</td>
<td>Created successfuly</td>
</tr>
<tr>
<td style="text-align:center">400</td>
<td>Invalid request</td>
</tr>
<tr>
<td style="text-align:center">401</td>
<td>Failed to authenticate</td>
</tr>
<tr>
<td style="text-align:center">403</td>
<td>Action is forbidden to this user</td>
</tr>
<tr>
<td style="text-align:center">404</td>
<td>Resource not found</td>
</tr>
<tr>
<td style="text-align:center">500</td>
<td>Internal server error</td>
</tr>
<tr>
<td style="text-align:center">503</td>
<td>Service unavailable</td>
</tr>
</tbody>
</table>
<ul>
<li>REST API endpoints should be nouns not verbs, and should be consistent. <code v-pre>getImage?id=a6r7p</code> is bad; <code v-pre>GET images/a6r7p</code> is good.</li>
</ul>
<h2 id="assignment-cloudbox" tabindex="-1"><a class="header-anchor" href="#assignment-cloudbox" aria-hidden="true">#</a> 📦 Assignment: Cloudbox</h2>
<p>We will build Cloudbox - a storage provider for user text documents. Cloudbox plans to become a megacorporation and have identity and data for millions of users. They expose a REST API for users to interact with their data. They hired an engineer to build an MVP. That engineer is you!</p>
<p>We will build the authentication system poorly at first - just storing the passwords as plaintext, and requiring a user to send their password with every request to a protected endpoint. (Building it badly will help you appreciate the problems associated with auth - please don't replicate these practices in real-world applications!)</p>
<h3 id="user-story" tabindex="-1"><a class="header-anchor" href="#user-story" aria-hidden="true">#</a> User story</h3>
<table>
<thead>
<tr>
<th style="text-align:center">As a...</th>
<th>I can...</th>
<th>so that...</th>
<th style="text-align:center">Status</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">user</td>
<td>create an account with a <code v-pre>username</code> and <code v-pre>password</code></td>
<td>I can sign in securely</td>
<td style="text-align:center"><checkbox /></td>
</tr>
<tr>
<td style="text-align:center">user</td>
<td>edit my account details</td>
<td>I control my identity and keep my account secure</td>
<td style="text-align:center"><checkbox /></td>
</tr>
<tr>
<td style="text-align:center">user</td>
<td>create a document with text, timestamp and author</td>
<td>I can save my files on the server</td>
<td style="text-align:center"><checkbox /></td>
</tr>
<tr>
<td style="text-align:center">user</td>
<td>edit my own docs</td>
<td>I can change their content</td>
<td style="text-align:center"><checkbox /></td>
</tr>
<tr>
<td style="text-align:center">user</td>
<td>delete my own docs</td>
<td>I can remove my data from the server</td>
<td style="text-align:center"><checkbox /></td>
</tr>
<tr>
<td style="text-align:center">user</td>
<td>delete my account and all associated data</td>
<td>I exercise my GDPR right to be forgotten</td>
<td style="text-align:center"><checkbox /></td>
</tr>
</tbody>
</table>
<h3 id="set-up" tabindex="-1"><a class="header-anchor" href="#set-up" aria-hidden="true">#</a> Set up</h3>
<ul>
<li>Fork the template on GitHub and <code v-pre>npm install</code> on your machine.</li>
<li>Have a look around the template and make note of the Todos.</li>
<li>Install the REST Client plugin for VS Code and skim the docs so you know how it works.</li>
</ul>
<h3 id="account-creation" tabindex="-1"><a class="header-anchor" href="#account-creation" aria-hidden="true">#</a> Account creation</h3>
<ul>
<li>Set up a <code v-pre>POST /auth/user</code> end-point which expects a username, password, firstName, secondName, email. If the username is not in use, create the user and save their details in the <code v-pre>users</code> array. Send the appropriate status codes in response.</li>
<li>Ensure that the server assigns a <code v-pre>uid</code> to each newly created user (you could use <a href="https://www.npmjs.com/package/nanoid" target="_blank" rel="noopener noreferrer">nanoid<ExternalLinkIcon/></a>).</li>
<li>Set up a <code v-pre>GET /auth/user/:uid</code> which expects a username and password combination for the user with the given uid. If it matches, respond with the user entry from the <code v-pre>user</code> array, <em>but not the password</em>.</li>
<li>Test your endpoints with the REST Client plugin (or Postman) by POSTing a new user and then GETting them.</li>
<li>Set up a <code v-pre>PUT /auth/user/:id</code> which can update the user's information, including username and password (now you see why the uid is so important!).</li>
<li>Test your endpoint by PUTing a user and GETting them.</li>
<li>Set up a <code v-pre>DELETE /auth/user/:id</code> endpoint which deletes the user.</li>
</ul>
<h3 id="document-handling" tabindex="-1"><a class="header-anchor" href="#document-handling" aria-hidden="true">#</a> Document handling</h3>
<ul>
<li>Set up endpoints for GET, POST, PUT and DELETE on <code v-pre>/api/docs</code>.</li>
<li>Make sure you send the correct codes, and protect GET, PUT and DELETE requests by requiring the user to send their username and password with each request.</li>
</ul>
<h3 id="extension-query-params" tabindex="-1"><a class="header-anchor" href="#extension-query-params" aria-hidden="true">#</a> Extension: Query params</h3>
<ul>
<li>Modify your <code v-pre>GET /api/docs/:id</code> endpoint to allow a query parameter <code v-pre>?contains=</code> which accepts a string and returns any doc which contains that string within its content.</li>
<li>Allow another query param of <code v-pre>&amp;sort=</code> which sorts the docs by the time they were created. The values of <code v-pre>sort</code> can be <code v-pre>asc</code> for ascending or <code v-pre>desc</code> for descending. You will need to modify your <code v-pre>POST /api/docs</code> to include a timestamp when the doc is saved (you could use <code v-pre>Date.now()</code>).</li>
<li>Allow another query param of <code v-pre>&amp;limit=</code>. This is an integer which determines how many docs are sent in response.</li>
<li>Finally, add a <code v-pre>&amp;cursor=</code> query param, and integer which determines how many documents to skip before they are returned. Together with <code v-pre>sort</code> and <code v-pre>limit</code>, this will allow front-end devs to build <strong>pagination</strong>.</li>
</ul>
</div></template>


