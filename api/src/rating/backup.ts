/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function getCurrentSchoolYear() {
	const now = new Date();
	return now.getFullYear() - +(now.getMonth() < 4);
}

export async function backup() {
	console.time('MOVE TABLE');
	try {
		//  ██████╗ ██████╗ ██████╗ ██╗   ██╗
		// ██╔════╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
		// ██║     ██║   ██║██████╔╝ ╚████╔╝
		// ██║     ██║   ██║██╔═══╝   ╚██╔╝
		// ╚██████╗╚██████╔╝██║        ██║
		//  ╚═════╝ ╚═════╝ ╚═╝        ╚═╝

		// ███████╗ ██████╗██╗  ██╗ ██████╗  ██████╗ ██╗     ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
		// ██╔════╝██╔════╝██║  ██║██╔═══██╗██╔═══██╗██║     ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
		// ███████╗██║     ███████║██║   ██║██║   ██║██║     ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
		// ╚════██║██║     ██╔══██║██║   ██║██║   ██║██║     ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
		// ███████║╚██████╗██║  ██║╚██████╔╝╚██████╔╝███████╗██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
		// ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

		console.log('START COPYING `SchoolIndex` RATINGS');

		// STEP 1: COUNT ENTRIES
		const count_resp = await fetch(
			`${process.env.NOCODB_URL}/api/v1/db/data/v1/${process.env.NOCODB_PROJECT}/SchoolIndex/count`,
			{
				headers: {
					'xc-token': process.env.NOCODB_TOKEN
				}
			}
		);
		const count_resp_json: Record<string, any> = await count_resp.json();
		const schoolindex_count: number = +count_resp_json.count;
		console.log('Records', schoolindex_count);

		let si_offset = 0;
		while (si_offset < schoolindex_count) {
			if (si_offset % 10000 === 0 && si_offset > 0) {
				console.log('CHECKPOINT: await for 10 sec before resume');
				await delay(10000);
				console.log('RESUMED OPERATIONS');
			}

			console.log(`GETTING ${si_offset}-${si_offset + 999}...`);
			// STEP 2: GET DATA
			const get_resp = await fetch(
				`${process.env.NOCODB_URL}/api/v1/db/data/v1/${process.env.NOCODB_PROJECT}/SchoolIndex?fields=schoolId%2CcountC1%2CcountC2%2CcountC3%2CcountC4%2CcountC5%2CcountT1%2CcountT2%2CcountT3%2CcountT4%2CcountT5%2CcountF1%2CcountF2%2CcountF3%2CcountF4%2CcountF5%2CcountG1%2CcountG2%2CcountG3%2CcountG4%2CcountG5%2CsumC1%2CsumC2%2CsumC3%2CsumC4%2CsumC5%2CsumT1%2CsumT2%2CsumT3%2CsumT4%2CsumT5%2CsumF1%2CsumF2%2CsumF3%2CsumF4%2CsumF5%2CsumG1%2CsumG2%2CsumG3%2CsumG4%2CsumG5&limit=1000&offset=${si_offset}`,
				{
					headers: {
						'xc-token': process.env.NOCODB_TOKEN
					}
				}
			);
			if (!get_resp.ok) {
				const { msg } = (await get_resp.json()) as { msg: string };
				throw new Error(`Cannot get SchoolRating from SchoolIndex at offset ${si_offset}`, {
					cause: msg
				});
			}
			const get_resp_json: Record<string, any> = await get_resp.json();
			const get_json: Record<string, any>[] = get_resp_json.list;

			console.log('GOT DATA, INSERTING...');

			// STEP 3: POST TO NEW TABLE
			const year_json = get_json.map((e) => ({ ...e, year: getCurrentSchoolYear() }));
			const new_json_resp = await fetch(
				`${process.env.NOCODB_URL}/api/v1/db/data/bulk/v1/${process.env.NOCODB_PROJECT}/SchoolIndexRatingHistory`,
				{
					method: 'POST',
					headers: {
						'xc-token': process.env.NOCODB_TOKEN,
						'content-type': 'application/json'
					},
					body: JSON.stringify(year_json)
				}
			);
			if (!new_json_resp.ok) {
				const { msg } = (await new_json_resp.json()) as { msg: string };
				throw new Error(`Insertion Error in SchoolIndexRatingHistory at offset ${si_offset}`, {
					cause: msg
				});
			}

			console.log('INSERTED');

			// STEP 4: INCREMENT OFFSET
			si_offset += 1000;
		}

		//   ██████╗██╗     ███████╗ █████╗ ██████╗
		//  ██╔════╝██║     ██╔════╝██╔══██╗██╔══██╗
		//  ██║     ██║     █████╗  ███████║██████╔╝
		//  ██║     ██║     ██╔══╝  ██╔══██║██╔══██╗
		//  ╚██████╗███████╗███████╗██║  ██║██║  ██║
		// 	╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝

		// ███████╗ ██████╗██╗  ██╗ ██████╗  ██████╗ ██╗     ██╗   ██╗███████╗███████╗██████╗
		// ██╔════╝██╔════╝██║  ██║██╔═══██╗██╔═══██╗██║     ██║   ██║██╔════╝██╔════╝██╔══██╗
		// ███████╗██║     ███████║██║   ██║██║   ██║██║     ██║   ██║███████╗█████╗  ██████╔╝
		// ╚════██║██║     ██╔══██║██║   ██║██║   ██║██║     ██║   ██║╚════██║██╔══╝  ██╔══██╗
		// ███████║╚██████╗██║  ██║╚██████╔╝╚██████╔╝███████╗╚██████╔╝███████║███████╗██║  ██║
		// ╚══════╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
		// ██████╗  █████╗ ████████╗██╗███╗   ██╗ ██████╗
		// ██╔══██╗██╔══██╗╚══██╔══╝██║████╗  ██║██╔════╝
		// ██████╔╝███████║   ██║   ██║██╔██╗ ██║██║  ███╗
		// ██╔══██╗██╔══██║   ██║   ██║██║╚██╗██║██║   ██║
		// ██║  ██║██║  ██║   ██║   ██║██║ ╚████║╚██████╔╝
		// ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝

		await fetch(
			`${process.env.NOCODB_URL}/api/v1/db/data/bulk/v1/${process.env.NOCODB_PROJECT}/SchoolUserRating/all`,
			{
				method: 'DELETE',
				headers: {
					'xc-token': process.env.NOCODB_TOKEN
				}
			}
		);
	} catch (e) {
		console.timeEnd('MOVE TABLE');

		console.error('😱' + e.message);
		console.error(e);

		return e.message;
	}

	console.timeEnd('MOVE TABLE');
	return 'TABLE MOVED';
}
