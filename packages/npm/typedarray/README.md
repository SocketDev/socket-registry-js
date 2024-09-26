# @socketregistry/@socketregistry/typedarray

> A zero dependency drop-in replacement of
> [@socketregistry/typedarray](https://www.npmjs.com/package/@socketregistry/typedarray).

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

Manually add `@socketregistry/@socketregistry/typedarray` to your
`package.json`.

```json
{
  "overrides": {
    "@socketregistry/typedarray": "npm:@socketregistry/@socketregistry/typedarray@^1"
  },
  "resolutions": {
    "@socketregistry/typedarray": "npm:@socketregistry/@socketregistry/typedarray@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/typedarray```

## Requirements

Node &gt;=18.20.4
````