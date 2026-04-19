const foo: {
	[key: `${string}_${string}`]: `${string}:${number}`,
} = {
	foo_bar: 'baz:1',
};

function typed([key, value]: [`${string}_${string}`, `${string}:${number}`]) {
	console.log(key, value);
}

Object.entries(foo).map((e) => typed(e));
