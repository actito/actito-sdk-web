# Release process

1. Update the version of each library.
2. Update the version in `packages/actito-core/src/internal/version.ts`.
3. Update the `CHANGELOG.md`.
4. Push the generated changes to the repository.
5. Clean the project.
```shell
yarn clean
```
6. Build the libraries.
```shell
yarn build
```
7. Release the libraries to NPM.
```shell
lerna publish from-package
```
8. Release the libraries to the CDN.

Upload the contents of the `packages/actito/dist/cdn/stable` and `packages/actito/dist/cdn/latest` folders to the CDN.

9. Invalidate the cache
```shell
aws cloudfront create-invalidation --distribution-id $AWS_ACTITO_WEB_SDK_CF_DISTRIBUTION_ID --paths '/libs/web/v5/latest/*'
```
10. Create a GitHub release with the contents of the `CHANGELOG.md`.
