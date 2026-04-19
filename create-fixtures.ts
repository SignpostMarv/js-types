import {
	glob,
	readFile,
	writeFile,
} from 'node:fs/promises';

for await (
	const path of glob(`${
		import.meta.dirname
	}/tests/fixtures/*.fail.ts`)
) {
	const code = (await readFile(path)).toString();

	const with_reference = `/// <reference path="../../index.ts" />${
		'\n\n'
	}${
		code
	}`;

	const with_type_import = `import type {} from '../../index.ts';${
		'\n\n'
	}${
		code
	}`;

	await writeFile(
		path.replace(/\.fail\.ts$/, '.pass.with-triple-slash.ts'),
		with_reference,
	);

	await writeFile(
		path.replace(/\.fail\.ts$/, '.pass.with-type-import.ts'),
		with_type_import,
	);
}
