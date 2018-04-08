install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js --format plain js1.json js2.json

start2:
	npm run babel-node -- src/bin/gendiff.js js1.json js2.json

publish:
	npm publish

lint:
	npm run eslint .

build:
	rm -rf dist
	npm run build

test:
	npm test

publish:
	npm publish
