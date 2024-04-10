# VS FiveM IntelliSense

This extension adds FiveM native support, code-completions, diagnostics and helpful commands for lua files.

I recommend also getting [sumneko's lua language server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) for reference finding, lua auto-completion and more helpful features. To not interfere with this extension i'd also turn off `Lua.diagnostics.enable`, `Lua.semantic.variable` and increasing `Lua.workspace.preloadFileSize` if necessary.

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

-- C-Style Comments
/* This is a comment */

-- Compile Time Jenkins' Hashes
`Hello, World!` -- 1395890823
```

![glm](.github/glm.png)

### Detailed native documentation
Natives are automatically updated from the FiveM documentation.

![documentation](.github/documentation.png)

### Built in search

![search](.github/search.png)

### Auto-completion
The extension will try to detect the context of the current file (server or client) and will prioritize natives that are available in that context.

![suggestions](.github/suggestions.png)

### Inline Hints

![inline_hints](.github/inline_hints.png)

### Color highlighting
The extension will automatically try to detect any color values and highlight them.

![colors](.github/colors.png)

### Hover support
The extension will show a preview of a hash function when hovering over it. With lua-glm enabled it also provides hover suggestions for vector swizzling.

![joaat](.github/joaat.png)

![swizzle](.github/swizzle.png)

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
