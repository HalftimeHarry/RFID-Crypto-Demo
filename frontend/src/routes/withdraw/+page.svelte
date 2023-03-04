<script>
	import tipJarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/TipJarController.js';

	const { tip_store } = tipJarController;

	$: ({ owner } = $tip_store);

	let IamtheOwner = false;

	async function checkOwnership() {
		const currentUser = await tipJarController.getCurrentUser();
		IamtheOwner = currentUser && currentUser.toLowerCase() === owner.toLowerCase();
	}

	async function withdraw() {
		await tipJarController.withdraw();
	}

	checkOwnership();
</script>

{#if IamtheOwner}
	<button
		on:click={withdraw}
		type="button"
		class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
      font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
      focus:outline-none dark:focus:ring-blue-800"
	>
		Withdraw
	</button>
{:else}
	<button
		disabled
		class="bg-gray-400 cursor-not-allowed text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
	>
		Not Owner
	</button>
{/if}
