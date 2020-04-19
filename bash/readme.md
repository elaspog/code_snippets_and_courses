
# Cheatsheet

## Run bash scripts from any directory:
```
cd "$(dirname "$0")"  # script directory context form anywhere
```

## Shebang

```
#!interpreter [arguments]
```

```
#!/bin/bash
or
#!/usr/bin/env bash
```
- `env` based solution
  - uses the `env` command to find the path to the bash executable (first match is selected)
  - searches for the bash executable in the user’s `$PATH` environmental variable

**Execute:**

```
chmod +x script.sh
./script.sh
```

**Debug mode:**

```
#!/bin/bash -x
or
#!/usr/bin/env bash
set -x
```

**Override existing:**

`script.sh`:
```
#!/bin/sh
...
```

```
bash script.sh
```
