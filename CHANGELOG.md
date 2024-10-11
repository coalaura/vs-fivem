# Change Log

## [3.0.3]
- Fixed fix all and lint folder not working properly at times.

## [3.0.2]
- Fixed argument issues not highlighting the right location.
- Improved indexing speed and skip indexing in non-workspace environments.
- Fixed logical expression with variables in arguments always resulting in a `boolean`.

## [3.0.1]
- Fixed extension breaking in non-workspace environments.
- Fixed issues where native would not accept types even though it expects `any`.
- Properly evaluate literal expressions.
- Fixed various issues caused by the rewrite.

## [3.0.0]
- Rewrote most of the codebase.
- Major performance improvements.
- Caching of indexes.
- Only fetching natives once a day.
- Fixed various issues with decorators and diagnostics.
- Removed some unnecessary settings.
- Improved the hints and event-definition providers (**MUCH** faster).

## [2.1.4]
- Debounced the hints provider to improve performance.

## [2.1.3]
- Performance improvements when indexing and linting the workspace.

## [2.1.2]
- Added even more hints for various natives.

## [2.1.1]
- Fixed theme color being incorrect.

## [2.1.0]
- Improved logo and nav icon.

## [2.0.19]
- Added more hints to control natives.
- Added hints for `InvokeNative` if the offset is known.
- Added more ped motion state hashes.

## [2.0.18]
- Add joaat reverse command and context action
- Added inline hints for `DisableControlAction` and `EnableControlAction`
- Fixed diagnostic notification showing NaN at times
- Added a `excludeFilesRegex` config option

## [2.0.17]
- Fix an error where diagnostics would not work a lot of the times
- Made syntax error diagnostics optional (can be changed in the settings)

## [2.0.16]
- Dropped (expensive) definitions support (except for events) in favor of [sumneko's lua language server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
- Fixed event definitions not properly working sometimes

## [2.0.15]
- Added inline hints for ped motion states, vehicle mods and vehicle wheel types

## [2.0.14]
- Updated the list of ped config flags
- Added optional performance hints (can be toggled on in settings)

## [2.0.13]
- Fixed a regex matching too much when providing lua-glm suggestions

## [2.0.12]
- Using [luaparse-glm](https://npmjs.com/package/@coalaura/luaparse-glm) when resolving function calls for better accuracy

## [2.0.11]
- Added inline hints for `SetPedConfigFlags`, `GetPedConfigFlags` and `GetIsTaskActive`
- Added a "Clear all Diagnostics" command

## [2.0.10]
- Added a "Convert JSON to Lua" command & context action

## [2.0.9]
- Removed some leftover debug code

## [2.0.8]
- Added a new diagnostic to prevent "accidental" native overrides

## [2.0.7]
- Some new snippets
- The event search is now toggled by a setting
- Fixed apiset (context) being "shared" by default instead of "client"

## [2.0.6]
- Improved snippets

## [2.0.5]
- When ctrl-clicking on a definition itself, a global search will be performed now

## [2.0.4]
- Added snippet support (e.g. typing `thread` then pressing enter will insert `Citizen.CreateThread(function()end)`)

## [2.0.3]
- Improved resource generation (context action)
- Fix index not being rebuilt properly when a file is changed

## [2.0.2]
- Upgraded [luaparse-glm](https://npmjs.com/package/@coalaura/luaparse-glm) to fix a few issues with parsing

## [2.0.1]
- Improved type checking for natives
- Events now also have "go-to-definition" support
- Improved indexing performance and speed by multiple orders of magnitude
- Fixed some natives having their returns and parameters flipped
- Refactored function call parsing to handle a lot more edge cases
- Improved color highlighter

## [2.0.0]
- Completely rewrote the extension, cleaning up the code a lot
- Added a color highlighter
- Various improvements making the extension faster and more stable

## [1.4.2]
- Further optimizations to build process
- Fixed a few issues with the hover provider
- Added JOAAT hash hover previews

## [1.4.1]
- Optimized build process to reduce extension size

## [1.4.0]
- Converted code to ES modules
- New library for glm code parsing
- Added esbuild config

## [1.3.8]
- Removed `math.round` suggestion since it doesn't actually return an integer so `math.floor(n + 0.5) ~= math.round(n)`

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
- Fixed bug where the lua-glm parser would incorrectly replace `in ipairs` with `table.unpack`

## [1.3.3]
- More fixes to the lua-glm parser
- Added info diagnostic for `math.floor(x + 0.5)` to `math.round(x)`

## [1.3.2]
- Fixed a few issues with the lua-glm parser
- The `in` quick fix now properly unwraps parentheses

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
- Added some more knowledge about `Citizen.Wait`

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
- Fixed code completions not being inline on `not`

## [1.2.5]
- Fixed void returns adding `local retval`
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
- Fixed some issues with code completion in `if`/`while`/etc. statements

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
