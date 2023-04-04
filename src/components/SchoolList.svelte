<script lang="ts" context="module">
	export type SchoolData = {
		id: string;
		name: string;
		latestPost?: string;
	};
</script>

<script lang="ts">
	import { Lottie } from 'lottie-svelte';
	import SchoolRating from './SchoolMiniStats.svelte';

	export let is_count_rating = false;
	export let is_count_all_comments = false;
	export let school_list: SchoolData[];
</script>

{#if school_list.length}
	<ol class="school-list">
		{#each school_list as school (school.id)}
			<li>
				<a class="f" href="/school/{school.id}/">
					<div>
						<div class="school-list-title">โรงเรียน{school.name}</div>
						{#if school.latestPost}
							<div class="school-list-date">
								โพสต์ล่าสุด {new Date(school.latestPost).toLocaleDateString('th-TH')}
							</div>
						{/if}
					</div>
					<SchoolRating
						count_score={is_count_rating}
						count_comment={is_count_all_comments}
						schoolId={school.id}
					/>
				</a>
			</li>
		{/each}
	</ol>
{:else}
	<div class="f school-list loading">
		<Lottie path="/lotties/loading.json" loop={true} autoplay={true} />
	</div>
{/if}

<style lang="scss">
	.school-list {
		background: #fff;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 8px;
		overflow: hidden;

		list-style: none;
		margin: 0;

		counter-reset: school-list-cnt;

		& > li {
			> a {
				width: 100%;
				padding: 16px;

				gap: 8px;
				border-bottom: 1px #ecf7f7 solid;
				text-decoration: none;
				transition: background 0.1s;

				&::before {
					counter-increment: school-list-cnt;
					content: counter(school-list-cnt);

					width: 16px;
					height: 16px;
					flex: 0 0 16px;

					background: #3c55ab;
					border-radius: 11px;

					font-family: 'Mitr';
					font-weight: 500;
					font-size: 0.8125rem;
					line-height: 16px;
					text-align: center;
					letter-spacing: 0.02em;
					color: #fff;
				}

				&:hover {
					background: #c7eaff;
				}

				.school-list-title {
					font-family: 'Mitr';
					font-weight: 700;
					line-height: 1.25;
					letter-spacing: 0.02em;
					color: #3c55ab;

					margin-bottom: 4px;
				}

				.school-list-date {
					font-size: 0.625rem;
					line-height: 136%;
					color: #b1b2b3;
				}

				@media screen and (min-width: 992px) {
					gap: 16px;

					&::before {
						width: 24px;
						height: 24px;
						flex: 0 0 24px;
						line-height: 24px;
						font-size: 1rem;
					}

					.school-list-date {
						font-size: 0.8125rem;
					}
				}
			}

			&:last-of-type > a {
				border-bottom: none;
			}
		}
	}

	.loading {
		height: 340px;
		justify-content: center;
		flex-direction: column;
	}
</style>
