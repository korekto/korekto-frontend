#!/usr/bin/env -S just --justfile

set dotenv-filename := '.env-just'

_default:
  @just --list --unsorted --justfile '{{justfile()}}'

lint:
  npm run fmt && npm run check && npm run eslint

run:
  npm run dev