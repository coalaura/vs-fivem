# Change Log

## [1.2.2]
- Improve speed of statistics
- Fix some issues with code completion in if/while/etc. statements

## [1.2.1]
- Fix native search not working (oops)
- Cache natives for offline usage

## [1.2.0]
- Added a built in search tab
- Fixed inline native reference links not working

## [1.1.1]
- Added a check for excessive newlines
- "Fix all Diagnostics" will now properly fix **ALL** diagnostics
- Fixed "Lint Folder" not working on the root folder
- Only run diagnostics on lua files

## [1.1.0]
- Massively improved completion and diagnostic speed
- Added "Fix all Diagnostics" command
- Added trailing whitespace detection
- Fixed "Lint Folder" not working on directories including "[]"

## [1.0.5]
- Added `vs-fivem.lintFolder` command to lint all files in a folder
- Added explorer context menu option to lint a folder
- Improved performance of linting
- Fixed bug where some natives aliases were the same as their current name

## [1.0.4]
- Searching for natives including the search string not only ones that start with it

## [1.0.3]
- Using a natives hash (e.g. `N_0xD716F30D8C8980E2`) instead of its name will now highlight it as a warning
- Fixed certain custom functions being highlighted as warnings

## [1.0.2]
- Old native aliases are now highlighted as warnings

## [1.0.0]

- Initial release
