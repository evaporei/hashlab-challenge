#!/bin/sh

./user/scripts/migrate-down.sh || exit $?
./product/scripts/migrate-down.sh || exit $?
