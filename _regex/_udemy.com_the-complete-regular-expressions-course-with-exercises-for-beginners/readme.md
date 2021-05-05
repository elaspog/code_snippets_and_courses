
# The Complete Regular Expressions Course with Exercises 2020

https://www.udemy.com/course/the-complete-regular-expressions-course-with-exercises-for-beginners

## S00 undefined

### S00/E01 Course

### S00/E02 Dont be this guy

## S01 Establishing Environment

### S01/E03 What is Regular Expression

- *regex*, *regexp*
- string related operations:
  - match text
  - search in text
  - find / replace
  - move text
  - validation

### S01/E04 RE Engines

- engines:
  - C, C++
  - .NET
  - PHP
  - Java
  - JavaScript
  - Python
  - MySql
  - Unix Tools (POSIX, BRE, ERE)
  - Apache (POSIX, BRE, ERE)
  - Perl

### S01/E05 RE Offline Engines

- PowerGrep
- RegexMagic
- Chrome Extensions
- Firefox Extensions
- Mobile Applications
- Editors:
  - Notepad++, Komodo IDE, Sublime Text, Brackets

### S01/E06 RE Online Engines

https://regex101.com  
https://regexpal.com  

- Google: online regex tester

## S02 All about Characters

https://regex101.com  

### S02/E07 Basic Syntax

- Enclose in literals such as `/`
  - e.g.: `/regex/`, `/abcde/`
- delimiters: `/`, `~`, `@`, `;`, `%`, `#`, `` ` ``

### S02/E08 Literal Characters

- **literal characters** - matches with text
- regex: `/ohn/`
  - matches: `ohn`
  - does not match: `John`, `mohn`
- regex: `/color/`
  - matches: `color`
  - does not match: `colour`

### S02/E09 Modes

- modes are placed after ending `/`
  - `/regex/mode`
- multiple modes can be used at the same times
- **modes**:
  - `/regex/` - standard mode
  - `/regex/g` - global mode - don't return after first match
  - `/regex/s` - single line mode - dot matches newline
  - `/regex/i` - case insensitive mode - case insensitive match
  - `/regex/m` - multi line mode - `^` and `$` match start/end of line
  - `/regex/x` - extended mode - ignore whitespace
  - `/regex/X` - extra mode - disallows meaningless escapes
  - `/regex/U` - ungreedy - make quantifiers lazy
  - `/regex/A` - anchored - anchor to start of pattern, or at the end of the most recent match
  - `/regex/J` - Jchanged - allow duplicate subpattern names
  - `/regex/D` - dollar end only - matches only end of pattern

### S02/E10 Meta Characters

- meta characters/symbols/operators: `*+-!=(){}[]^$|?:\.`

### S02/E11 WildCard

- **wildcard** `.` matches any character except newline
  - this behavior changes in single line mode `/regex/s`
    - this is not supported in Ruby and JavaScript
- regex: `/.ohn/g`
  - matches: `John`, `mohn`
- regex: `/.ut/g`
  - matches: `cut`, `put`
- regex: `/Dr. Jabez/g`
  - matches: `Dr. Jazeb`, `Drt Jazeb`, `Drz Jazeb`
- regex: `/Dr\. Jabez/g`
  - matches: `Dr. Jazeb`
  - does not match: `Drt Jazeb`, `Drz Jazeb`
- regex: `/3.14/g`
  - matches: `3414`, `3514`, `3-14`
- regex: `/3\.14/g`
  - matches: `3.14`
  - does not match: `3414`, `3514`, `3-14`
- regex: `/students_record.txt/g`
  - matches: `students_record.txt`, `students_recordptxt`
- regex: `/students_record\.txt/g`
  - matches: `students_record.txt`
  - does not match: `students_recordptxt`
- regex: `/students.record\.txt/g`
  - matches: `students_record.txt`, `students-record.txt`


- space is also a character in Regex
- regex: `/export to china/g`
  - matches: `export to china`
  - does not match: `export tochina`
- regex: `/export to china /g`
  - matches: `export to china `
  - does not match: `export to china`

### S02/E12 Character Set

- **character set** `[]` - matches any character from this set
- regex: `/[cd]ash]/g`
  - matches: `cash`, `dash`
  - does not match: `tash`
- regex: `/[vr]a[nd]ish]/gi`
  - matches: `vanish`, `Radish`
  - does not match: `zanish`, `danish`

### S02/E13 Character Ranges

- **character ranges** `-` - shortens a range of characters with consecutive characters
  - `[a-z]` shortens `[abcdefghijklmnopqrstuvwxyz]`
  - `[A-Z]` shortens `[ABCDEFGHIJKLMNOPQRSTUVWXYZ]`
  - `[a-zA-Z]` shortens `[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]`
    - there is no range between `z` and `A` that's why there is no dash
  - `[0-9]` shortens `[0123456789]`
    - can't add range between numbers like `[55-60]` or `[70-80]`


- regex: `/[abcdefghijklmnopqrstuvwxyz] team/g` or `/[a-z]/g`
  - matches: `a team`, `t team`, `z team`
  - does not match: `ac team`, `A team`, `B team`, `aB team`
- regex: `/[A-Z]/g`
  - matches: `A team`, `B team`
  - does not match: `a team`, `t team`, `z team`, `ac team`, `aB team`
- regex: `/[A-Za-z]/g` or `/[a-zA-Z]/g`
  - matches: `A team`, `B team`, `a team`, `t team`, `z team`
  - does not match: `ac team`, `aB team`
- valid regex: `/[a-c]/g`
  - matches: `a team`
- valid regex: `/[a-u]/g`
  - matches: `a team`, `t team`
- valid regex: `/[c-u]/g`
  - matches: `t team`
- valid regex: `/[7-9]/g`, `/[0-3]/g`
- not valid regex: `[55-45]`
- valid regex: `5[0-5]`
  - matches: `50`, `51`, `52`, `53`, `54`, `55`
  - does not match: `49`, `56`

### S02/E14 Restricting RE

- **restricting set** `[^]` - matches any character except what's in the set
- regex: `/[^abcdef]/g` - matches every character except `abcdef`
  - matches: `g`, `h`
- regex: `/[^cd]ash/g` - matches 4 characters ending with `ash` except `cash`, `dash`
  - matches: `fash`
- regex: `/[^vr]a[nd]ish/g` - matches 6 characters containing `a` in second position, containing `n` or `d` in third position and ending with `ish` except `vanish`, `vadish`, `radish`, `ranish`
  - matches: `tanish`, `zadish`

### S02/E15 Escaping Meta Characters

- **excaping* `\` - escapes special characters
- regex: `/jazeb\/akram/g`
  - matches: `jazeb/akram`
- regex: `/jazeb\.akram/g`
  - matches: `jazeb.akram`
- regex: `/C\:\\Users\\Jazeb\\Documents\\student\.txt/g`
  - matches: `C:\Users\Jazeb\Documents\student.txt`


- whitespace escaping:
  - tab: `\t`
  - line ending: `\n`, `\r` or `\r\n`
- regex: `/C\:\\Users\\Jazeb\\Documents\\student\.txt\t/g`
  - matches: `C:\Users\Jazeb\Documents\student.txt  `

### S02/E16 Escaping Sets

- every meta character should be escaped in regular expressions: `*+-!=(){}[]^$|?:\.`
- in character sets only certain meta characters should be escaped: `[-/*]]`
- escaping of the meta characters can be different in different engines but only these 4 meta characters need to be escaped in character sets
- regex: `/[\-\/\*\]]/g`
  - matches: `-`, `/`, `*`, `]`

### S02/E17 Ending Chapter

- `\w` same as `/[a-zA-Z0-9_]/` - word characters and underscore
- `\W` same as `/[^a-zA-Z0-9_]/` - no word characters and no underscore
- `\s` same as `/[\t ]/` - tab and space
- `\S` same as `/[^\t ]/` - no tab and no space
- `\d` same as `/[0-9]/` - digits only
- `\D` same as `/[^\d]/` or `/[^0-9]/` - no digit
- supported in all engines except old Unix tools


- regex: `/\w/g`
  - matches: `a`, `T`, `0`, `_`
  - does not match: `-`
- regex: `/\W/g`
  - does not match: `a`, `T`, `0`, `_`
- regex: `/\s/g`
  - matches: ` ` (space), ` ` (tab)
- regex: `/\S/g`
  - does not match: ` ` (space), ` ` (tab)
- regex: `/\d/g` or `/[\d]/g`
  - matches: `0`, `1`, `9`
- regex: `/\D/g` or `/[\D]/g` or `/[^\d]/g`
  - does not match: `0`, `1`, `9`
