# @socketregistry/@socketregistry/array-includes

> A zero dependency drop-in replacement of
> [@socketregistry/array-includes](https://www.npmjs.com/package/@socketregistry/array-includes).

## Install

### Override

#### `@socketsecurity/cli` :sparkles:

Use [`@socketsecurity/cli`](https://www.npmjs.com/package/@socketsecurity/cli)
to automagically populate the
[overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides)
and [resolutions](https://yarnpkg.com/configuration/manifest#resolutions) fields
of your `package.json`.

```sh
npx @socketsecurity/cli optimize
```

#### Handcrafted

Manually add `@socketregistry/@socketregistry/array-includes` to your
`package.json`.

```json
{
  "overrides": {
    "@socketregistry/array-includes": "npm:@socketregistry/@socketregistry/array-includes@^1"
  },
  "resolutions": {
    "@socketregistry/array-includes": "npm:@socketregistry/@socketregistry/array-includes@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/array-includes```

## Requirements

Node &gt;=18.20.4
````