#!/bin/bash

set -e

# Install some NPM deps.
echo "Installing git-tag-version npm package..."
npm install git-tag-version nomnom

echo "You provided the arguments:" "$@"

./test.js "$@"
