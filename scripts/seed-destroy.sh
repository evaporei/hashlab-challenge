#!/bin/sh

./user/scripts/seed-destroy.sh || exit $?
./product/scripts/seed-destroy.sh || exit $?
