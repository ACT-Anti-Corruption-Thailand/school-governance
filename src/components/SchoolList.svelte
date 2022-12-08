<script lang="ts" context="module">
	export type SchoolData = {
		id: number;
		name: string;
		date: string | number;
		rating: number;
		comment: number;
	};
</script>

<script lang="ts">
	import SchoolRating from './SchoolRating.svelte';

	export let school_list: SchoolData[] = [
		{
			id: 1,
			name: 'โรงเรียนร่วมใจศึกษา',
			date: 1666890000000,
			rating: 3.2,
			comment: 50
		},
		{
			id: 2,
			name: 'โรงเรียนศึกษาวิทยาการเรียนเจริญก้าวหน้า',
			date: 1666890000000,
			rating: 3.2,
			comment: 50
		},
		{
			id: 3,
			name: 'โรงเรียนโปร่งใสวิทยา',
			date: 1666890000000,
			rating: 3.2,
			comment: 50
		},
		{
			id: 4,
			name: 'โรงเรียนบ้านร่วมสร้าง',
			date: 1666890000000,
			rating: 3.2,
			comment: 50
		},
		{
			id: 5,
			name: 'โรงเรียนวัดป่าสามัคคี',
			date: 1666890000000,
			rating: 3.2,
			comment: 50
		}
	];
</script>

<ol class="school-list">
	{#each school_list as school (school.id)}
		<li>
			<a class="f" href="/school/{school.id}/">
				<div>
					<div class="school-list-title">{school.name}</div>
					<div class="school-list-date">
						โพสต์ล่าสุด {new Date(school.date).toLocaleDateString()}
					</div>
				</div>
				<SchoolRating rating={school.rating} comment={school.comment} />
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
					background: #ecf7f7;
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
			}

			&:last-of-type > a {
				border-bottom: none;
			}
		}
	}
</style>
