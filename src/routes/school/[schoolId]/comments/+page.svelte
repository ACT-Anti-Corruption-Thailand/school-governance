<script lang="ts">
	import { PUBLIC_API_HOST } from '$env/static/public';

	import { onMount, tick } from 'svelte';

	import { Lottie } from 'lottie-svelte';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		DialogDescription,
		Popover,
		PopoverButton,
		PopoverPanel
	} from '@rgossiaux/svelte-headlessui';
	import Modal from 'components/Modal.svelte';
	import SchoolHeader from 'components/school/SchoolHeader.svelte';
	import CommentReadmore from 'components/school/CommentReadmore.svelte';

	import { page } from '$app/stores';
	import { currentUser } from 'stores/firebaseapp';
	import { LATEST_COMPUTED_YEAR, computed_years } from 'stores/school';
	import { login_modal_isopen } from 'stores/login_modal';

	$: schoolId = $page.params.schoolId;

	let txt_comment = '';
	let chk_locations: string[] = [];

	$: api_query = `locations=${encodeURIComponent(
		filter_locations.join(',')
	)}&years=${encodeURIComponent(filter_years.join(','))}&sort=${filter_sort_by}`;

	const assignCommentsVariables = async (resp: Response) => {
		const json = await resp.json();
		posts = json?.list.map((e: any) => ({
			...e,
			likedByYourself: e.likedUserIds.find((e: any) => e.userId === $currentUser?.uid)
		}));
	};

	const fetchComments = async () => {
		try {
			const resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments?${api_query}`);

			await assignCommentsVariables(resp);
		} catch (err) {
			console.error(err);
		}
	};

	const likeComment = async (commentId: number) => {
		if (!$currentUser) return;

		try {
			const resp = await fetch(
				`${PUBLIC_API_HOST}/schools/${schoolId}/comments/${commentId}/like`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${$currentUser.accessToken}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						schoolCommentsQuery: {
							locations: filter_locations,
							years: filter_years,
							sort: filter_sort_by
						}
					})
				}
			);

			await assignCommentsVariables(resp);
		} catch (err) {
			console.error(err);
		}
	};

	const unlikeComment = async (likeId: number) => {
		if (!$currentUser) return;

		try {
			const resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/likes/${likeId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${$currentUser.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					schoolCommentsQuery: {
						locations: filter_locations,
						years: filter_years,
						sort: filter_sort_by
					}
				})
			});

			await assignCommentsVariables(resp);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteComment = async () => {
		if (!$currentUser) return;

		try {
			const resp = await fetch(
				`${PUBLIC_API_HOST}/schools/${schoolId}/comments/${going_to_delete_id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${$currentUser.accessToken}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						schoolCommentsQuery: {
							locations: filter_locations,
							years: filter_years,
							sort: filter_sort_by
						}
					})
				}
			);

			await assignCommentsVariables(resp);
		} catch (err) {
			console.error(err);
		} finally {
			going_to_delete_id = null;
			confirm_delete_isopen = false;
		}
	};

	let is_posting_comment = false;
	const addComment = async () => {
		if (!$currentUser) return;
		if (txt_comment.trim() === '' || chk_locations.length === 0) return;

		is_posting_comment = true;

		let uploaded_files;
		try {
			if (selected_files.length) {
				const formData = new FormData();
				for (const f of selected_files) {
					formData.append('files', f);
				}
				formData.append('json', '{}');

				const resp = await fetch(`${PUBLIC_API_HOST}/schools/upload`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${$currentUser.accessToken}`
					},
					body: formData
				});

				uploaded_files = await resp.json();
			}

			const resp = await fetch(`${PUBLIC_API_HOST}/schools/${schoolId}/comments`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${$currentUser.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					comments: txt_comment.trim(),
					location: chk_locations.join(),
					schoolYear: $LATEST_COMPUTED_YEAR,
					...(uploaded_files ? { images: JSON.stringify(uploaded_files) } : null),
					schoolCommentsQuery: {
						locations: filter_locations,
						years: filter_years,
						sort: filter_sort_by
					}
				})
			});

			await assignCommentsVariables(resp);
		} catch (err) {
			console.error(err);
		} finally {
			last_post_has_image = !!uploaded_files;
			comment_modal_isopen = false;
			sent_comment_modal_isopen = true;
			is_posting_comment = false;
		}
	};

	let posts: any[] = [];
	onMount(() => {
		fetchComments();
	});

	const MAX_LOCATION_LEN = 5;
	let filter_sort_by: 'latest' | 'most-liked' = 'latest';
	let filter_locations: ('classroom' | 'toilet' | 'canteen' | 'gym' | 'other')[] = [
		'classroom',
		'toilet',
		'canteen',
		'gym',
		'other'
	];
	let filter_years: number[] = $LATEST_COMPUTED_YEAR ? [$LATEST_COMPUTED_YEAR] : [];

	$: ((_) => {
		fetchComments();
	})([filter_sort_by, filter_locations, filter_years]);

	$: filter_sort_by_lbl = {
		latest: 'ล่าสุด',
		'most-liked': 'เห็นด้วยมากสุด'
	}[filter_sort_by];
	$: filter_locations_lbl =
		filter_locations.length === MAX_LOCATION_LEN
			? 'ทุกสถานที่'
			: filter_locations
					.map(
						(loc) =>
							({
								classroom: 'ห้องเรียน',
								toilet: 'ห้องน้ำ',
								canteen: 'โรงอาหาร',
								gym: 'สนามกีฬา',
								other: 'อื่นๆ'
							}[loc])
					)
					.join(', ');

	const MAX_IMG = 5;

	let el_img_input: HTMLInputElement;
	let selected_files: File[] = [];
	let files_objurl: string[] = [];
	const processImagesInput = () => {
		if (!el_img_input || !el_img_input.files || !el_img_input.files.length) return;

		const available = MAX_IMG - selected_files.length;
		const files = [...el_img_input.files].slice(0, available);

		for (const file of files) {
			selected_files = selected_files.concat(file);
			files_objurl = files_objurl.concat(URL.createObjectURL(file));
		}
	};

	const removeImg = (index: number) => {
		selected_files = selected_files.filter((_, i) => i !== index);
		files_objurl = files_objurl.filter((_, i) => i !== index);
	};

	const formatLikeText = (count_incl_self = 0, self = false) => {
		if (!+count_incl_self) return 'ยังไม่มีใครเห็นด้วยกับสิ่งนี้';
		let who_arr: any[] = [];
		if (self) {
			who_arr = ['คุณ'];
			count_incl_self -= 1;
		}
		if (count_incl_self) who_arr.push(` ${count_incl_self} คน`);
		return `${who_arr.join('และ')}เห็นด้วยกับสิ่งนี้`;
	};

	const formatTag = (locations: string) => {
		return locations.split(',').map(
			(loc) =>
				({
					classroom: 'ห้องเรียน',
					toilet: 'ห้องน้ำ',
					canteen: 'โรงอาหาร',
					gym: 'สนามกีฬา',
					other: 'อื่นๆ'
				}[loc])
		);
	};

	const parseImagesVal = (
		images: any
	): {
		title: string;
		url: string;
	}[] => {
		let _imgs = images;
		if (typeof images === 'string') {
			_imgs = JSON.parse(images);
		}
		if (Array.isArray(_imgs)) return _imgs;
		return [];
	};

	let comment_modal_isopen = false;

	const clear_comment_form = () => {
		txt_comment = '';
		selected_files = [];
		files_objurl = [];
		chk_locations = [];
	};

	$: if (!comment_modal_isopen) clear_comment_form();

	let last_post_has_image = false;
	let sent_comment_modal_isopen = false;

	let going_to_delete_id: number | null = null;
	let confirm_delete_isopen = false;

	let lightbox_open = false;
	let lightbox_url = '';

	const openLightbox = (url: string) => {
		lightbox_url = url;
		lightbox_open = true;
	};

	let el_comment_modal_txtarea: HTMLTextAreaElement;
	const openCommentModal = () => {
		if ($currentUser) {
			comment_modal_isopen = true;
			tick().then(() => {
				el_comment_modal_txtarea.focus();
			});
		} else {
			$login_modal_isopen = true;
		}
	};
</script>

<svelte:head>
	<title>ความคิดเห็นโรงเรียน — โปร่งใสวิทยาคม</title>
	<meta property="og:title" content="ความคิดเห็นโรงเรียน — โปร่งใสวิทยาคม" />
	<meta name="twitter:title" content="ความคิดเห็นโรงเรียน — โปร่งใสวิทยาคม" />
</svelte:head>

<SchoolHeader pageData={{ name: 'ความคิดเห็น', color: '#6BC9FF' }}>
	<div class="f g4">
		<img
			loading="lazy"
			decoding="async"
			src="/icons/comment.svg"
			alt="ความคิดเห็น"
			width="20"
			height="20"
		/>
		<span class="comment-header-val">{posts.length}</span>
	</div>
</SchoolHeader>

<button class="f comment-btn" type="button" on:click={openCommentModal}>
	<div class="comment-btn-txtbox">แล้วคุณละ คิดอย่างไร?</div>
	<img loading="lazy" decoding="async" src="/icons/image.svg" alt="" width="24" height="24" />
</button>
<div class="comment-btn-compensate" />

{#if $currentUser}
	<Modal title="เพิ่มความเห็นใหม่" hideTitle bind:isOpen={comment_modal_isopen}>
		<button
			class="cf-submit"
			type="button"
			disabled={txt_comment.trim() === '' || chk_locations.length === 0 || is_posting_comment}
			on:click={addComment}
			slot="title"
		>
			{#if is_posting_comment}
				กำลังโพสต์...
			{:else}
				ส่งความเห็น
			{/if}
		</button>

		<!-- <p>Current user is: {$currentUser.uid}</p> -->
		<textarea
			bind:this={el_comment_modal_txtarea}
			class="cf-comment"
			rows="5"
			placeholder="คิดเห็นหรืออยากฝากอะไรถึงโรงเรียนบ้าง?"
			bind:value={txt_comment}
		/>

		<div class="f cf-files">
			{#if files_objurl.length < 5}
				<label class="cp">
					<input
						class="cf-file"
						bind:this={el_img_input}
						type="file"
						multiple
						accept="image/*"
						on:change={processImagesInput}
					/>
					<img
						loading="lazy"
						decoding="async"
						src="/comments/add-img.svg"
						alt="เพิ่มรูปภาพ"
						width="50"
						height="50"
					/>
				</label>
			{/if}
			{#if files_objurl.length}
				{#each files_objurl as src, i}
					<div class="cf-filepreview">
						<img loading="lazy" decoding="async" {src} alt="" width="50" height="50" />
						<button type="button" on:click={() => removeImg(i)}>
							<img
								loading="lazy"
								decoding="async"
								src="/comments/remove-img.svg"
								alt=""
								width="16"
								height="16"
							/>
						</button>
					</div>
				{/each}
			{:else}
				<div class="cf-addfile">
					<span>เพิ่มรูปภาพ</span><br />
					<small>สูงสุด 5 รูป และต้องรอการยืนยันจาก admin</small>
				</div>
			{/if}
		</div>

		<div class="f cf-tags">
			<label class="cp cf-tag">
				<input type="checkbox" bind:group={chk_locations} value="classroom" />
				<span>ห้องเรียน</span>
			</label>
			<label class="cp cf-tag">
				<input type="checkbox" bind:group={chk_locations} value="toilet" />
				<span>ห้องน้ำ</span>
			</label>
			<label class="cp cf-tag">
				<input type="checkbox" bind:group={chk_locations} value="canteen" />
				<span>โรงอาหาร</span>
			</label>
			<label class="cp cf-tag">
				<input type="checkbox" bind:group={chk_locations} value="gym" />
				<span>สนามกีฬา</span>
			</label>
			<label class="cp cf-tag">
				<input type="checkbox" bind:group={chk_locations} value="other" />
				<span>อื่นๆ</span>
			</label>
		</div>
	</Modal>

	<Modal title="เพิ่มความเห็นสำเร็จ" hideTitle bind:isOpen={sent_comment_modal_isopen}>
		<div class="f fcm">
			<h3 class="fcm-header">ส่งความคิดเห็นเรียบร้อย</h3>
			<div class="fcm-img">
				<Lottie path="/lotties/feedback_completed.json" loop={true} autoplay={true} />
			</div>
			<div>
				<p class="fcm-t1">
					ขอบคุณที่เข้ามามีส่วนร่วม ความเห็นของคุณมีความหมายต่อการพัฒนาโรงเรียนของเรา
				</p>
				{#if last_post_has_image}
					<p class="fcm-t2">
						Admin ขออนุญาตใช้เวลาตรวจเช็ครูปภาพของคุณ
						โดยจะแสดงผลให้ตามปกติหลังตรวจสอบและยืนยันแล้วว่าไม่มีเนื้อหาที่ขัดต่อนโยบายของเว็บไซต์ซึ่งสนับสนุนการใช้ภาพเพื่อแลกเปลี่ยนความคิดเห็นอย่างสร้างสรรค์
					</p>
				{/if}
			</div>
			<div class="f fcm-btns">
				<button class="fcm-btn" type="button" on:click={() => (sent_comment_modal_isopen = false)}>
					<img
						loading="lazy"
						decoding="async"
						src="/icons/comment.svg"
						alt=""
						width="16"
						height="16"
					/>
					<span>กลับไปดูความเห็น</span>
				</button>
				<button
					class="fcm-btn2"
					type="button"
					on:click={() => {
						sent_comment_modal_isopen = false;
						openCommentModal();
					}}
				>
					<img
						loading="lazy"
						decoding="async"
						src="/icons/comment-add.svg"
						alt=""
						width="16"
						height="16"
					/>
					<span>เพิ่มความเห็นอื่น</span>
				</button>
			</div>
		</div>
	</Modal>

	<Dialog open={confirm_delete_isopen} on:close={() => (confirm_delete_isopen = false)}>
		<DialogOverlay class="delete-modal-backdrop" />

		<div class="delete-modal-box">
			<DialogTitle class="f jcc delete-modal-title">
				<img
					loading="lazy"
					decoding="async"
					src="/icons/delete.svg"
					alt=""
					width="20"
					height="20"
				/>
				<span>ลบความคิดเห็น</span>
			</DialogTitle>
			<DialogDescription class="delete-modal-desc">แน่ใจว่าจะลบความคิดเห็นของคุณ</DialogDescription>
			<div class="f jcc delete-modal-btns">
				<button
					class="f jcc delete-modal-btn1"
					type="button"
					on:click={() => (confirm_delete_isopen = false)}
				>
					<span>ยกเลิก</span>
				</button>
				<button class="f jcc delete-modal-btn2" type="button" on:click={deleteComment}>
					<img
						loading="lazy"
						decoding="async"
						src="/icons/delete-w.svg"
						alt=""
						width="20"
						height="20"
					/>
					<span>ลบ</span>
				</button>
			</div>
		</div>
	</Dialog>
{/if}

<Popover class="comment-filter-container">
	<PopoverButton class="comment-filter-bar">
		<span class="f">
			<img loading="lazy" decoding="async" src="/icons/filter.svg" alt="" width="24" height="24" />
			<span class="filter-field">{filter_sort_by_lbl}</span>
			{#if filter_locations_lbl}
				<span class="filter-field">{filter_locations_lbl}</span>
			{/if}
			{#if filter_years.length}
				<span class="filter-field">{filter_years.map((y) => y + 543).join(', ')}</span>
			{/if}
		</span>
	</PopoverButton>

	<PopoverPanel class="comment-filter-box">
		<fieldset>
			<legend>เรียงตาม</legend>
			<div>
				<label class="custom-control"
					><input
						type="radio"
						name="filter-sort-by"
						bind:group={filter_sort_by}
						value="latest"
					/><span>ล่าสุด</span></label
				>
				<label class="custom-control"
					><input
						type="radio"
						name="filter-sort-by"
						bind:group={filter_sort_by}
						value="most-liked"
					/><span>เห็นด้วยมากสุด</span></label
				>
			</div>
		</fieldset>
		<fieldset>
			<legend>สถานที่</legend>
			<div>
				<label class="custom-control"
					><input type="checkbox" bind:group={filter_locations} value="classroom" /><span
						>ห้องเรียน</span
					></label
				>
				<label class="custom-control"
					><input type="checkbox" bind:group={filter_locations} value="toilet" /><span>ห้องน้ำ</span
					></label
				>
				<label class="custom-control"
					><input type="checkbox" bind:group={filter_locations} value="canteen" /><span
						>โรงอาหาร</span
					></label
				>
				<label class="custom-control"
					><input type="checkbox" bind:group={filter_locations} value="gym" /><span>สนามกีฬา</span
					></label
				>
				<label class="custom-control"
					><input type="checkbox" bind:group={filter_locations} value="other" /><span>อื่นๆ</span
					></label
				>
			</div>
		</fieldset>
		<fieldset>
			<legend>ปีการศึกษา</legend>
			<div>
				{#if $computed_years}
					{#each $computed_years as year (year)}
						<label class="custom-control">
							<input type="checkbox" bind:group={filter_years} value={year} />
							<span>{year + 543}</span>
						</label>
					{/each}
				{/if}
			</div>
		</fieldset>
	</PopoverPanel>
</Popover>
<div class="filter-compensate" />

<div class="desktop-margin">
	<section class="comments">
		{#each posts as post (post.Id)}
			<article class="comment-container">
				<div class="f jcsb comment-header">
					<p class="comment-small">{new Date(post.createDate).toLocaleDateString('th')}</p>
					{#if $currentUser?.uid === post.userId}
						<button
							class="f"
							type="button"
							on:click={() => {
								going_to_delete_id = post.Id;
								confirm_delete_isopen = true;
							}}
						>
							<img
								loading="lazy"
								decoding="async"
								src="/icons/delete.svg"
								alt="ลบ"
								width="24"
								height="24"
							/>
						</button>
					{/if}
				</div>
				<CommentReadmore comment={post.comments} />
				<div class="f g4 comment-images">
					{#each parseImagesVal(post.images) as img (img.title)}
						<button type="button" on:click={() => openLightbox(img.url)}>
							<img
								loading="lazy"
								decoding="async"
								src={img.url}
								alt={img.title}
								width="64"
								height="64"
							/>
						</button>
					{/each}
				</div>
				<p class="f g4 comment-small comment-like">
					{#if $currentUser}
						<button
							class="comment-like-btn"
							type="button"
							on:click={() => {
								post.likedByYourself
									? unlikeComment(post.likedByYourself.Id)
									: likeComment(post.Id);
							}}
						>
							{#if post.likedByYourself}
								<img
									loading="lazy"
									decoding="async"
									src="/icons/like-filled.svg"
									alt=""
									width="16"
									height="16"
								/>
							{:else}
								<img
									loading="lazy"
									decoding="async"
									src="/icons/like.svg"
									alt=""
									width="16"
									height="16"
								/>
							{/if}
						</button>
					{/if}
					{formatLikeText(post.likeCount, post.likedByYourself)}
				</p>
				<div class="f g4">
					{#each formatTag(post.location) as loc}
						<span class="tag">
							<img
								loading="lazy"
								decoding="async"
								src="/icons/tag.svg"
								alt=""
								width="8"
								height="8"
							/>
							{loc}
						</span>
					{/each}
				</div>
				<!-- <p>{JSON.stringify(post)}</p> -->
			</article>
		{/each}
	</section>
</div>

<Dialog open={lightbox_open} on:close={() => (lightbox_open = false)}>
	<DialogOverlay class="lightbox-backdrop" />

	<DialogTitle class="sr-only">ภาพประกอบคอมเมนต์</DialogTitle>
	<DialogDescription>URL: {lightbox_url}</DialogDescription>

	<button class="lightbox-close" type="button" on:click={() => (lightbox_open = false)}>
		<img
			loading="lazy"
			decoding="async"
			src="/icons/close-w.svg"
			alt="ปิด"
			width="32"
			height="32"
		/>
	</button>
	<img loading="lazy" decoding="async" src={lightbox_url} alt="" class="lightbox-image" />
</Dialog>

<style lang="scss">
	@media screen and (min-width: 768px) {
		.desktop-margin {
			width: 100%;
			max-width: 640px;
			margin: auto;
		}
	}

	.jcsb {
		justify-content: space-between;
	}

	.g4 {
		gap: 4px;
	}

	.comment-header {
		min-height: 24px;
	}

	.comment-header-val {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.5625rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}

	.comments {
		padding: 0 16px 64px;
		background: #fff;

		@media screen and (min-width: 768px) {
			padding: 0 16px 32px;
		}
	}

	.comment-container {
		padding: 16px 0;

		& + & {
			border-top: 1px solid #6bc9ff;
		}
	}

	.comment-small {
		font-size: 0.625rem;
		color: #9daad5;

		@media screen and (min-width: 768px) {
			font-size: 0.8125rem;
		}
	}

	.comment-like {
		margin: 8px 0;
	}

	.comment-like-btn {
		cursor: pointer;
	}

	.tag {
		display: inline-flex;
		align-items: center;

		padding: 4px 8px;
		gap: 4px;

		background: #6bc9ff;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 4px;

		color: #fff;
	}

	.comment-images:not(:empty) {
		margin: 4px 0;
		overflow-x: auto;
	}

	.comment-images > button {
		cursor: zoom-in;

		> img {
			object-fit: cover;

			@media screen and (min-width: 768px) {
				width: 128px;
				height: 128px;
			}
		}
	}

	.comment-btn {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		gap: 8px;

		background: #6bc9ff;
		box-shadow: 0 -1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 8px 8px 0 0;
		cursor: pointer;

		position: fixed;
		bottom: 64px;
		width: 100%;
		z-index: 10;

		> .comment-btn-txtbox {
			background: #fff;
			border-radius: 99px;
			padding: 8px 12px;

			color: #b1b2b3;
			flex: 1 1 0;
			text-align: left;
		}
	}

	@media screen and (min-width: 768px) {
		.comment-btn {
			z-index: 11;

			top: calc(var(--navbar-height) + 60px);
			left: calc(50% + 32px);
			bottom: unset;
			transform: translateX(-50%);
			transition: top 0.3s;
			will-change: top;

			width: 100%;
			max-width: 640px;

			border-radius: 0;
		}

		.comment-btn-compensate {
			height: 56px;
		}
	}

	:global(.comment-filter-container) {
		position: fixed;
		top: calc(var(--navbar-height) + 60px);
		transition: top 0.3s;
		will-change: top;
		z-index: 10;
		height: 46px;
		width: 100%;

		@media screen and (min-width: 768px) {
			width: calc(100% - 64px);
			top: calc(var(--navbar-height) + 60px + 56px);
		}
	}

	.filter-compensate {
		height: 46px;
	}

	:global(.comment-filter-bar) {
		display: block;
		padding: 8px 16px;
		width: 100%;
		background: #fff;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);

		cursor: pointer;
		list-style: none;
		&::-webkit-details-marker {
			display: none;
		}

		> span {
			gap: 8px;
			white-space: nowrap;
			overflow: auto;
		}

		.filter-field {
			padding: 4px 8px;

			border: 1px solid #3c55ab;
			border-radius: 4px;
		}
	}

	@media screen and (min-width: 768px) {
		:global(.comment-filter-bar) {
			width: 100%;
			max-width: 640px;
			margin: auto;
			box-sizing: border-box;
		}
	}

	:global(.comment-filter-box) {
		padding: 8px 16px 16px;
		position: absolute;
		background: #fff;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
		left: 0;
		right: 0;
		box-sizing: border-box;
		transition: height 0.3s;
		will-change: height;

		fieldset {
			border: none;
			margin: 0;

			> div {
				padding: 8px;
				display: grid;
				gap: 8px 0;
				grid-template-columns: 1fr 1fr;
			}
		}
	}

	@media screen and (min-width: 768px) {
		:global(.comment-filter-box) {
			width: 100%;
			max-width: 640px;
			margin: auto;
			box-sizing: border-box;
		}
	}

	label.custom-control {
		cursor: pointer;
	}

	label.custom-control > input[type='radio'],
	label.custom-control > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		pointer-events: none;

		+ span {
			--input-unchecked-bg: url(/icons/radio-unchecked.svg);
			--input-checked-bg: url(/icons/radio-checked.svg);

			display: flex;
			align-items: center;

			&::before {
				content: '';
				width: 16px;
				height: 16px;
				background: var(--input-unchecked-bg);
				display: inline-block;
				margin-right: 8px;
			}
		}

		&:checked + span::before {
			background: var(--input-checked-bg);
		}
	}

	label.custom-control > input[type='checkbox'] + span {
		--input-unchecked-bg: url(/icons/checkbox-unchecked.svg);
		--input-checked-bg: url(/icons/checkbox-checked.svg);
	}

	.cf-submit {
		padding: 8px 16px;
		margin-left: auto;

		color: #0c166b;
		background: #6bc9ff;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border: 1px solid transparent;
		border-radius: 16px;

		line-height: 1;

		&[disabled] {
			color: #6bc9ff;
			border: 1px solid #6bc9ff;
			background: none;
			box-shadow: none;
			cursor: not-allowed;
		}
	}

	.cf-comment {
		width: 100%;
		min-height: 10vh;

		color: #3c55ab;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;

		border: none;
		outline: 0;
		resize: vertical;

		&::placeholder {
			color: #b1b2b3;
		}
	}

	.cf-tag > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		width: 0;
		pointer-events: none;

		+ span {
			display: inline-flex;
			gap: 4px;
			padding: 4px 8px;
			margin: 4px 0;

			border: 1px solid #6bc9ff;
			border-radius: 4px;
			color: #6bc9ff;
			line-height: 1;
		}

		&:checked + span {
			padding-left: 4px;

			border: 1px solid transparent;
			background: #6bc9ff;
			box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
			color: #fff;

			&::before {
				content: '';
				background: url(/icons/close-w.svg);
				background-size: 125%;
				background-position: 50%;
				width: 16px;
				height: 16px;
			}
		}
	}

	.cf-tags {
		gap: 8px;
		overflow-x: auto;
		white-space: nowrap;
	}

	.cf-files {
		gap: 8px;
		margin: 16px 0 12px;

		.cf-file {
			position: absolute;
			opacity: 0;
			width: 0;
			pointer-events: none;

			& + img {
				display: block;
			}
		}

		.cf-filepreview {
			position: relative;
			overflow: hidden;
			background: #ddd;
			border-radius: 5px;

			> img {
				display: block;
				object-fit: cover;
				object-position: center;
				border-radius: 5px;
			}

			> button {
				top: 4px;
				left: 4px;
				width: 16px;
				height: 16px;
				position: absolute;
			}
		}

		.cf-addfile {
			line-height: 1;
			font-size: 0.8125rem;

			> span {
				color: #6bc9ff;
			}

			> small {
				color: #b1b2b3;
				font-size: 0.77em;
			}

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}
		}
	}

	.fcm {
		flex-direction: column;
		text-align: center;
		gap: 24px;

		.fcm-header {
			font-family: 'Mitr';
			font-weight: 500;
			font-size: 1.25rem;
			line-height: 125%;
			text-align: center;
			letter-spacing: 0.02em;
		}

		.fcm-img {
			width: 30%;
			margin: auto;
		}

		.fcm-t1 {
			color: #3c55ab;
			font-size: 0.8125rem;

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}
		}

		.fcm-t2 {
			color: #6bc9ff;
			font-size: 0.8125rem;

			@media screen and (min-width: 768px) {
				font-size: 1rem;
			}
		}

		.fcm-btns {
			flex-direction: column;
			gap: 16px;

			.fcm-btn,
			.fcm-btn2 {
				display: inline-flex;
				padding: 8px 16px;
				gap: 8px;

				border: 1px solid #6bc9ff;
				box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
				border-radius: 40px;

				font-family: 'Mitr';
				font-size: 0.8125rem;
				line-height: 125%;
				letter-spacing: 0.02em;
				color: #6bc9ff;

				@media screen and (min-width: 768px) {
					font-size: 1rem;
				}
			}

			.fcm-btn2 {
				background: #6bc9ff;
				color: #fff;
			}
		}

		@media screen and (min-width: 768px) {
			.fcm-btns {
				flex-direction: row;
			}
		}
	}

	:global(.delete-modal-backdrop) {
		position: fixed;
		inset: 0;

		z-index: 32;

		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
	}

	.delete-modal-box {
		position: fixed;
		inset: 50% 16px auto;
		transform: translateY(-50%);
		z-index: 32;
		background: #fff;
		box-shadow: 0 1px 4px rgb(12 22 107 / 20%);
		border-radius: 8px;
		padding: 16px;
		text-align: center;
	}

	@media screen and (min-width: 768px) {
		.delete-modal-box {
			max-width: 640px;
			inset: unset;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}

	:global(.delete-modal-title) {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1.25rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
		gap: 8px;
	}

	:global(.delete-modal-desc) {
		color: #3c55ab;
		margin: 8px 0 16px;
	}

	.delete-modal-btns {
		gap: 8px;
	}

	.delete-modal-btn1,
	.delete-modal-btn2 {
		padding: 8px 16px;
		width: 100%;

		border: 1px solid #3c55ab;
		box-shadow: 0 0 4px rgba(12, 22, 107, 0.2);
		border-radius: 40px;

		font-family: 'Mitr';
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
	}

	.delete-modal-btn2 {
		gap: 8px;
		background: #fc5858;
		border: 1px solid #fc5858;
		color: #fff;
	}

	.cp {
		cursor: pointer;
	}

	:global(.lightbox-backdrop) {
		position: fixed;
		inset: 0;
		background: rgb(0, 0, 0);
		cursor: zoom-out;

		z-index: 20;
	}

	.lightbox-close {
		position: fixed;
		top: 8px;
		left: 8px;
		z-index: 20;
	}

	.lightbox-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 20;

		object-fit: contain;
		object-position: center;

		cursor: zoom-out;
		pointer-events: none;
	}

	@media screen and (min-width: 768px) {
		.lightbox-close {
			top: 32px;
			left: 32px;
		}

		.lightbox-image {
			top: 10vh;
			left: 10vw;
			width: 80vw;
			height: 80vh;
		}
	}
</style>
