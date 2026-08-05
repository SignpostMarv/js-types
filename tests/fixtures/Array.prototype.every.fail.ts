(() => {
	const arr1: [
		string,
		...string[],
	] = [
		'foo1',
		'foo2',
		'foo3',
	];

	const arr2: [
		string,
		string,
		...string[],
	] = [
		'foo1',
		'foo2',
		'foo3',
	];

	function predicate(maybe: string): maybe is `foo${number}` {
		return /^foo\d+$/.test(maybe);
	}

	if (!arr1.every(predicate)) {
		return;
	}

	const check1: [
		`foo${number}`,
		...`foo${number}`[],
	] = arr1;

	if (!arr2.every(predicate)) {
		return;
	}

	const check2: [
		`foo${number}`,
		`foo${number}`,
		...`foo${number}`[],
	] = arr2;

	console.log(check1, check2);
})();
