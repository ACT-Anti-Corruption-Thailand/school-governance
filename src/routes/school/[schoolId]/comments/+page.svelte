<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import { currentUser } from 'stores/firebaseapp';
	import { onMount } from 'svelte';

	$: schoolId = $page.params.schoolId;

	let txt_comment = '';
	let chk_locations: string[] = [];

	const fetchComments = async () => {
		let schoolid_query = `schoolId,eq,${schoolId}`;
		let location_query = filter_locations.length
			? filter_locations.map((loc) => `(location,like,${loc})`).join('~or')
			: null;
		let year_query = filter_years.length
			? filter_years.map((year) => `(schoolYear,eq,${year})`).join('~or')
			: null;
		let where_query = [schoolid_query, location_query, year_query]
			.filter((e) => e)
			.map((e) => `(${e})`)
			.join('~and');

		let sort_query = filter_sort_by === 'latest' ? '-createDate' : '-likeCount';

		try {
			const resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments?limit=999&where=${encodeURIComponent(
					where_query
				)}&sort=${encodeURIComponent(sort_query)}`,
				{
					method: 'GET',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
			const json = await resp.json();
			posts = json?.list.map((e: any) => ({
				...e,
				likedByYourself: e.likedUserIds.find((e: any) => e.userId === $currentUser?.uid)
			}));
		} catch (err) {
			console.error(err);
		}
	};

	const likeComment = async (commentId: number) => {
		if (!$currentUser) return;

		try {
			await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolCommentLike`,
				{
					method: 'POST',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						userId: $currentUser.uid,
						commentId: commentId
					})
				}
			);
		} catch (err) {
			console.error(err);
		} finally {
			fetchComments();
		}
	};

	const unlikeComment = async (likeId: number) => {
		try {
			await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolCommentLike/${likeId}`,
				{
					method: 'DELETE',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
		} catch (err) {
			console.error(err);
		} finally {
			fetchComments();
		}
	};

	const deleteComment = async (commentId: number) => {
		try {
			await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments/${commentId}`,
				{
					method: 'DELETE',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY
					}
				}
			);
		} catch (err) {
			console.error(err);
		} finally {
			fetchComments();
		}
	};

	const debugPost = async () => {
		if (!$currentUser) return;
		if (txt_comment.trim() === '' || chk_locations.length === 0) return;

		try {
			await fetch(
				'https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments?limit=999',
				{
					method: 'POST',
					headers: {
						'xc-token': PUBLIC_NOCO_TOKEN_KEY,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						schoolId: schoolId,
						comments: txt_comment.trim(),
						location: chk_locations.join(),
						schoolYear: 2022,
						userId: $currentUser.uid
					})
				}
			);
		} catch (err) {
			console.error(err);
		} finally {
			fetchComments();
		}
	};

	let posts: any[] = [];
	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	$: if (mounted && $currentUser) {
		void (filter_sort_by, filter_locations, filter_years);
		fetchComments();
	}

	let filter_sort_by: 'latest' | 'most-liked' = 'latest';
	let filter_locations: ('classroom' | 'toilet' | 'canteen' | 'gym')[] = [
		'classroom',
		'toilet',
		'canteen',
		'gym'
	];
	let filter_years: number[] = [2022];

	$: filter_sort_by_lbl = {
		latest: 'ล่าสุด',
		'most-liked': 'เห็นด้วยมากสุด'
	}[filter_sort_by];
	$: filter_locations_lbl =
		filter_locations.length === 4
			? 'ทุกสถานที่'
			: filter_locations
					.map(
						(loc) =>
							({
								classroom: 'ห้องเรียน',
								toilet: 'ห้องน้ำ',
								canteen: 'โรงอาหาร',
								gym: 'สนามกีฬา'
							}[loc])
					)
					.join(', ');
</script>

<SchoolHeader pageData={{ name: 'ความคิดเห็น', color: '#6BC9FF' }}>
	<div class="f comment-header">
		<img src="/icons/comment.svg" alt="ความคิดเห็น" width="20" height="20" />
		<span class="comment-header-val">50</span>
	</div>
</SchoolHeader>
<div class="desktop-margin">
	{#if $currentUser}
		<p>Current user is: {$currentUser.uid}</p>
		<div>
			<textarea placeholder="คิดเห็นหรืออยากฝากอะไรถึงโรงเรียนบ้าง?" bind:value={txt_comment} />
			<div>
				<label
					><input type="checkbox" bind:group={chk_locations} value="classroom" /> ห้องเรียน</label
				>
				<label><input type="checkbox" bind:group={chk_locations} value="toilet" /> ห้องน้ำ</label>
				<label><input type="checkbox" bind:group={chk_locations} value="canteen" /> โรงอาหาร</label>
				<label><input type="checkbox" bind:group={chk_locations} value="gym" /> สนามกีฬา</label>
			</div>
			<input
				type="button"
				value="POST"
				disabled={txt_comment.trim() === '' || chk_locations.length === 0}
				on:click={debugPost}
			/>
		</div>
	{:else}
		<p>You are not logged in D:</p>
	{/if}
	<details>
		<summary>
			<span>
				ICON
				<span>{filter_sort_by_lbl}</span>
				<span>{filter_locations_lbl}</span>
				<span>{filter_years.join(', ')}</span>
			</span>
		</summary>
		<div class="filter-box">
			<fieldset>
				<legend>เรียงตาม</legend>
				<label
					><input
						type="radio"
						name="filter-sort-by"
						bind:group={filter_sort_by}
						value="latest"
					/><span>ล่าสุด</span></label
				>
				<label
					><input
						type="radio"
						name="filter-sort-by"
						bind:group={filter_sort_by}
						value="most-liked"
					/><span>เห็นด้วยมากสุด</span></label
				>
			</fieldset>
			<fieldset>
				<legend>สถานที่</legend>
				<label
					><input type="checkbox" bind:group={filter_locations} value="classroom" /><span
						>ห้องเรียน</span
					></label
				>
				<label
					><input type="checkbox" bind:group={filter_locations} value="toilet" /><span>ห้องน้ำ</span
					></label
				>
				<label
					><input type="checkbox" bind:group={filter_locations} value="canteen" /><span
						>โรงอาหาร</span
					></label
				>
				<label
					><input type="checkbox" bind:group={filter_locations} value="gym" /><span>สนามกีฬา</span
					></label
				>
			</fieldset>
			<fieldset>
				<legend>ปีการศึกษา</legend>
				<label
					><input type="checkbox" bind:group={filter_years} value={2022} /><span>2565</span></label
				>
				<label
					><input type="checkbox" bind:group={filter_years} value={2023} /><span>2566</span></label
				>
			</fieldset>
		</div>
	</details>
	<section>
		{#each posts as post (post.Id)}
			<article>
				<div class="f">
					<p>{new Date(post.createDate).toLocaleDateString('th')}</p>
					{#if $currentUser?.uid === post.userId}
						<input type="button" value="ลบ" on:click={() => deleteComment(post.Id)} />
					{/if}
				</div>
				<p>{post.comments}</p>
				<div class="f">
					{#each post.location as loc}
						<span>{loc}</span>
					{/each}
				</div>
				<!-- <p>ปีการศึกษา {post.schoolYear}</p> -->
				<!-- <p>by {post.userId}</p> -->
				<p>
					{#if $currentUser}
						<input
							type="button"
							value={post.likedByYourself ? 'Liked' : 'Like'}
							on:click={() => {
								post.likedByYourself
									? unlikeComment(post.likedByYourself.Id)
									: likeComment(post.Id);
							}}
						/>
					{/if}
					Liked by {post.likedByYourself ? `You and ${post.likeCount}` : post.likeCount} people.
				</p>
				<!-- <pre><code>{JSON.stringify(post)}</code></pre> -->
				<hr />
			</article>
		{/each}
	</section>
</div>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
		}
	}

	.comment-header {
		gap: 4px;
	}

	.comment-header-val {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}
</style>
