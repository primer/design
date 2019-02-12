# Primer Design Guidelines

Documentation for UI patterns and interaction guidelines.

## Status
This is currently a work in progress! Follow along on our [project board](https://github.com/primer/design/projects/1).

## Local development

1. Clone this repo, e.g. with:

    ```sh
    git clone https://github.com/primer/design
    ```

1. In the terminal, navigate (`cd`) to the repo directory

1. `npm install` to install dependencies

1. `npm run dev` to start the [Next.js] server

## Deployment

Each pull request (actually, each push!) is linted, tested, then deployed to a unique [Now] URL. Code merged to the `master` branch will be automatically deployed to [primer-design.now.sh](https://primer-design.now.sh).

### Branch previews

For convenience, commit deployments are also aliased to a "preview" URL unique to its branch, in the form:

```
primer-design-{branch}.now.sh
```

where the `{branch}` placeholder is the [slugified] git branch name. For instance, if you push to a branch called `my-feature`, your code will be deployed to `primer-design-my-feature.now.sh`.

You can access this URL the "Details" link of the **deploy/preview** commit status, which will be listed in the "checks" portion of the merge box of your pull request:

![](https://user-images.githubusercontent.com/113896/47810057-9c309180-dcff-11e8-8773-45dd2ef267ce.png)


[Next.js]: https://github.com/zeit/next.js
[Now]: https://zeit.co/now
[slugified]: https://www.npmjs.com/package/slugify
