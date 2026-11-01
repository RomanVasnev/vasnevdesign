#!/bin/sh
# собирает архив для Yandex Cloud Functions из функции и базы знаний — by vasnev.art
cd "$(dirname "$0")/.." || exit 1
T=$(mktemp -d) && cp yc-function/index.js api/_knowledge.js "$T"/ && (cd "$T" && zip -q fn.zip index.js _knowledge.js) && cat "$T/fn.zip" > yc-function.zip && echo "готово: yc-function.zip"
