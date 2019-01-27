#!/usr/bin/env bash

DEV='dev/sakai.duke.edu/library/skin'
DATE=`date +%Y-%m-%d_%H-%M-%S`

find src/duke-default/js/plugins/ -type f -name '*.js' -exec cat {} + >> $DEV/duke-default/js/morpheus.plugins.js
find src/duke-default/js/src/ -type f -name '*.js' -exec cat {} + >> $DEV/duke-default/js/morpheus.scripts.js


uglifyjs $DEV/duke-default/js/morpheus.plugins.js -o $DEV/duke-default/js/morpheus.plugins.min.js -c
uglifyjs $DEV/duke-default/js/morpheus.scripts.js -o $DEV/duke-default/js/morpheus.scripts.min.js -c

echo "Moving files to $DEV"
printf "\n/* Compiled on $DATE */\n" >> $DEV/duke-default/js/morpheus.scripts.min.js


echo "All done"