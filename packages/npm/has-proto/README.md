# @socketregistry/has-proto

[![Socket Badge](https://socket.dev/api/badge/npm/package/@socketregistry/has-proto)](https://socket.dev/npm/package/@socketregistry/has-proto)
[![CI - @socketregistry/has-proto](https://github.com/SocketDev/socket-registry-js/actions/workflows/test.yml/badge.svg)](https://github.com/SocketDev/socket-registry-js/actions/workflows/test.yml)
[![Follow @SocketSecurity](https://img.shields.io/twitter/follow/SocketSecurity?style=social)](https://twitter.com/SocketSecurity)

> A tested zero dependency drop-in replacement of
> [`has-proto`](https://socket.dev/npm/package/has-proto) complete with
> TypeScript types.

## Installation

### Install as a package override

[`@socketsecurity/cli`](https://socket.dev/npm/package/@socketsecurity/cli) will
automagically :sparkles: populate the
[overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides)
and [resolutions](https://yarnpkg.com/configuration/manifest#resolutions) fields
of your `package.json`.

```sh
npx @socketsecurity/cli optimize
```

Prefer to do it yourself? You may manually add `@socketregistry/has-proto` to
your `package.json`.

```json
{
  "overrides": {
    "has-proto": "npm:@socketregistry/has-proto@^1"
  },
  "resolutions": {
    "has-proto": "npm:@socketregistry/has-proto@^1"
  }
}
```

### Install as a plain dependency

Install with your preferred package manager.

```sh
npm install @socketregistry/has-proto
```

## Requirements

Node >= `18.20.4`
