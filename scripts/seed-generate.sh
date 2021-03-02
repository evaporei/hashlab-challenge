#!/bin/sh

./user/scripts/seed-generate.sh || exit $?
./product/scripts/seed-generate.sh || exit $?
