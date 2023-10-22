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
		main: "dist/index.js",
		types: "dist/index.d.ts",
		keywords: ["go-liter-plugin"],
		scripts: {
			"check": "tsc --noEmit",
			"zip": "mkdir -p dist && npm-build-zip --destination=dist",
			"build": "npm run build:types && npm run build:ts && npm run zip",
			"build:ts": "tsc",
			"build:types": "tsc --emitDeclarationOnly",
			"build:watch": "npm run build -- --watch",
		},
	},
	files: [
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
				},
				"include": [
					"node_modules/go-liter-plugin",
					"src",
				],
			},
		},
		"src/index.ts",
	],
})
