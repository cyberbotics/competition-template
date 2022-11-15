#!/bin/bash

body_text=$1
echo $body_text
regex='github.com/[[[:alnum:]._-]+/([[:alnum:]._-]+)'
if [[ $body_text =~ $regex ]]
then
  user_repo="$2/${BASH_REMATCH[1]}"
  echo "$user_repo"
else
  user_repo="REGEX failed"
  exit 1
fi
echo "USER_REPO=$user_repo" >> $GITHUB_ENV
