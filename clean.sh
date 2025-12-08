#!/bin/bash

chmod u+x ./clean.sh

find . -name "node_modules" -type d -exec rm -rf {} +

rm -f package-lock.json
