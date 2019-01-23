#change this to the version of sakai you want to checkout from github
RELEASE='19.x'

#overwrite previous src/morpheus-master folder with desired release
rm -rf src/morpheus-master
svn export https://github.com/sakaiproject/sakai/branches/$RELEASE/library/src/morpheus-master src/morpheus-master

