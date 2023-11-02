# Change Log

## [1.4.0]
- Converted code to ES modules
- New library for glm code parsing
- Added esbuild config

## [1.3.8]
- Removed "math.round" suggestion since it doesn't actually return an integer so math.floor(n + 0.5) ~= math.round(n)

## [1.3.7]
- Cleaned up extension code some more
- Improved the extensions display name

## [1.3.6]
- Fixed diagnostics breaking
- Cleaned up extension code
- Added vector swizzle hover information

## [1.3.5]
- Added workspace indexing to improve performance
- Added definition provider using the workspace index
- Improved performance of diagnostics
- Improved and extended native hover information

## [1.3.4]
- Fixed bug where the lua-glm parser would incorrectly replace "in ipairs" with "table.unpack"

## [1.3.3]
- More fixes to the lua-glm parser
- Added info diagnostic for math.floor(x + 0.5) to math.round(x)

## [1.3.2]
- Fixed a few issues with the lua-glm parser
- The "in" quick fix now properly unwraps parentheses

## [1.3.1]
- Fixed the slightly borked README.md

## [1.3.0]
- Improved quick fix support, adding a lot more quick fixes
- Lua parser now supports most of [Lua-GLM](https://github.com/citizenfx/lua/blob/luaglm-dev/cfx/README.md)
- Added setting to disable Lua-GLM support
- Slightly improved settings by enabling markdown

## [1.2.15]
- Improved diagnostics performance by using timeouts
- Clear diagnostics when language id is changed

## [1.2.14]
- Added some more knowledge about Citizen.Wait

## [1.2.13]
- Added a "Collect Statistics" context option

## [1.2.12]
- Fixed a small issue where files named "observer" were incorrectly classed as server-side files

## [1.2.11]
- Added a "Convert to fxmanifest.lua" context option for __resource.lua files

## [1.2.10]
- Fixed even more parameters sometimes ending up as returns instead
- Fixed floats sometimes being accepted as other types
- Added some custom overrides for incorrect native parameter types

## [1.2.9]
- Fixed more parameters sometimes ending up as returns instead
- Added ignore native command and context action
- Lines preceded by "-- IGNORE" are now not considered for some diagnostics
- Fixed negative numbers not being considered for diagnostics
- Linting a whole folder will now show how many issues were found
- Fixed context being set to client if the file ended with "_sv"

## [1.2.8]
- Fixed parameters sometimes ending up as returns instead
- Small fixes to the type and parameter count check

## [1.2.7]
- Check if native parameter count is correct
- Check if basic native parameter types are correct

## [1.2.6]
- Fixed code completions not being inline on "not"

## [1.2.5]
- Fixed void returns adding "local retval"
- "Organize List" context action

## [1.2.4]
- Added a formatter
- Added lua syntax diagnostics

## [1.2.3]
- Added a few helpful context actions like "New resource"
- Added some snippets
- Show warning message when unable to update natives

## [1.2.2]
- Improve speed of statistics
- Fixed some issues with code completion in if/while/etc. statements

## [1.2.1]
- Fixed native search not working (oops)
- Cache natives for offline usage

## [1.2.0]
- Added a built in search tab
- Fixeded inline native reference links not working

## [1.1.1]
- Added a check for excessive newlines
- "Fix all Diagnostics" will now properly fix **ALL** diagnostics
- Fixeded "Lint Folder" not working on the root folder
- Only run diagnostics on lua files

## [1.1.0]
- Massively improved completion and diagnostic speed
- Added "Fix all Diagnostics" command
- Added trailing whitespace detection
- Fixeded "Lint Folder" not working on directories including "[]"

## [1.0.5]
- Added `vs-fivem.lintFolder` command to lint all files in a folder
- Added explorer context menu option to lint a folder
- Improved performance of linting
- Fixeded bug where some natives aliases were the same as their current name

## [1.0.4]
- Searching for natives including the search string not only ones that start with it

## [1.0.3]
- Using a natives hash (e.g. `N_0xD716F30D8C8980E2`) instead of its name will now highlight it as a warning
- Fixeded certain custom functions being highlighted as warnings

## [1.0.2]
- Old native aliases are now highlighted as warnings

## [1.0.0]

- Initial release
