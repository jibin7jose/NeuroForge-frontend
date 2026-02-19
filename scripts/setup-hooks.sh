#!/usr/bin/env sh
set -eu
git config core.hooksPath .githooks
echo "Configured core.hooksPath=.githooks"
