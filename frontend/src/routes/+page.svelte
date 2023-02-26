<script>
	import logo from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/albatros_horizontal-320x72.png';
	import logo_fallback from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/alby_logo.png';
	import { onMount } from 'svelte';
	import tipJarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/TipJarController.js';
	import { fade, fly } from 'svelte/transition';
	import AddForm from '/workspace/RFID-Crypto-Demo/frontend/src/lib/components/AddForm.svelte';

	let address = '';
	let tipAmount = 0.01;
	let tipMessage = 'Thanks for the awesome demo!';

	onMount(async () => {
		tipJarController.init();
	});

	const { tip_store, updateForm } = tipJarController;

	$: ({ owner } = $tip_store);

	const onSubmit = (e) => {
		e.preventDefault();
		tipJarController.setNewOwner($updateForm);
	};

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
		<div class="h-full flex-1 relative flex flex-col pb-2 mt-10 overflow-hidden">
			<AddForm bind:value={$updateForm} on:submit={onSubmit} />

			<div class="mt-16" in:fly={{ y: 200, duration: 4000 }} out:fade>
				<source srcset={logo} type="image/webp" />
				<img src={logo_fallback} alt="logo" />
			</div>
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
