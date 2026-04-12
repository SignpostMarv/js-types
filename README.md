[![Workflow Status](https://github.com/SignpostMarv/js-types/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/SignpostMarv/js-types/actions/workflows/node.js.yml?query=branch%3Amain)

# JS Types

## `Array.prototype`

### `Array.prototype.map`

```ts
declare global {
	interface Array<T> {
		map<U>(
			callbackfn: (value: T, index: number, array: [T, T, ...T[]]) => U,
			thisArg?: unknown
		): [U, U, ...U[]];
		map<U>(
			callbackfn: (value: T, index: number, array: [T, ...T[]]) => U,
			thisArg?: unknown
		): [U, ...U[]];
		map<U>(
			callbackfn: (value: T, index: number, array: T[]) => U,
			thisArg?: unknown
		): U[];
	}
}
```

## `Object`

### `Object.entries`

```ts
declare global {
	interface ObjectConstructor {
		entries<K extends string, V>(o: {[key in K]: V}): [
			keyof typeof o,
			(typeof o)[keyof typeof o],
		][];
		entries<T>(o: {[s: string]: T} | ArrayLike<T>): [string, T][];
	}
}
```

### `Object.keys`

```ts
declare global {
	interface ObjectConstructor {
		keys<
			T extends Exclude<{[key: string]: unknown}, Record<string, never>>,
			K = keyof T & string,
		>(
			o: T
		): [K, ...K[]];
		keys<T extends {[key: string]: unknown}, K = keyof T & string>(
			o: T
		): K[];
		keys(o: object): string[];
	}
}
```
