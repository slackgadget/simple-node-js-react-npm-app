# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV ISSUER=https://dev-9213540.okta.com/oauth2/default
ENV CLIENT_ID=0oams1il08SC8D5UX5d5

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

EXPOSE 9090

# start app
CMD ["npm", "start"] 
