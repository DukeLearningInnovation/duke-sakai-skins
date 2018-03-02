### 12.x branches

`library/src` contains the source code from upstream. You can update the src by running.

`git checkout upstream/master -- library/src` 


Chrome 66 has a new feature we can use to make the live updating process easier

https://developers.google.com/web/updates/2018/01/devtools#overrides

There is an issue on nightly with this in that it is rebuilt so often that the query parameter on the tool.css file changes every day. This is fixable
