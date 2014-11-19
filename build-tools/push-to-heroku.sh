#!/bin/bash

grunt build
git add -A
git config user.name "circle"
git config user.email "estevez.dani@gmail.com"
git commit -m "generated www via grunt build for heroku"
git push git@heroku.com:daniboomerang.git --force