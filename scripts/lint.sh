#!/bin/sh

./js-commons/scripts/lint.sh || exit $?
./user/scripts/lint.sh || exit $?
./discount/scripts/lint.sh || exit $?
./product/scripts/lint.sh || exit $?
