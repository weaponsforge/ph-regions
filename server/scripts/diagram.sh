#!/bin/sh

# Copies the architecture diagram into /server/public/architecture/index.html

targetDir=public/architecture
assetDir=public/assets

mkdir -p "$targetDir"
tar -zxvf "$assetDir/architecture.tar.gz" -C "$targetDir"
mv "$targetDir/architecture.html" "$targetDir/index.html"
