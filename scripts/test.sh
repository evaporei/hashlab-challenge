#!/bin/sh

./js-commons/scripts/test.sh || exit $?
./user/scripts/test.sh || exit $?
./discount/scripts/test.sh || exit $?
./product/scripts/test.sh || exit $?
