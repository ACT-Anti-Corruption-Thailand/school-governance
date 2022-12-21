<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SchoolHeader from 'components/SchoolHeader.svelte';
	import { PUBLIC_NOCO_TOKEN_KEY } from '$env/static/public';
	import { currentUser } from 'stores/firebaseapp';

	$: schoolId = $page.params.schoolId;

	let txt_comment = '';
	let chk_locations: string[] = [];

	const fetchComments = async () => {
		try {
			const resp = await fetch(
				`https://sheets.wevis.info/api/v1/db/data/v1/Open-School-Test/SchoolComments?sort=-createDate&limit=999&where=(schoolId,eq,${schoolId})`,
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
						userId: $currentUser?.uid,
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
						'xc-token': PUBLIC_NOCO_TOKEN_KEY,
						'Content-Type': 'application/json'
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
						userId: $currentUser?.uid
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
		fetchComments();
	}
</script>

<SchoolHeader pageData={{ name: 'ความคิดเห็น', color: '#6BC9FF' }}>
	<div class="f comment-header">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="20" height="20"
			><path
				fill="#6BC9FF"
				stroke="#6BC9FF"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M17.5 9.583a6.983 6.983 0 01-.75 3.167 7.084 7.084 0 01-6.333 3.917 6.983 6.983 0 01-3.167-.75L2.5 17.5l1.583-4.75a6.983 6.983 0 01-.75-3.167A7.083 7.083 0 017.25 3.25a6.983 6.983 0 013.167-.75h.416A7.067 7.067 0 0117.5 9.167v.416z"
			/></svg
		>
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
	<section>
		{#each posts as post}
			<article>
				<p>{post.comments}</p>
				<div class="f">
					{#each post.location as loc}
						<span>{loc}</span>
					{/each}
				</div>
				<p>ปีการศึกษา {post.schoolYear}</p>
				<p>createDate {post.createDate}</p>
				<p>by {post.userId}</p>
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
