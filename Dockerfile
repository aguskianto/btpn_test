#1 fetch base image
FROM node:14

#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json ./
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . .
#container exposed network port number
EXPOSE 8080
#command to run within the container
CMD ["npm", "start"]