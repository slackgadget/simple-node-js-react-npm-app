#!/bin/sh

PATH=$PATH:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/local/git/bin:/usr/local/bin/npm:

echo 'The following "npm" command builds your Node.js/React application for'
echo 'production in the local "build" directory (i.e. within the'
echo '"/var/jenkins_home/workspace/simple-node-js-react-app" directory),'
echo 'correctly bundles React in production mode and optimizes the build for'
echo 'the best performance.'
set -x
npm run build
set +x

#Remove any existing local container
docker container rm -f webster

pwd

#Build the image -- nb. Set the path by proptery or ENV Variable
docker image build . -t simple-node-js-react-app:LATEST

#Run the image in the container expose Port 3000
docker run -p 3000:3000/tcp --name=webster  simple-node-js-react-app:LATEST
