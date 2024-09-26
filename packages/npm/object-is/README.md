# @socketregistry/@socketregistry/object-is

> A zero dependency drop-in replacement of
> [@socketregistry/object-is](https://www.npmjs.com/package/@socketregistry/object-is).

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

Manually add `@socketregistry/@socketregistry/object-is` to your `package.json`.

```json
{
  "overrides": {
    "@socketregistry/object-is": "npm:@socketregistry/@socketregistry/object-is@^1"
  },
  "resolutions": {
    "@socketregistry/object-is": "npm:@socketregistry/@socketregistry/object-is@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/object-is```

## Requirements

Node &gt;=18.20.4
````