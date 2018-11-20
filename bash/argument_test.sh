#!/bin/bash

echo "Start"

: ${1?"Usage: $0 XXX YYY"}
: ${2?"Usage: $0 XXX YYY"}

echo $1
echo $2

echo "End"

# bash argument_test.sh				# error - usage is printed
# bash argument_test.sh 111			# ok
# bash argument_test.sh 111 222		# ok
# bash argument_test.sh 111 222 333	# ok - but not correct
