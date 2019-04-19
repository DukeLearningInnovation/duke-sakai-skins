#!/usr/bin/env bash
echo "bin/lint.sh $1 start"
stylelint src/$1/*.scss --syntax scss || true;
eslint src/$1/js || true;

echo "bin/lint.sh $1 start"