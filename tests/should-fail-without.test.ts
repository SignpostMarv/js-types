import assert from 'node:assert/strict';

import {
	glob,
} from 'node:fs/promises';

import {
	basename,
} from 'node:path';

import {
	describe,
	it,
} from 'node:test';

import type {
	Diagnostic,
	DiagnosticMessageChain,
} from 'typescript';
import {
	createProgram,
	getPreEmitDiagnostics,
} from 'typescript';

function expect_diagnostic_message(
	actual: Diagnostic[],
	expected: Partial<DiagnosticMessageChain>,
	message?: string,
): void {
	const auto_fail = Object.keys(expected).length < 1;

	assert.notEqual(
		actual.find(({messageText}) => {
			if (auto_fail) {
				return false;
			}

			let match = true;

			for (const [prop, value] of Object.entries(expected) as [
				keyof DiagnosticMessageChain,
				DiagnosticMessageChain[keyof DiagnosticMessageChain],
			][]) {
				if (
					'string' !== typeof messageText
					&& prop in messageText
					&& value !== messageText[prop]
				) {
					match = false;

					break;
				}
			}

			return match;
		}),
		undefined,
		message,
	);
}

for await (const path of glob(`${import.meta.dirname}/fixtures/*.fail.ts`)) {
	void describe(`${basename(path).replace(/\.fail\.ts$/, '')}()`, () => {
		void it('fails without types', () => {
			const fail = createProgram(
				[
					path,
				],
				{
					types: ['node'],
					erasableSyntaxOnly: true,
					noEmit: true,
					noEmitHelpers: true,
				},
			);

			const should_fail = fail.emit();

			const diagnostics = getPreEmitDiagnostics(fail).concat(
				should_fail.diagnostics,
			);

			expect_diagnostic_message(
				diagnostics,
				{
					category: 1,
					code: 2345,
				},
				'Code should have failed but didn\'t',
			);
		});

		void it('passes with triple slash', () => {
			const pass = createProgram(
				[
					path.replace(/\.fail\.ts$/, '.pass.with-triple-slash.ts'),
				],
				{
					types: ['node'],
					erasableSyntaxOnly: true,
					noEmit: true,
					noEmitHelpers: true,
				},
			);

			const should_pass = pass.emit();

			const diagnostics = getPreEmitDiagnostics(pass).concat(
				should_pass.diagnostics,
			);

			assert.equal(
				diagnostics.length,
				0,
				'Code should have passed but didn\'t',
			);
		});

		void it('passes with type import', () => {
			const pass = createProgram(
				[
					path.replace(/\.fail\.ts$/, '.pass.with-type-import.ts'),
				],
				{
					types: ['node'],
					erasableSyntaxOnly: true,
					noEmit: true,
					noEmitHelpers: true,
				},
			);

			const should_pass = pass.emit();

			const diagnostics = getPreEmitDiagnostics(pass).concat(
				should_pass.diagnostics,
			);

			assert.equal(
				diagnostics.length,
				0,
				'Code should have passed but didn\'t',
			);
		});
	});
}
