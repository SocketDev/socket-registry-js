# @socketregistry/@socketregistry/functions-have-names

> A zero dependency drop-in replacement of
> [@socketregistry/functions-have-names](https://www.npmjs.com/package/@socketregistry/functions-have-names).

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

Manually add `@socketregistry/@socketregistry/functions-have-names` to your
`package.json`.

```json
{
  "overrides": {
    "@socketregistry/functions-have-names": "npm:@socketregistry/@socketregistry/functions-have-names@^1"
  },
  "resolutions": {
    "@socketregistry/functions-have-names": "npm:@socketregistry/@socketregistry/functions-have-names@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/functions-have-names```

## Requirements

Node &gt;=18.20.4
````