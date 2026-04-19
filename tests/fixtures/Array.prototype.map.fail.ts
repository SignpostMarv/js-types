(() => {
	const arr1: [
		string,
		...string[],
	] = [
		'foo',
		'bar',
		'baz',
	];

	const arr2: [
		string,
		string,
		...string[],
	] = [
		'foo',
		'bar',
		'baz',
	];

	function test1(on: [string, ...string[]]): void {
		console.log(on);
	}

	function test2(on: [string, string, ...string[]]): void {
		console.log(on);
	}

	test1(arr1);

	test1(arr1.map((e) => e));

	test2(arr2);

	test2(arr2.map((e) => e));
})();
