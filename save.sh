#!/bin/sh
# Saves all changes to GitHub. Usage: sh save.sh "what changed"
cd "$(dirname "$0")"
git add -A
git commit -m "${1:-Update}" || echo "Nothing new to save"
git push
