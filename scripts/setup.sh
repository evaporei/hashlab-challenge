#!/bin/sh

./user/scripts/setup.sh || exit $?
./discount/scripts/setup.sh || exit $?
./product/scripts/setup.sh || exit $?
