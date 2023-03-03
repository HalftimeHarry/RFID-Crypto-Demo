<script>
	import MetamaskController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/MetamaskController.js';
	import navbarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/NavbarController.js';
	import JsonViewer from '/workspace/RFID-Crypto-Demo/frontend/src/lib/components/JsonViewer.svelte';
	import Navbar from '/workspace/RFID-Crypto-Demo/frontend/src/lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import './styles.css';

	const onChainChanged = (chainId) => {
		chainId = parseInt(chainId, 16);
		MetamaskController.networkChanged(chainId);
	};

	const { store } = MetamaskController;
	const { nav_store } = navbarController;

	onMount(async () => {
		await MetamaskController.init();
		await navbarController.init();
		if ($store.isMetamaskInstalled) {
			window.ethereum.on('chainChanged', onChainChanged);
		}
	});

	$: ({ address, balance } = $nav_store);
	$: ({ isConneted, isWrongNetwork, isMetamaskInstalled, message, isLocked } = $store);
</script>

<div class="app">
	<Navbar {address} {balance} />
	<div class="bg-cyan-800">
		<header />
		<main>
			{#if isConneted}
				<slot />
			{:else if isWrongNetwork}
				<p>Wrong network conneted</p>
			{:else if isMetamaskInstalled}
				<p>{message}</p>
			{:else if isLocked}
				<p>Please unlock your account</p>
			{:else}
				<p>Loading...</p>
			{/if}
		</main>

		<footer class="bg-gray-800 py-4">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between">
					<div class="text-gray-400">RFID Crypto Demo © 2023</div>
					<div>
						<a href="#" class="text-gray-400 hover:text-white"> Privacy Policy </a>
						<span class="text-gray-400 mx-2">|</span>
						<a href="#" class="text-gray-400 hover:text-white"> Terms of Use </a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
