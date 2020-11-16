## Conventions

-   All Pages have a wrapper that has an id, which is exactly the combination of the "page's folder name" and the "page's parent folder name" while components have a wrapper that has a classname that follows the same format
    e.g 1. signIn page has an id `signIn-page` 2. input component has a className `input-component`

-   "craco" is used in order to enable absolute path imports in this project

-   changing the scripts in the package.json file would make the CRA be executed be "craco"

-   components
    1. Conventional - Contains compoenents know by the web dev community
    2. Specific - Contains components specifi to this project

### `Making Async Requests`

There are two major ways async requests are made in the entire app:

1.Through Redux-saga (Used if response of request IS associated with GENERAL state of app)
2.Trough Axios (Used if response of request IS NOT associated with GENERAL state of app)
