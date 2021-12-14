# Duke Sakai Skins

# Duke Sakai Skins

## setup

``` sh
# infrastructure and build environment
git clone https://github.com/profmikgreene/docker-sakai-builder
cd docker-sakai-builder
# fetch upstream source code
git clone https://github.com/profmikegreene/sakai
cd sakai
git remote add upstream https://github.com/sakaiproject/sakai
git fetch upstream 21.x
git checkout --track upstream/21.x
# fetch duke source code
git remote add duke https://github.com/dukelearninginnovation/duke-sakai-skins
# make changes
git checkout -b duke-XXX
git add .
git commit -m ""
git push duke duke-XXX
# Pull request duke/duke-XXX against duke/dev
# Github actions runs on merged PRs to duke/dev and puts appropriate code to duke/master
```

Branch strategy

- master/main
  - No use, only documentation
  - Will be cleaned out to prevent confusion
- 21.x
  - tracking remote upstream/21.x
- feature branches
  - build locally for development, PR against 21.x
  - merges to 21.x get github actions for deploy to dukedev
- dukedev
  - deploys library/dist from 21.x for sakai-test.duke.edu

Dev workflow

```sh
## rebase 21.x from upstream
cd sakai
git fetch upstream
git checkout 21.x
git pull --rebase upstream 21.x
git push duke 21.x

## code
git checkout -b branch
cd library
../../sakai-dock.sh build -D duke-default
```
