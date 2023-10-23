#!/usr/bin/env node

const create = require("base-create");

create({
	dependencies: [
		"go-liter-plugin",
	],
	devDependencies: [
		"typescript",
		"@andersdjohnson/tsconfig",
		"npm-build-zip",
	],
	package: {
		files: ["dist"],
		main: "index.js",
		types: "index.d.ts",
		keywords: ["go-liter"],
		scripts: {
	    "test": "tsc --noEmit",
	    "export-meta": "node cmd/export-meta",
	    "zip": "npm-build-zip --destination=dist",
	    "build": "npm run export-meta && npm run build:types && npm run build:ts && npm run zip",
	    "build:ts": "tsc",
	    "build:types": "tsc --emitDeclarationOnly",
	    "build:watch": "npm run build -- --watch"
	  },
	},
	files: [
		{
			path: ".gitignore",
			contents: `
# Mac OS
.DS_Store

# builds
build/
dist/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Dependency directories
node_modules/
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variable files
.env
.env.development.local
.env.test.local
.env.production.local
.env.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
`
		}
		{
			path: "tsconfig.json",
			contents: {
				"compilerOptions": {
					"module": "commonjs",
					"target": "es6",
					"lib": ["es6"],
					"declaration": true,
					"noImplicitAny": true,
					"preserveConstEnums": true,
					"removeComments": true,
					"sourceMap": true,
					"outDir": "build",
					"typeRoots": [
						"node_modules/@types",
						"node_modules/go-liter-plugin",
					],
				},
				"include": [
					"src",
				],
			},
		},
		{
			path: "cmd/export-meta.js",
			contents: `
const fs = require('fs')

fs.rmSync('build', { recursive: true, force: true })
fs.mkdirSync('build')
if (!fs.existsSync('dist')){
	fs.mkdirSync('dist')
}

const packageJson = JSON.parse(fs.readFileSync('package.json'))

const meta = {
	"name": packageJson["name"],
	"version": packageJson["version"],
	"description": packageJson["description"],
	"dependencies": packageJson["dependencies"],
}

fs.writeFileSync('build/plugin.meta.json', JSON.stringify(meta), 'utf-8')
`
		},
		{
			path: "src/index.ts",
			contents: `
console.log(console.log(\`plugin ${$.ID}@${$.VERSION} is loading\`))

$.on('unload', () => {
	console.log('plugin %q is unloading', $.ID)
})
`
		}
	],
})
