
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

## S03 Quantifiers and Repetitions

https://regex101.com  

### S03/E18 Quantifiers and Repetitions

- **quantifier repetition**
  - `*` - matches zero or more of previous characters
  - `+` - matches one or more of previous characters
  - `?` - matches zero or one of previous characters
- supported by all engines except old Unix tools like BRE


- regex: `/Flavou?r/g`
  - matches: `Flavor`, `Flavour`
- regex: `/Flavou?r/g`
  - matches: `Flavor`, `Flavour`
- regex: `/Encyclopa?edia/g`
  - matches: `Encyclopaedia`, `Encyclopedia`
- regex: `/Buz*/g`
  - matches: `Bu`, `Buz`, `Buzz`, `Buzzz`, `Buzzzz`
- regex: `/[0-9][0-9][0-9][0-9]+/g`
  - matches: `0123`, `6565`, `5685444646450`, `454545`
  - does not match: `012`, `2`, `86`

### S03/E19 Limiting Repetition

- **quantified repeition**
  - `{num_exact}` - match exactly number of previous
  - `{num_min, num_max}` - match at least min but not more than max of previous characters
  - `{num_min,}` - match at least min of previous


- regex: `/[0-9]{3}/g`
  - matches: `000`, `723`, `458`, `787`
  - does not match: `45`, `4545`, `1`, `12`, `89`
- regex: `/[0-9]{3,}/g`
  - matches: `000`, `723`, `4545`, `5664455`, `458`, `787`
  - does not match: `45`, `1`, `12`, `89`
- regex: `/[0-9]{3,5}/g`
  - matches: `000`, `723`, `4545`, `458`, `78963`
  - does not match: `45`, `5664455`
- regex: `/[0-9]{3}-[0-9]{3}-[0-9]{4}/g`
  - matches: `000-454-7845`, `000-478-8446`
  - does not match: `000-454-45782`, `1-454-4444`, `456-8-54555`
- regex: `/\w+-SSN-\d{9}-DOB-\d{4}/g`
  - matches: `Johnson-SSN-059754623-DOB-1994`, `Peter-SSN-657454623-DOB-1964`
  - does not match: `Laal-SSN-657454623-DOB-64`, `Hassan-SSN-7844426458-DOB-1999`
- regex: `/[a-z]{3,}/g`
  - matches: `aaa`, `zzzzz`, `uuiaia`, `tasasasas`
  - does not match: `p`, `aa`

### S03/E20 Greedy Expressions

- regular expression engine are greedy
- regex tries to repeat the quantifier (`*+?`) as many times as possible
- greedy algorithm:
  - for every position in the string
    - match the pattern at that position
    - if there is no match, go to the next position


- regex: `/".+"/g`
  - in `earth has "mountains" and many "seas" to explore`
  - matches `"mountains" and many "seas"`
  - where first selects by `.+`, finds the end of the string, then backtracks
- regex: `/.*[0-9]+/`
  - in `agent 007`
  - matches `agent 00` by pattern `.*` and `7` by `[0-9]+`

### S03/E21 Lazy Expressions

- lazy mode `?` after quantifiers (`*+?`) - is the opposite of greedy mode
  - `*?`
  - `+?`
  - `??`
- **greedy mode**: *repeat maximum number of times*
- **lazy mode**: *repeat minimum number of times*


- regex: `/".+?"/g`
  - in `earth has "mountains" and many "seas" to explore`
  - matches `"mountains"` and `"seas"` (multiple matches because mode `g`)
  - where after finding the first `"`, it searches for `.` the minimum number of times, until it finds the second `"`
  - the same result is given by non-lazy `/"[^"]+/g"`
- regex: `/.*?[0-9]+/`
  - in `agent 007`
  - matches `agent ` by pattern `.*` and `007` by `[0-9]+`

### S03/E22 Greedy Lazy Testing

- difference in behavior between greedy and lazy approach
- regex: `/\d+ \d+?/g`
  - in string `123 456` matches `123 4`
  - in string `123 4567896 5` matches `123 4` and `567896 5`

## S04 Groups

https://regex101.com

### S04/E23 Groups

- **groups** `()`
  - can't be used inside a character set `[()]`
- used in **find & replace**


- regex: `/(xyz)+/g`
  - matches: `xyz`, `xyzxyz`
  - does not match: `xyzxcz`
- regex: `/([a-z]+[0-9]{0,3})/g`
  - matches: `zero team`, `longisland team`, `redbay777 team`
  - does not match: `beach7777 team`

### S04/E24 Alternation

- **choice or alternation** `|`


- regex: `/boy|girl/g`
  - matches: `boy`, `girl`
  - does not match: `boygirl`, `man`
- regex: `/I think Pakistan/India/Australia will win a world cup 2050/g`
  - matches: `I think Pakistan`, `India`, `Australia will win a world cup 2050`
- regex: `/I think (Pakistan/India/Australia) will win a world cup 2050/g`
  - matches: `I think Pakistan will win a world cup 2050`, `I think India will win a world cup 2050`, `I think Australia will win a world cup 2050`
  - does not match: `I think America will win a world cup 2050`

### S04/E25 Nested Alternation

- regex: `/((usa|china) likes blue|(russia|canada) likes green)/g` or `/(((usa|china) likes blue)|((russia|canada) likes green))/g`
  - matches: `usa likes blue`, `china likes blue`, `russia likes green`
  - does not match: `usa likes bluecanada likes green`, `usa likes green`, `china likes green`

### S04/E26 Anchors

- **anchor**
  - don't match any character
  - match a position before/after/between characters
  - `^` - match at the beginning of the string or line
  - `$` - match at the end of the string or line, or before `\n` at the end of the string or line
- `^`, `$`
  - supported by all regex engines
  - useful to use in `m` mode
- **warning**: `^[...]` should not be confused with `[^...]`
  - the former is an anchor to the beginning of the line
  - the later is restricting set
  - the combination can be used: `^[^...]`


- regex: `/^a[y-z]+o$/g`
  - matches: `azo` if only this string is tested, `ayo` if only this string is tested
  - does not match: `azo` if `ayo` is present, `ayo` if `azo` is present, `axo`
- regex: `/^a[y-z]+o$/gm`
  - matches (because of multiline): `azo`, `ayo`
  - does not match: `axo`
- regex: `/^[a-z]+$/gm`
  - matches: `red`, `blue`, `yellow`, `green`, `black`
- regex: `/^[a-z]+$/g`
  - when the tested string (in different lines) is `red`, `blue`, `yellow`, `green`, `black`
  - does not match: `red`, `blue`, `yellow`, `green`, `black`

### S04/E27 Another Anchors Example

- in test input: ```Hi, my name is Will Smith.I acted in many movies. i have a huge following. People like me all over the world due to my acting and social work.It's his life.```
- the first sentence is selected by: `^[A-Z][a-zA-Z, ]+\.` or `^[A-Z][a-zA-Z ',]+\.`
- the last sentence is selected by: `[A-Z][a-zA-Z ',]+\.$`

### S04/E28 Other Alternative Anchors

- **anchor**
  - `\A` - match at the beginning of the string only (no multiline support)
  - `\Z` - match at the end of the string, or before `\n` at the end of the string
  - `\z` - match at the end of the string only
    - opposite of `\Z`
- `\A`, `\Z`, `\z`
  - supported by: .NET, Python, PHP, Ruby, Perl, Java
- better to use `^` and `$` instead because of the better support


- on test input:
```
M is my name
M is my name
M is my name
M is my name
```
- regex: `/\AM is my name/gm` or `/\AM is my name/g`
  - matches the first line
- regex: `/M is my name\Z/gm` or `/M is my name\Z/g`
  - matches the last line

### S04/E29 Word Boundaries

- **anchor**
  - `\b` - match at a word boundary
  - `\B` - match not at a word boundary
- conditions of **word boundary**:
  - **word character**: (`[a-zA-Z0-9_]` or `\w`)
  - before the first character in the string, if the first character is a word character
  - after the last character in the string, if the last character is a word character
  - between two characters in the string, where one is a word character and the other is not a word character
- `\b`, `\B`
  - not supported in Unix BRE
- `\bword\b` - to perform whole words only search for `word`
  - `\b\w+\b`
- word boundaries are not characters and have zero length, they are just representing positions of characters


- regex: `/\b\w+\b/g`
  - matches: `jazebakram`, `jazeb_akram`, `jazeb12345akram`
  - does not match: `jazeb-akram`
  - matches: `jazeb` and `akram` in `jazeb-akram`
- regex: `/\b-\b/g`
  - does not match: `-` because it doesn't belong to word character
- on test input: `roses are red`
  - regex: `/roses\bare\b red/g` does not match because space itself is a character
  - regex: `/roses \bare\b red/g` matches
- in test input: ```Hi, my name is Will Smith.I acted in many movies. i have a huge following. People like me all over the world due to my acting and social work. it's his life.```
  - regex: `/\b[A-Z]+\b/g`
    - returns word `I`
  - regex: `/\b[a-z]+\b/g`
    - returns words which are in lower case and have no characters other than word character, like: `my`, `name`, `is`, `acted`, `in`, `many`, `movies`, `i`, `have`, `a`, `huge`, `following`, `like`, `me`, `all`, `over`, `the`, `world`, `due`, `to`, `my`, `acting`, `and`, `social`, `work`, `it`, `s`, `his`, `life`

## S05 Advance Topics in Groups

https://regex101.com

### S05/E30 Capturing and Back-references

- **Backreferences** for **Groups** - captured data can be referenced
  - useful for Find and Replace text
  - group stores the data but not the expression
  - groups can't be used inside character sets `[()]`
  - engine support:
    - most: `\1` ... `\9`
    - some: `$1` ... `$9`


- regex: `/(ab)(cd)\1\2/`
  - matches: `abcdabcd`
- regex: `/(ab)(cd)\2/`
  - matches: `abcdcd`
- regex: `/(ab)(cd)(jazeb)(akram)\2\4/`
  - matches: `abcdcdjazebakramcdakram`
- regex: `/(Bruce) Wayne \1/`
  - matches: `Bruce Wayne Bruce`

### S05/E31 Capturing and Back-references Examples

- in test input: ```Hi, my name is Will Smith.I acted in many movies. i have a huge following. People like me all over the world due to my acting and social work. it's his life.```
  - regex: `/\b(\w)+\b/g` matches all the words
  - regex: `/\b(\w)+\b\1/g` matches nothing
  - regex: `/\b(\w)+\b \1/g` matches `world d`
    - because `+` is outside of the captured group
  - regex: `/\b(\w+)\b \1/g` matches `many many`
- in test input:
```
<em>Hi, my name is Will Smith.I acted in many movies. i have a huge following. People like me all over the world due to my acting and social work. it's his life.</em>
<h1>tag is </h1>
<p>jadhajdhaj</p>
```
  - regex `/<em>[a-zA-Z ,'\.]<\/em>/g` matches the first element of HTML content
  - regex `/<([a-z][a-z0-9]*)>.*<\/\1>/g` matches all the elements of HTML content
- in test input:
```
<em>>Hi, my name is Will Smith.I acted in many movies. i have a huge following. People like me all over the world due to my acting and social work. it's his life.</em>
<h1>tag is </h1>
<p>jadhajdhaj</p>
```
  - regex `/<([a-z][a-z0-9]*)\b[^>]*>.*<\/\1>/g` matches all the elements of HTML content when the content of the element starts with `>` character

### S05/E32 Application

- in test input:
```
01-SSN 789545142 Alan kook 1992
02-SSN 685545142 Kin Adams 1991
03-SSN 789545555 Jummy Adams 1990
04-SSN 752145572 Nicholas Sardieg 2020
05-SSN 122545142 James Nishator S.Kaka 1961
...
30-SSN 564600055 Nash John 2014
```
- regex: `/^d{1,2}-\w{3}\s\d{9}\s[\w .]+?[\w .]+?\s\d{4}/gm` matches all lines
- regex: `/^(d{1,2})-(\w{3})\s(\d{9})\s([\w .]+?)\s([\w .]+?)\s(\d{4})/gm` captures the fields
  - in editor replace by pattern with **Find and Replace**:
    - `$1:$2 $3 $4 $5 $6` - form id it changes the `-` to `:`
    - `$1-$2 $3 $5, $4 $6` - changes the order of the name
    - `$1-$2 $3 $4 $5 $6,` - puts `,` at the end of the record

### S05/E33 Non Capturing Groups

- **Non-Capturint Groups** `(?:)`
  - increases speed of regular expressions
  - makes room to capture necessary groups
  - supported by most regex engines except old Unix tools


- regex: `/(ab)(?:cd)\1/`
  - matches: `abcdab`
  - does not match: `abcdabcd`
- in regex: `/(ab)(?:cd)\1\2/` the second group is not captured and `\2` can't be referenced
- regex: `/(?:red) looks (white) \1 to me/`
  - matches: `red looks white white to me`
  - does not match: `red looks white red to me`
