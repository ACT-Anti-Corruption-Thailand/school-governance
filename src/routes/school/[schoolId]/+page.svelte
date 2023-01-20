<script lang="ts">
	import { currentSchoolId } from 'stores/school';

	import SchoolHeader from 'components/school/SchoolHeader.svelte';
</script>

<SchoolHeader />

<div class="card">
	<a href="/school/{$currentSchoolId}/data" class="f section-header">
		<img src="/mascots/data.svg" alt="" width="50" height="50" />
		<span>ข้อมูลโรงเรียน</span>
		<img src="/chevrons/right.svg" alt="" width="24" height="24" />
	</a>
</div>

<div class="card">
	<a href="/school/{$currentSchoolId}/rating" class="f section-header">
		<img src="/mascots/star.svg" alt="" width="50" height="50" />
		<span>คะแนน</span>
		<img src="/chevrons/right.svg" alt="" width="24" height="24" />
	</a>
</div>

<div class="card">
	<a href="/school/{$currentSchoolId}/comments" class="f section-header">
		<img src="/mascots/speak.svg" alt="" width="50" height="50" />
		<span>ความคิดเห็น</span>
		<img src="/chevrons/right.svg" alt="" width="24" height="24" />
	</a>
</div>

<style lang="scss">
	.card {
		padding: 16px;

		background: #fff;

		display: flex;
		flex-direction: column;
		gap: 8px;

		margin-bottom: 8px;
	}

	.section-header {
		font-family: 'Mitr';
		font-weight: 500;
		font-size: 1rem;
		line-height: 125%;
		letter-spacing: 0.02em;
		color: #3c55ab;
		text-decoration: none;

		> span {
			line-height: 1;

			margin-left: 16px;
			flex: 1 1 0;
		}
	}
</style>
