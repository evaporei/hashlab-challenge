#!/bin/sh

./user/scripts/migrate-up.sh || exit $?
./product/scripts/migrate-up.sh || exit $?
