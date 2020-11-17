#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t r00bal/liredit:$VERSION .
docker push r00bal/liredit:$VERSION
ssh -i /Users/hal9000/.ssh/ocean root@167.99.248.92 "docker pull r00bal/liredit:$VERSION && docker tag r00bal/liredit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"