<script>
	import logo from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/albatros_horizontal-320x72.png';
	import logo_fallback from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/alby_logo.png';
	import { onMount } from 'svelte';
	import tipJarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/TipJarController.js';
	import { fade, fly } from 'svelte/transition';

	let address = '';
	let tipAmount = 0.01;
	let tipMessage = 'Thanks for the awesome demo!';
	let src = '';
	let newOwnerAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

	const setNewOwner = async (newOwnerAddress) => {
		try {
			await tipJarController.setNewOwner(newOwnerAddress);
			console.log(`Transferred ownership to ${newOwnerAddress}`);
		} catch (error) {
			console.error('Error transferring ownership:', error);
		}
	};

	onMount(async () => {
		tipJarController.init();
	});

	const { tip_store } = tipJarController;

	$: ({ owner } = $tip_store);

	let data = JSON.stringify({
		address: address,
		amount: tipAmount,
		message: tipMessage
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Albatross demo app" />
</svelte:head>
<div>
	<section>
		<span class="object-scale-down object-center">
			<picture>
				<source srcset={logo} type="image/webp" />
				<img src={logo_fallback} alt="logo" />
			</picture>
		</span>
		<div class="text-cyan-100">The owner of the contract | {owner}</div>
		<button
			class=" mt-16 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span
				class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
				on:click={setNewOwner}
				>Make me the owner!
			</span>
		</button>
		<div class="mt-16" in:fly={{ y: 200, duration: 4000 }} out:fade>
			<source srcset={logo} type="image/webp" />
			<img src={logo_fallback} alt="logo" />
		</div>
	</section>

	<style>
		section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 0.6;
		}

		h1 {
			width: 100%;
		}

		.logo {
			display: block;
			position: relative;
			width: 100%;
			height: 0;
			padding: 0 0 calc(100% * 495 / 2048) 0;
		}

		.logo img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			display: block;
		}
	</style>
</div>
