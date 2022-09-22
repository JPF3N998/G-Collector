# Vue 3 + TypeScript + Vite Template for a Chrome Extension

_Manifest V3 by the way :)_

# Install packages

`<pkg manager> install`

# Features

✅ Content Script Set

✅ Background Service Worker Set

✅ ES modules

# Considerations

- Content Script is turned into an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) during build
  - Two separate vite config builds (two separate `vite.config` files) are run for this due to how `vite build` runs [Suggestion by Evan himself](https://github.com/vitejs/vite/issues/2039#issuecomment-779356090)

# Motivation

Wanted to attempt creating a Chrome Extension with manifest V3 due to V2 being deprecated soon. My career started by working with Vue 2, making it a no brainer to choose this framework. Vue 3 is the new official version so I'm also learning it through this. Vite also is gaining traction so also learing about it. Additionally, I've seen TS but haven't fully put it to practice so basically I'm learning 4 technologies at the same time here. :)

# Roadmap

- Show buttons to help users redirect and extract from a specific collection instead of them having to manually go there and run the extension

- UI improvement

- Integration with 3rd party apps:
    - Guardo.io
    - Pocket
    - Notion
    - etc.

# **Not** best practices

- All commits to master instead of having a dev/feature branch