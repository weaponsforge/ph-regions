#!/bin/bash

# Replace localhost URLs in both index.html files
sed -i.bak -e "s|http://localhost:3001/||g" public/docs/index.html