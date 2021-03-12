#!/bin/sh
set -e

if [ -z "$CHAMBER_SERVICE" ]; then
  exec $@
else
  exec chamber exec $CHAMBER_SERVICE -- $@
fi
