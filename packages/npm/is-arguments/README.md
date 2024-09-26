# @socketregistry/@socketregistry/is-arguments

> A zero dependency drop-in replacement of
> [@socketregistry/is-arguments](https://www.npmjs.com/package/@socketregistry/is-arguments).

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

Manually add `@socketregistry/@socketregistry/is-arguments` to your
`package.json`.

```json
{
  "overrides": {
    "@socketregistry/is-arguments": "npm:@socketregistry/@socketregistry/is-arguments@^1"
  },
  "resolutions": {
    "@socketregistry/is-arguments": "npm:@socketregistry/@socketregistry/is-arguments@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/is-arguments```

## Requirements

Node &gt;=18.20.4
````