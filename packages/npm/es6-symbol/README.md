# @socketregistry/es6-symbol

[![Socket Badge](https://socket.dev/api/badge/npm/package/@socketregistry/es6-symbol)](https://socket.dev/npm/package/@socketregistry/es6-symbol)
[![CI - @socketregistry/es6-symbol](https://github.com/SocketDev/socket-registry/actions/workflows/test.yml/badge.svg)](https://github.com/SocketDev/socket-registry/actions/workflows/test.yml)
[![Follow @SocketSecurity](https://img.shields.io/twitter/follow/SocketSecurity?style=social)](https://twitter.com/SocketSecurity)

> A tested zero dependency drop-in replacement of
> [`es6-symbol`](https://socket.dev/npm/package/es6-symbol) complete with
> TypeScript types.

## Installation

### Install as a package override

[`socket`](https://socket.dev/npm/package/socket) CLI will automagically ✨
populate
[overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides)
and [resolutions](https://yarnpkg.com/configuration/manifest#resolutions) of
your `package.json`.

```sh
npx socket optimize
```

Prefer to do it yourself? Add `@socketregistry/es6-symbol` to your
`package.json`.

```json
{
  "overrides": {
    "es6-symbol": "npm:@socketregistry/es6-symbol@^1"
  },
  "resolutions": {
    "es6-symbol": "npm:@socketregistry/es6-symbol@^1"
  }
}
```

### Install as a plain dependency

Install with your favorite package manager.

```sh
npm install @socketregistry/es6-symbol
```

## Requirements

Node >= `18.20.4`
