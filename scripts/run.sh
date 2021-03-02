#!/bin/sh

./user/scripts/run.sh || exit $?
./discount/scripts/run.sh || exit $?
./product/scripts/run.sh || exit $?
