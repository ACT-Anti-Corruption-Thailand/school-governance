<script lang="ts">
	type ChartSeries = { number: number; color: string; label?: string };
	type ChartSeriesPercentage = ChartSeries & { percentage: number };

	export let data: ChartSeries[];
	export let percentage_threshold = 10;
	export let label_type: 'percentage' | 'value' = 'percentage';

	let total = 0;
	let data_as_percentage: ChartSeriesPercentage[] | null = null;

	const updatePercentage = (data: ChartSeries[]) => {
		total = data.reduce((a, c) => a + c.number, 0);
		data_as_percentage = data.map((d) => ({
			...d,
			percentage: (d.number / total) * 100
		}));
	};

	$: updatePercentage(data);
</script>

<div class="f ratiochart-container">
	{#if data_as_percentage}
		{#each data_as_percentage as d}
			{#if d.percentage}
				<div class="serie f" style:--serie-color={d.color} style:--serie-value={d.percentage}>
					{#if d.label}
						<span class="serie-text">{d.label}</span>
					{:else if label_type === 'percentage' && d.percentage > percentage_threshold}
						<span class="serie-text">{~~d.percentage}%</span>
					{:else if label_type === 'value'}
						<span class="serie-text">{d.number}%</span>
					{/if}
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.ratiochart-container {
		align-items: stretch;
		gap: 2px;

		> .serie {
			flex: var(--serie-value) var(--serie-value) 0;

			background: var(--serie-color);
			border-radius: 2px;

			text-align: right;
			color: #fff;

			min-height: 16px;

			> .serie-text {
				padding: 8px;

				font-family: 'Mitr';
				font-weight: 500;
				line-height: 125%;
				letter-spacing: 0.02em;

				justify-content: flex-end;
			}
		}
	}
</style>
