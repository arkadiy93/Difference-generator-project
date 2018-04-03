install:
	npm install

start:
	npm run babel-node -- src/bin/trol.js

publish:
	npm publish

lint:
	npm run eslint "src/**/*.js"
