#!/bin/sh
echo '************** current BUILD  path is *******************'
echo $PATH
echo '*********************************************************'

PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/Users/christopherwebster/springsource/apache-maven-3.0.4/bin:/usr/local/git/bin:/usr/local/bin/npm:/Users/christopherwebster/Dev/google-cloud-sdk/bin:
node -v


pwd
#npm install --save-dev cross-env
npm run build
