# VS FiveM IntelliSense

This extension adds FiveM native support, code-completions, diagnostics and helpful commands for lua files.

### Support for most of FiveM's [lua-glm](https://github.com/citizenfx/lua/blob/luaglm-dev/cfx/README.md) extensions
```lua
-- Support +=, -=, *=, /=, <<=, >>=, &=, |=, and ^= operators
test += 123

-- Same as: local a, b, c = t.a, t.b, t.c
local a, b, c in t

-- Safe Navigation
local a = t?.a?.b?.c

-- GLSL style vector swizzling
local a = t.xyz
```

![glm](.github/glm.png)

### Detailed native documentation
Natives are automatically updated from the FiveM documentation.

![documentation](.github/documentation.png)

### Definition provider
You can jump to the definition of any function you defined in your code by holding CTRL and clicking on the function name.

![definitions](.github/definitions.png)

### Built in search

![search](.github/search.png)

### Auto-completion & Formatter
The extension will try to detect the context of the current file (server or client) and will prioritize natives that are available in that context.

The native also provides a lua formatter, that is integrated with the other vscode formatters.

![suggestions](.github/suggestions.png)

### Diagnostics & Bad-Practice warnings

![syntax](.github/syntax.png)

![diagnostics](.github/diagnostics.png)

![replace](.github/replace.png)

### Helpful snippets

![snippets_1](.github/snippets_1.png)

![snippets_2](.github/snippets_2.png)

### Easy and quick resource generation

![new_resource_1](.github/new_resource_1.png)

![new_resource_2](.github/new_resource_2.png)

![new_resource_3](.github/new_resource_3.png)

### Quickly find all issues in a directory and fix them with 2 clicks

![lint-folder](.github/lint-folder.png)

![fix-all](.github/fix-all.png)

### Statistics
Displays statistics related to the current file in the status bar.

![statistics](.github/statistics.png)
