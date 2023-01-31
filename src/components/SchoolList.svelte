<script lang="ts" context="module">
	export type SchoolData = {
		id: string;
		name: string;
	};
</script>

<script lang="ts">
	import SchoolRating from './SchoolMiniStats.svelte';

	export let school_list: SchoolData[] = [
		{ id: '1010720001', name: '(Test) โรงเรียนพญาไท' },
		{ id: '1010720002', name: '(Test) โรงเรียนโฆสิตสโมสร' },
		{ id: '1010720003', name: '(Test) โรงเรียนราชวินิต' },
		{ id: '1010720004', name: '(Test) โรงเรียนทีปังกรวิทยาพัฒน์ (วัดโบสถ์) ในพระราชูปถัมภ์ฯ' },
		{ id: '1010720005', name: '(Test) โรงเรียนวัดโสมนัส' }
	];
</script>

<ol class="school-list">
	{#each school_list as school (school.id)}
		<li>
			<a class="f" href="/school/{school.id}/">
				<div>
					<div class="school-list-title">โรงเรียน{school.name}</div>
					<!-- <div class="school-list-date">
						โพสต์ล่าสุด {new Date(school.date).toLocaleDateString()}
					</div> -->
				</div>
				<SchoolRating schoolId={school.id} />
			</a>
		</li>
	{/each}
</ol>

<style lang="scss">
	.school-list {
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

				background: #fff;
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
</style>
