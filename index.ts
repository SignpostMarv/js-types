declare global {
	type NonEmptyArray<T> = [T, ...T[]];

	interface Array<T> {
		every<
			S extends T,
			Before extends T[],
			After extends S[],
			Item extends After[number],
		>(
			this: After,
			predicate: (
				value: Before[number],
				index: number,
				array: Before,
			) => value is Item,
		): this is {[K in keyof After]: Item};
		every<
			S extends T,
		>(
			predicate: (
				value: T,
				index: number,
				array: T[],
			) => value is S, thisArg?: unknown
		): this is S[];

		map<U>(
			callbackfn: (value: T, index: number, array: [T, T, ...T[]]) => U,
			thisArg?: unknown,
		): [U, U, ...U[]];
		map<U>(
			callbackfn: (value: T, index: number, array: [T, ...T[]]) => U,
			thisArg?: unknown,
		): [U, ...U[]];
		map<U>(
			callbackfn: (value: T, index: number, array: T[]) => U,
			thisArg?: unknown,
		): U[];
	}

	interface ObjectConstructor {
		entries<
			K extends string,
			V,
		>(
			o: {[key in K]: V},
		): [keyof typeof o, (typeof o)[keyof typeof o]][];
		entries<T>(o: { [s: string]: T } | ArrayLike<T>): [string, T][];

		keys<
			T extends Exclude<{[key: string]: unknown}, Record<string, never>>,
			K = (keyof T & string),
		>(o: T): [K, ...K[]];
		keys<
			T extends {[key: string]: unknown},
			K = (keyof T & string),
		>(o: T): K[];
		keys(o: object): string[];

		values<
			O extends {[key: string]: unknown},
		>(o: O): O[keyof O][];
		values<T>(o: { [s: string]: T } | ArrayLike<T>): T[];
	}
}

export {};
