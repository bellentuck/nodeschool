A few words; a few more.

Helpful Commands:

`npm adduser` - create npm account
`npm whoami` - get yr npm username
`npm init` - init a project
`npm init --scope=<username>` - init a project

`npm install @linclark/pkg` - install a package
`npm rm @linclark/pkg --save` - remove package; `--save` removes from package.json, too
`npm outdated` - show package(s) with available 'latest' update(s)
`npm update` - auto-update packages

`npm test` - run test file (as per package.json)
`npm publish` - publish yr package
`npm view @<username>/how-to-npm` - view yr package
`npm version` - get dependency versions

`npm dist-tag add @<username>/how-to-npm@1.0.1 beta` - add a tag to a package version
`npm dist-tag rm @<username>/how-to-npm beta` - remove tag from package version
`npm dist-tag add @<username>/how-to-npm@1.0.0 latest` - switch 'latest' tag to older version
(N.B.: `dist-tags` also works instead of `dist-tag`)
