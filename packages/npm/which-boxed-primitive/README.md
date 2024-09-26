# @socketregistry/@socketregistry/which-boxed-primitive

> A zero dependency drop-in replacement of
> [@socketregistry/which-boxed-primitive](https://www.npmjs.com/package/@socketregistry/which-boxed-primitive).

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

Manually add `@socketregistry/@socketregistry/which-boxed-primitive` to your
`package.json`.

```json
{
  "overrides": {
    "@socketregistry/which-boxed-primitive": "npm:@socketregistry/@socketregistry/which-boxed-primitive@^1"
  },
  "resolutions": {
    "@socketregistry/which-boxed-primitive": "npm:@socketregistry/@socketregistry/which-boxed-primitive@^1"
  }
}
```

### Plain Dependency

Install with your preferred package manager.

````sh
npm install @socketregistry/@socketregistry/which-boxed-primitive```

## Requirements

Node &gt;=18.20.4
````