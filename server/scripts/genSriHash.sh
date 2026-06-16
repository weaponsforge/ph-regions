#!/bin/bash
set -euo pipefail

# Prints the Subresource Integrity (SRI) hash of a remote URL parameter.
# Usage: ./genSriHash.sh <URL>
# Example output: sha384-irPuG6Dqh5tfvLv4Yl+FeLzXKTA6CfA5aON/ACBCOuvhKXG8yK4umxZg8E7rBxQf
function generateSriHash () {
  if [ -z "$1" ]
  then
    echo "No input parameter"
    exit 1
  fi

  hash=$(curl -fsSL "$1" | openssl dgst -sha384 -binary | openssl base64 -A)
  echo "sha384-${hash}"
}

generateSriHash "$1"
