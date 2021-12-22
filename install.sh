set -ex

export DOC_PROJECT_CWD=$(dirname $PWD)

cd $(mktemp -d)
git clone https://github.com/arcanis/mael.dev-docs.git mael.dev-docs
cd mael.dev-docs

yarn
yarn build
cp -rf build $DOC_PROJECT_CWD/website/build
