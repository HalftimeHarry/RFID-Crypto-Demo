<script>
	export let tips = [];

	const formatDate = (date) => {
		const d = new Date(date);
		return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
	};
</script>

<table class="mt-8 border-collapse table-auto w-2/3 mx-auto text-sm h-80 overflow-auto">
	<thead>
		<tr>
			<th class="border-b border-white font-medium p-4 pl-8 pt-0 pb-3 text-white text-left"
				>Address</th
			>
			<th class="border-b border-white font-medium p-4 pl-8 pt-0 pb-3 text-white text-left"
				>Name</th
			>
			<th class="border-b border-white font-medium p-4 pl-8 pt-0 pb-3 text-white text-left"
				>Message</th
			>
			<th class="border-b border-white font-medium p-4 pl-8 pt-0 pb-3 text-white text-left"
				>Date</th
			>
			<th class="border-b border-white font-medium p-4 pl-8 pt-0 pb-3 text-white text-left"
				>Amount</th
			>
		</tr>
	</thead>
	<tbody>
		{#each tips as item}
			<tr>
				<td class="border-b border-border-white  p-4 pl-8 text-white">{item.address}</td>
				<td class="border-b border-border-white  p-4 pl-8 text-white">{item.name}</td>
				<td class="border-b border-border-white  p-4 pl-8 text-white">{item.message}</td>
				<td class="border-b border-border-white  p-4 pl-8 text-white"
					>{formatDate(item.createdDate)}</td
				>
				<td class="border-b border-white  p-4 pl-8 text-white">{item.amount} ETH</td>
			</tr>
		{/each}
	</tbody>
</table>
