const foo: {
	[key: `${string}_${string}`]: `${string}:${number}`,
} = {
	foo_bar: 'baz:1',
};

function typed(key: `${string}_${string}`) {
	console.log(key);
}

Object.keys(foo).map((e) => typed(e));
