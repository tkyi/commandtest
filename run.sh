#!/bin/bash

set -e

# Install some NPM deps.
echo "Installing git-tag-version npm package..."
npm install git-tag-version nomnom

echo "You provided the arguments:" "$@"

echo "Downloading script..."
curl -o ./test.js https://raw.githubusercontent.com/tkyi/commandtest/cdscrewdrivercd/test.js
chmod +x ./test.js

echo "Getting version..."
./test.js "$@"
