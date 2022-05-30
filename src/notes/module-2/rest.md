# REST APIs

[Slides](https://si-mv.github.io/slides/multiverse/2-1-1-rest-apis.html#/)

- REST = Representational State Transfer
- REST is an *architectural style* which emphasises interacting with data with http requests to url endpoints
- API = Application Programming Interface - it's a way of interacting with an app with code
- The four main http methods which roughly correspond to CRUD are GET (read), POST (create), PUT (update), DELETE (delete)
- The most common status codes are

| Code | Meaning |
| :---: | --- |
| 200 | Success |
| 201 | Created successfuly |
| 400 | Invalid request |
| 401 | Failed to authenticate |
| 403 | Action is forbidden to this user |
| 404 | Resource not found |
| 500 | Internal server error |
| 503 | Service unavailable |

- REST API endpoints should be nouns not verbs, and should be consistent. `getImage?id=a6r7p` is bad; `GET images/a6r7p` is good.

## :package: Assignment: Cloudbox

We will build Cloudbox - a storage provider for user text documents. Cloudbox plans to become a megacorporation and have identity and data for millions of users. They expose a REST API for users to interact with their data. They hired an engineer to build an MVP. That engineer is you!

We will build the authentication system poorly at first - just storing the passwords as plaintext, and requiring a user to send their password with every request to a protected endpoint. (Building it badly will help you appreciate the problems associated with auth - please don't replicate these practices in real-world applications!)

### User story

| As a... | I can... | so that... | Status |
| :---: | --- | --- | :---: |
| user | create an account with a `username` and `password` | I can sign in securely | <checkbox /> |
| user | edit my account details | I control my identity and keep my account secure | <checkbox /> |
| user | create a document with text, timestamp and author | I can save my files on the server | <checkbox /> |
| user | edit my own docs | I can change their content | <checkbox /> |
| user | delete my own docs | I can remove my data from the server | <checkbox /> |
| user | delete my account and all associated data | I exercise my GDPR right to be forgotten | <checkbox /> |

### Set up

 - Fork the template on GitHub and `npm install` on your machine.
 - Have a look around the template and make note of the Todos.
 - Install the REST Client plugin for VS Code and skim the docs so you know how it works.

### Account creation

 - Set up a `POST /auth/user` end-point which expects a username, password, firstName, secondName, email. If the username is not in use, create the user and save their details in the `users` array. Send the appropriate status codes in response.
 - Ensure that the server assigns a `uid` to each newly created user (you could use [nanoid](https://www.npmjs.com/package/nanoid)).
 - Set up a `GET /auth/user/:uid` which expects a username and password combination for the user with the given uid. If it matches, respond with the user entry from the `user` array, *but not the password*.
 - Test your endpoints with the REST Client plugin (or Postman) by POSTing a new user and then GETting them.
 - Set up a `PUT /auth/user/:id` which can update the user's information, including username and password (now you see why the uid is so important!).
 - Test your endpoint by PUTing a user and GETting them.
 - Set up a `DELETE /auth/user/:id` endpoint which deletes the user.

### Document handling

 - Set up endpoints for GET, POST, PUT and DELETE on `/api/docs`.
 - Make sure you send the correct codes, and protect GET, PUT and DELETE requests by requiring the user to send their username and password with each request.

### Extension: Query params

 - Modify your `GET /api/docs/:id` endpoint to allow a query parameter `?contains=` which accepts a string and returns any doc which contains that string within its content.
 - Allow another query param of `&sort=` which sorts the docs by the time they were created. The values of `sort` can be `asc` for ascending or `desc` for descending. You will need to modify your `POST /api/docs` to include a timestamp when the doc is saved (you could use `Date.now()`).
 - Allow another query param of `&limit=`. This is an integer which determines how many docs are sent in response.
 - Finally, add a `&cursor=` query param, and integer which determines how many documents to skip before they are returned. Together with `sort` and `limit`, this will allow front-end devs to build **pagination**.
