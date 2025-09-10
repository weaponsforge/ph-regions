#!/bin/sh

# Run this script after first running `vercel build --prod`
# It copies missing files from running the vercel build

# Copy the "normal" build files to the vercel build output
cp -r dist/. .vercel/output/functions/index.func/src
cp -r public/ .vercel/output/functions/index.func
