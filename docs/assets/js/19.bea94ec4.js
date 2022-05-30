(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{442:function(t,s,a){"use strict";a.r(s);var e=a(67),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"securing-apis-with-basic-auth"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#securing-apis-with-basic-auth"}},[t._v("#")]),t._v(" Securing APIs with Basic Auth")]),t._v(" "),a("h2",{attrs:{id:"on-the-frontend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#on-the-frontend"}},[t._v("#")]),t._v(" On the frontend")]),t._v(" "),a("p",[t._v("Basic Auth requires a user to send their username and password to the server in order to access protected resources.")]),t._v(" "),a("p",[t._v("The first thing for us to understand, is how to encode in Base 64.")]),t._v(" "),a("h3",{attrs:{id:"encoding-to-base-64-in-dev-tools"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encoding-to-base-64-in-dev-tools"}},[t._v("#")]),t._v(" Encoding to Base 64 in dev tools")]),t._v(" "),a("p",[t._v("If you open developer tools in your browser, you can use")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("btoa")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'My cool string!'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'TXkgY29vbCBzdHJpbmch'")]),t._v("\n")])])]),a("p",[t._v("to get the Base 64 encoding, and then")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("atob")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'TXkgY29vbCBzdHJpbmch'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'My cool string!'")]),t._v("\n")])])]),a("p",[t._v("to get it back.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Question: What is brown and sticky?")]),t._v(" "),a("p",[t._v("Answer: QSBzdGljayE")])]),t._v(" "),a("h3",{attrs:{id:"encoding-to-base-64-in-node"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#encoding-to-base-64-in-node"}},[t._v("#")]),t._v(" Encoding to Base 64 in Node")]),t._v(" "),a("p",[t._v("We don't have access to "),a("code",[t._v("atob()")]),t._v(" in Node. It's a bit more complicated, but we can do it like this:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// To encode in Base 64:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Admit it...'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf-8'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'base64'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// To decode again:")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" decoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Buffer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'eW91IGxhdWdoZWQgYXQgdGhlIHN0aWNrIGpva2U='")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'base64'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf-8'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Question: What do you call a deer with no eyes?")]),t._v(" "),a("p",[t._v("Answer: Tm8gaWRlYS4uLg")]),t._v(" "),a("p",[t._v("🤣")])]),t._v(" "),a("h3",{attrs:{id:"using-the-authorization-basic-header"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-the-authorization-basic-header"}},[t._v("#")]),t._v(" Using the Authorization: Basic header")]),t._v(" "),a("p",[t._v("Let's suppose the user "),a("code",[t._v("mickey_m")]),t._v(" has password "),a("code",[t._v("HeyPluto!123")]),t._v(". In order to send the user's credentials to our api on the backend, we would encode the string "),a("code",[t._v("mickey_m:HeyPluto!123")]),t._v(" in Base 64 and then send it in the "),a("code",[t._v("Authorization")]),t._v(" header of a POST request. If you're using the Fetch API, here's how the "),a("code",[t._v("headers")]),t._v(" object would look")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("headers")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string-property property"}},[t._v("'Authorization'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("Bearer ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toBase64")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'mickey_m:HeyPluto!123'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("where "),a("code",[t._v("toBase64")]),t._v(" is a function you would need to write using what we've learned about "),a("code",[t._v("Buffer")]),t._v(" above.")]),t._v(" "),a("h2",{attrs:{id:"on-the-backend"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#on-the-backend"}},[t._v("#")]),t._v(" On the backend")]),t._v(" "),a("h3",{attrs:{id:"the-basic-auth-package"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-basic-auth-package"}},[t._v("#")]),t._v(" The basic-auth package")]),t._v(" "),a("p",[t._v("Let's suppose an api endpoint "),a("code",[t._v("api/v1/secrets")]),t._v(" should be only accessible by authenticated users. If we send a request to this endpoint with the basic authorization header, we can retrieve it from the "),a("code",[t._v("req")]),t._v(" object in the backend. There is a useful module called "),a("a",{attrs:{href:"https://www.npmjs.com/package/basic-auth",target:"_blank",rel:"noopener noreferrer"}},[t._v("basic-auth"),a("OutboundLink")],1),t._v(" which can help parse the username and password")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// server.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" basicAuth "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'basic-auth'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/api/v1/secrets'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("basicAuth")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Now user.name and user.pass are available")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("We can then check whether the password matches the one in our database.")]),t._v(" "),a("h3",{attrs:{id:"using-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-middleware"}},[t._v("#")]),t._v(" Using middleware")]),t._v(" "),a("p",[t._v("If would be annoying to have to write the code which parses and checks the password in every endpoint that needs protecting. To help with that, we can write a "),a("strong",[t._v("middleware")]),t._v(" function.")]),t._v(" "),a("p",[t._v("Here's an example of a stupid middleware:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("woohoo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("woo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hoo!'")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("next")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Then, on some endpoint, we could write")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/api/v1/some/endpoint'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" woohoo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("woo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => 'hoo!'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("We can put the "),a("code",[t._v("woohoo")]),t._v(" function onto any endpoint we like.")]),t._v(" "),a("p",[t._v("You can imagine we could write a middleware function called "),a("code",[t._v("authenticate")]),t._v(" which we drop in to any endpoint which requires protection. The "),a("code",[t._v("authenticate")]),t._v(" function would make sure the user exists and make sure the password is correct before calling "),a("code",[t._v("next()")]),t._v(" so the endpoint can continue processing.")]),t._v(" "),a("h2",{attrs:{id:"hashing-and-salting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hashing-and-salting"}},[t._v("#")]),t._v(" Hashing and salting")]),t._v(" "),a("h3",{attrs:{id:"hashing-functions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hashing-functions"}},[t._v("#")]),t._v(" Hashing functions")]),t._v(" "),a("p",[t._v("It is a bad idea to save passwords in your database. If somebody hacked the database, the users would lose their accounts forever (you'd have to deactivate their account, but they how do they prove who they are to reacivate it?). Instead, we "),a("strong",[t._v("hash")]),t._v(" the password. A hash is a function which takes some data and scrambles it in a particular way:")]),t._v(" "),a("ul",[a("li",[t._v("the same data will always result in the same hash")]),t._v(" "),a("li",[t._v("if you know the hash, it is infeasible to get the data back")]),t._v(" "),a("li",[t._v("all hashes have the same length regardless of the data size")]),t._v(" "),a("li",[t._v("a small change in the data will completely change the hash")])]),t._v(" "),a("p",[t._v("Think of the hash of some data as being like the fingerprint of the data: it's much smaller, but effectively unique.")]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("DETAILS")]),t._v(" "),a("p",[t._v("There are more possible different data than there are hashes. Let's say our hash function hashes data into strings of length 64. There are more possible data inputs than there are strings of length 64, and therefore there must be some data inputs that would result in the same hash. This is called a "),a("strong",[t._v("collision")]),t._v(". But, in practice, there are an "),a("em",[t._v("overwhelmingly large")]),t._v(" number of strings of length 64. You cannot even imagine how big this number is. So the likelihood of ever having a collision that causes problems is very, very small.")])]),t._v(" "),a("h3",{attrs:{id:"hashing-passwords"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hashing-passwords"}},[t._v("#")]),t._v(" Hashing passwords")]),t._v(" "),a("p",[t._v("Before storing the user's password on the server, we could hash it. Then, when the user sends us their password, we could hash it using the same algorithm and check it matches the hash in our database. If the hashes match, we know they gave us the right password.")]),t._v(" "),a("h3",{attrs:{id:"hashing-alone-isn-t-enough"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#hashing-alone-isn-t-enough"}},[t._v("#")]),t._v(" Hashing alone isn't enough")]),t._v(" "),a("p",[t._v("The problem with this is, if hackers got our database, they could look at all the hashes and see if any of the users have the same hash. If they do, it's probably a common string like "),a("code",[t._v("password123")]),t._v(". They can experiment a bit and eventually compromise some accounts.")]),t._v(" "),a("p",[t._v("Also, if they got our hashes, they could simply google the hash. Lots of people have spent lots of time hashing various words and phrases using all the popular hashing functions. Hackers can even download a "),a("em",[t._v("rainbow table")]),t._v(", which is a huge database of common phrases and their hashes with various algorithms.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("Try googling "),a("code",[t._v("482c811da5d5b4bc6d497ffa98491e38")])])]),t._v(" "),a("h3",{attrs:{id:"salting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#salting"}},[t._v("#")]),t._v(" Salting")]),t._v(" "),a("p",[t._v("The solution is to add a string of 10 or so random characters onto the password before hashing. This random string is called a "),a("strong",[t._v("salt")]),t._v(". This means that even if two users have the same password, their salted hash will be different.")]),t._v(" "),a("h3",{attrs:{id:"bcrypt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bcrypt"}},[t._v("#")]),t._v(" bcrypt")]),t._v(" "),a("p",[t._v("The npm library "),a("a",{attrs:{href:"https://www.npmjs.com/package/bcrypt",target:"_blank",rel:"noopener noreferrer"}},[t._v("bcrypt"),a("OutboundLink")],1),t._v(" uses a powerful hashing algorithm and is recommended for use in modern applications. It is called "),a("code",[t._v("bcrypt")]),t._v(" because the algorithm used to hash is called the "),a("em",[t._v("blowfish")]),t._v(" algorithm: blowfish + cryptography = bcrypt. Here is how we use it:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" bcrypt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bcrypt'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" saltLength "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" password "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GetPwnd5000'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" hash "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bcrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hashSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("password"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" saltLength"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// $2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy")]),t._v("\n")])])]),a("p",[t._v("And to check if the password is correct:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" passwordMatches "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" bcrypt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("compareSync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GetPwnd5000'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'$2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("WARNING")]),t._v(" "),a("p",[t._v("Rather than "),a("code",[t._v(".hashSync()")]),t._v(" and "),a("code",[t._v(".compareSync()")]),t._v(", you should use the async versions of these methods "),a("code",[t._v(".hash()")]),t._v(" and "),a("code",[t._v(".compare()")]),t._v(". bcrypt's algorithm is cpu intensive, and using async will start the process on a separate thread and thus will not block your server from processing further incoming requests.")])]),t._v(" "),a("details",{staticClass:"custom-block details"},[a("summary",[t._v("DETAILS")]),t._v(" "),a("p",[t._v("You might be wondering - if the salt is random, how can bcrypt compare the password to the saved hash? Look carefully at the hash: "),a("code",[t._v("$2b$10$EMX0KBM5mRJLCHxClch1ieB5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy")])]),t._v(" "),a("p",[t._v("At the beginning, you see "),a("code",[t._v("$2b$10$")]),t._v(" - this tells bcrypt that the "),a("code",[t._v("2b")]),t._v(" algorithm was used with "),a("code",[t._v("10")]),t._v(" salt characters. The first 22 characters of the remaining string "),a("code",[t._v("EMX0KBM5mRJLCHxClch1ie")]),t._v(" are a radix-64 encoding of the salt, and the remaining part "),a("code",[t._v("B5lCJnNmDf1tBIxFpjBsUzE6IQb87Wy")]),t._v(" is the actual hash.")]),t._v(" "),a("p",[t._v("You might wonder "),a("em",[t._v("isn't storing the salt dangerous?")]),t._v(" The answer is no - "),a("a",{attrs:{href:"https://stackoverflow.com/a/215165",target:"_blank",rel:"noopener noreferrer"}},[t._v("hiding the salt is unnecessary"),a("OutboundLink")],1),t._v(".")])]),t._v(" "),a("h2",{attrs:{id:"assignment-improving-cloudbox"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#assignment-improving-cloudbox"}},[t._v("#")]),t._v(" 📦 Assignment: Improving Cloudbox")]),t._v(" "),a("h3",{attrs:{id:"add-hashing-and-salting"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-hashing-and-salting"}},[t._v("#")]),t._v(" Add hashing and salting")]),t._v(" "),a("ul",[a("li",[t._v("Use bcrypt to hash and salt the password whenever a user is created. Replace all existing users' passwords with salted hashes.")]),t._v(" "),a("li",[t._v("Refactor your frontend code so that it no longer sends username and password in the body, but correctly encodes and includes it in the basic auth header.")]),t._v(" "),a("li",[t._v("Refactor your protected endpoints to use bcrypt's compare method.")]),t._v(" "),a("li",[t._v("In doing the above, it is a very good idea to extract all of this logic into a middleware called "),a("code",[t._v("authorize")]),t._v(" - whenever a user wants to use a protected endpoint, they have to supply their username and password in the basic auth header and the authorize middleware will extract and compare it before responding.")])])])}),[],!1,null,null,null);s.default=n.exports}}]);