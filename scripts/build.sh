#!/bin/sh

./js-commons/scripts/build.sh || exit $?
./user/scripts/build.sh || exit $?
./discount/scripts/build.sh || exit $?
./product/scripts/build.sh || exit $?
