<script>
	import tipJarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/TipJarController.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		await tipJarController.init();
	});

	const { createTip } = tipJarController;

	function addTip() {
		tipJarController.sendTip($createTip);
	}
</script>

<button
	on:click={addTip}
	type="button"
	class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
  focus:outline-none dark:focus:ring-blue-800"
>
	Send Reward
</button>
