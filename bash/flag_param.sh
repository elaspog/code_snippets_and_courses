#!/bin/bash

SOME_VARIABLE=""

if [[ $* == "--someFlag" ]] ; then
	SOME_VARIABLE="some value"
fi

echo ${SOME_VARIABLE}
