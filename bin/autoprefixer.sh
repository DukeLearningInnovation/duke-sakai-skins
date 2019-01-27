#!/usr/bin/env bash
echo "bin/autoprefixer.sh start"
SAK_V_CUR='12.x'
SAK_V_NEW='19.x'
DATE=`date +%Y-%m-%d_%H-%M-%S`

# postcss -u autoprefixer -r dist/$SAK_V_NEW/duke-default/sass/*.css && \
postcss -u autoprefixer -r dist/$SAK_V_NEW/**/*.css
echo "bin/autoprefixer.sh done"