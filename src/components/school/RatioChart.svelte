<script lang="ts">
	type ChartSeries = { number: number; color: string; label?: string; font_color?: string };
	type ChartSeriesPercentage = ChartSeries & { percentage: number };

	export let data: ChartSeries[];
	export let percentage_threshold = 10;
	export let label_type: 'percentage' | 'value' = 'percentage';

	let total = 0;
	let data_as_percentage: ChartSeriesPercentage[] | null = null;

	const updatePercentage = (data: ChartSeries[]) => {
		total = data.reduce((a, c) => a + c.number, 0);

		const calcLabel = (data: any, percentage_label: number) => {
			if (data.label) return data.label;
			if (label_type === 'percentage' && data.percentage > percentage_threshold)
				return `${percentage_label}%`;
			if (label_type === 'value') return data.number;
			return '';
		};

		const data_with_percentage = data.map((d) => ({
			...d,
			percentage: (d.number / total) * 100
		}));

		if (label_type === 'value') {
			data_as_percentage = data_with_percentage;
			return;
		}

		// เพื่อไม่ให้เกิดการ 101% ต้องคิดเพื่อทำ label แยก
		// เอาตัวสุดท้ายออก จะได้หาได้ว่า ก่อนหน้านั้นจะมีค่าเท่าไร
		const almost_total_percentage = data_with_percentage
			.slice(0, data_with_percentage.length - 1)
			.reduce((a, c) => a + Math.round(c.percentage), 0);
		let data_percentage_label = data_with_percentage.map((d) => Math.round(d.percentage));
		data_percentage_label[data_percentage_label.length - 1] = 100 - almost_total_percentage;

		data_as_percentage = data_with_percentage.map((d, i) => ({
			...d,
			label: calcLabel(d, data_percentage_label[i])
		}));
	};

	$: updatePercentage(data);
</script>

<div class="f ratiochart-container">
	{#if data_as_percentage}
		{#each data_as_percentage as d}
			{#if d.percentage}
				<div
					class="serie f"
					style:--serie-color={d.color}
					style:--serie-value={d.percentage}
					style:--serie-font-color={d.font_color ?? '#fff'}
				>
					{#if d.label}
						<span class="serie-text">{d.label}</span>
					{:else if d.label === ''}
						<span class="serie-text" />
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
			color: var(--serie-font-color);

			min-height: 16px;

			> .serie-text {
				padding: 8px;
				justify-content: flex-end;

				font-family: 'Mitr';
				font-weight: 500;
				line-height: 125%;
				letter-spacing: 0.02em;
			}
		}
	}
</style>
