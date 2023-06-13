# Containerisation

When we write software, we write it on a machine we have set up in a particular way. We have our version of node, our installed dependencies and binaries, and so on. If we share our code with someone else, what happens if their machine is set up in a different way? They might not be able to run our code.

What we need to do, is wrap up everything into a nice little parcel - all of our code, its dependencies and even the operating system - and send it to someone so they can run it in a **container** on their machine.

## Docker basics

First of all, if you're using VS Code, download the Docker extension - it will make things easier for you.

A **container** is a sandboxed environment in which our code and all of its dependencies can run on any machine.

An **image** is a blueprint which instructs the machine how to build the container.

A **Dockerfile** is a human-readable set of instructions which tells the machine how to build an image.

The workflow goes like: you write your code; then your write a Dockerfile and use that to build an image; then share your image; so other people can run it in a container.

Suppose we're building an app called randomiser. Our app has a separate frontend and backend. Here's the frontend code.

### Frontend code

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <script src="bundle.js"></script>
  <title>Document</title>
</head>
<body>
  <div class="container">
    <div style="display: flex; flex-direction: column; align-items: center;">
      <h1 id="msg" class="msg">Click below to get going!</h1>
      <button id="btn" class="btn">
        Randomise
      </button>
    </div>
  </div>
</body>
</html>
```

```js
// index.js
const axios = require('axios')

async function randomise () {
  const res = await axios.get('http://localhost:5000/random')
  const txt = res.data
  document.getElementById('msg').innerText = txt.toUpperCase()
}

window.addEventListener('load', () => {
  const btn = document.getElementById('btn')
  btn.addEventListener('click', randomise)
})
```

```css
/* style.css */
body {
  background-color: rgb(49, 61, 61);
  padding: 0;
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.container {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.msg {
  color: white;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.btn {
  padding: 1em;
  border-radius: 25px;
  color: white;
  background-color: rgb(194, 38, 152);
  font-weight: bold;
  border: solid 1px;
  cursor: pointer;
}

.btn:hover {
  box-shadow: 3px 3px 0px rgb(119, 119, 119);
}
```

```json
// package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "browserify index.js -o bundle.js",
    "dev": "watchify index.js -o bundle.js & live-server --port=3000",
    "start": "browserify index.js -o bundle.js & live-server --port=3000"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browserify": "^17.0.0",
    "live-server": "^1.2.2",
    "watchify": "^4.0.0"
  },
  "dependencies": {
    "axios": "^0.27.2"
  }
}

```

### Frontend Dockerfile

Before we continue, we should make a file called `.dockerignore` in the same directory as our `Dockerfile` containing
```Dockerfile
# .dockerignore
node_modules
```

The Dockerfile for our code could look like this:

```Dockerfile
# Dockerfile

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

CMD ["npm", "run", "start"]
```

Note that exposing port 3000 doesn't mean we can access it in our browser - we need to forward the port to a port on our local machine (we'll do this later with the `-p` flag).

### Building images

**Dockerfile** goes in, **image** comes out. Simple!

```shell
# build the Dockerfile in cwd into an image, tage the image randomiser-frontend:
$ docker build -t randomiser-frontend .

# lists the images on your machine:
$ docker images

# removes the image with id <id> (could also use <tag>):
$ docker image rm <id>

# removes dangling images:
$ docker image prune 
```

The `.` at the end of the first command is the path to the directory containing the dockerfile we want to build. Since the terminal is open in the same directory as the Dockerfile, `.` is all we need.

The `-t randomiser-frontend` tags our *image*, so we don't need to copy and remember the id Docker assigns to it. (Remember, `-t` tags the image, not the container.)

### Running containers

Many **containers** can run the same **image**.

```bash
# To create a new container and run an image inside it:
$ docker run -d -p 4000:3000 randomiser-frontend

# Then, to see a list of running containers, use:
$ docker ps

# and to stop the container:
$ docker container stop <id>

# and start it again:
$ docker container start <id>

# to delete it:
$ docker container rm <id>

# to prune containers not running:
$ docker container prune
```
The first command will run the image tagged randomiser-frontend in a new container and display the containers id to us. The `-d` runs the container in detached mode, so the process in `CMD` doesn't take over our terminal. The `-p x:y` maps port `x` on our local machine to the port `y` `EXPOSE`d by the container.

::: tip
With your container running, you can now head to http://localhost:3000 on your machine and see the app working!
:::

## Volumes

It is inconvenient to stop and start our container every time we make a change.

Since we're using watchify, any change to the source files will trigger a build for us. We can actually do this using a **bind mount**: this means a directory on the host machine is linked to a directory in the container. We can mount the source directory on the host machine to the /app directory using the `--mount` flag like so
```bash
$ docker run \
-p 4000:3000 \
--mount type=bind,src="$(pwd)",target=/app \
randomiser-frontend
```
Now when we make changes to the source code, they will be reflected in the container, which will trigger watchify to restart the server for us.

## Environment variables

If we make a `.env` file in the project root, we can add
```
PORT=3000
```
and then put
```bash
$ docker run \
-p 4000:3000 \
--mount type=bind,src="$(pwd)",target=/app \
--env-file .env \
randomiser-frontend
```
We can now use ${PORT} throughout our app (including the EXPOSEd port in the Dockerfile). This is important when we deploy to Heroku, as it will inject a random PORT into our app.

## Deploying to Heroku

Sign up for an account with [Heroku](https://id.heroku.com/login).

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and login with
```bash
$ heroku login
```
then you must login to Heroku's container registry with
```
$ heroku container:login
```

Make sure you're in the directory of the app you want to push, and run
```bash
$ heroku create
```
to create your app on Heroku. Your app gets assigned a random name. You should now be able to see your app on the Heroku dashboard.

To build and then push your app, use
```bash
$ heroku container:push web --app calm-beyond-78023
```
This may take some time! You will see that the image created by this process was tagged with
```
registry.heroku.com/calm-beyond-78023/web:latest
```
This is in the form
```
<registry>/<app-name>/<process-type>
```
::: tip
If you want to push a pre-built image you can use
```bash
$ docker tag <image-id> registry.heroku.com/<app-name>/<process-type>
$ docker push registry.heroku.com/<app-name>/<process-type>
```
:::

Finally, we release the app with
```
$ heroku container:release web --app calm-beyond-78023
```

## Deploying to Google Cloud

Create a new project on the [Google Cloud Console](https://console.cloud.google.com/) and get the [cli installed](https://cloud.google.com/sdk/docs/install) for your system. Under APIs and Services, enable the Artifacts API and the Kubernetes Engine API.


### Config

```bash
# login in with google
gcloud auth login

# install kubernetes with
$ gcloud components install kubectl

# save project id as an env variable for ease:
$ export PROJECT_ID=<get the project id from your cloud console>

# set it as your project id with the gcloud cli
$ gcloud config set project $PROJECT_ID

# save your location as an environment variable
$ export LOCATION=europe-west1
```

::: warning
For GDPR purposes, EU user data should never pass outside of the EU except under special circumstances. It's a good idea to do some reading about this!
:::

### Pushing to a repo

```bash
# create a new repo for your containers
$ gcloud artifacts repositories create random-repo --repository-format=docker --location=${LOCATION} --description="Docker repo"

# have a look at the repo you have:
$ gcloud artifacts repositories list

# and for convenience let's keep it as a var:
$ export REPO=${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo

# build and tag an image you want to deploy
$ docker build -t ${REPO}/random-app:v1 .

# sign in to the new registry with Docker
$ gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin ${LOCATION}-docker.pkg.dev

# finally push your image to the repo
$ docker push ${REPO}/random-app:v1

# you can check that your image has been pushed using
$ gcloud artifacts docker images list ${REPO}
```

::: tip
You might need to run `gcloud auth print-access-token | docker login -u oauth2accesstoken --password-stdin ${LOCATION}-docker.pkg.dev` again in the future, because the access token is short-lived.
:::

### Set up a Kubernetes cluster

For this section, you'll need [kubectl](https://kubernetes.io/docs/tasks/tools/). You'll need to choose a zone for your Kubernetes cluster. You can run `gcloud compute zones list` to see what's available.


```bash
# set an env variable for convenience
$ export COMPUTE_ZONE=europe-west2-a

# Set your region in config:
$ gcloud config set compute/zone ${COMPUTE_ZONE}

# create a cluster with
$ gcloud container clusters create random-cluster

# now you should be able to see your new cluster with
$ kubectl config get-contexts

# make sure your context is set to your new cluster
$ kubectl config current-context

# if necessary, switch to the gke context:
$ kubectl config use-context CONTEXT_NAME

# now check on your cluster with
$ kubectl get nodes

# if you want a bit more info on one of them try this
$ kubectl describe node NODE_NAME

# make sure you're connected to your cluster
$ gcloud container clusters get-credentials random-cluster --zone ${COMPUTE_ZONE}

# create a Kubernetes deployment for your docker image
$ kubectl create deployment random-app --image=${REPO}/random-app:v1

# in a separate terminal, watch your pods:
$ kubectl get pods --watch

# set your deployment up to start with 3 replicas
$ kubectl scale deployment random-app --replicas=3

# set up horizontal scaling
$ kubectl autoscale deployment random-app --cpu-percent=80 --min=1 --max=5

# if you're not watching them already, take a look at your lovely pods!
$ kubectl get pods

# you can also check the logs of any pod you want with
$ kubectl logs pod <pod-name>
```

### Open it up to internet traffic

To expose the cluster to the internet, we use a service to group the pods together into a single static IP address reachable from any pod inside the cluster. The target-port should match the port on which our app's service is runnning.

```bash
# expose to the internet
$ kubectl expose deployment random-app --name=random-app-service --type=LoadBalancer --port 80 --target-port 3000

# we can find the details about our service by running
kubectl get service

# you should see some output like this:
NAME                TYPE           CLUSTER-IP    EXTERNAL-IP    PORT(S)        AGE
random-app-service   LoadBalancer   10.12.11.65   34.89.19.141   80:31710/TCP   2m40s
```
If you visit the external IP in your browser, you should see your app up and running!

### Update your app

If you make some changes in your app and rebuild it to a new version, you can push and update your app. Kubernetes uses rolling updates to ensure your app has zero downtime. If you're quick with the `watch kubectl get pods` command you can see your pods updating sequentially.

```bash
# rebuild your image
$ docker build -t ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app:v2 .

# and push it to your registry
$ docker push ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app:v2

# you can perform a rolling update with
$ kubectl set image deployment/random-app random-app=${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app:v2

# If you are quick, you can watch the rolling deploy take place with
$ watch kubectl get pods
```

### Delete everything

To make sure you don't get charged for leaving your services running, you should clean them up.

```bash
# Delete the service
$ kubectl delete service random-app-service

# Delete the cluster
$ gcloud container clusters delete random-cluster --zone ${COMPUTE_ZONE}

# Delete your images
$ gcloud artifacts docker images delete ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app:v1 --delete-tags
$ gcloud artifacts docker images delete ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app:v2 --delete-tags

#...or you can delete all images with
$ gcloud artifacts docker images delete ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/random-repo/random-app

# and you can delete your repo with
$ gcloud artifacts repositories delete random-repo -- location ${LOCATION}
```
