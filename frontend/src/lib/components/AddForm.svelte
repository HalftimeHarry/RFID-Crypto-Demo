<script>
	let value = '';
	let disabled = false;

	export { value, disabled };
</script>

<div class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
	<form
		autocomplete="off"
		on:submit
		class="flex overflow-hidden p-2 items-center space-x-2 border-t border-[#677cc0]"
	>
		<input
			class="text-white placeholder:w-full bg-transparent outline-none"
			placeholder="Add a address..."
			bind:value
		/>
		<button
			type="submit"
			{disabled}
			class:cursor-not-allowed={disabled}
			class="bg-[#767699] rounded-lg hover:scale-110"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
		</button>
	</form>
</div>
