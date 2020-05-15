#!/bin/sh

# Decrypt the file
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --yes --decrypt --passphrase="$GPG_PASSPHRASE" --o .env -d .github/.env-stage.gpg
