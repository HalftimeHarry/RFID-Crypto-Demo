<script>
	import logo from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/albatros_horizontal-320x72.png';
	import logo_fallback from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/alby_logo.png';
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import tipJarController from '/workspace/RFID-Crypto-Demo/frontend/src/lib/controllers/TipJarController.js';

	let qrCodeDataUrl = '';
	let address = '';
	let tipAmount = 0.01;
	let tipMessage = 'Thanks for the awesome demo!';
	let src = '';

	onMount(async () => {
		const qrdata = `javascript:transferOwnership("This will be a qr used to connect your wallet")`;
		try {
			qrCodeDataUrl = await QRCode.toDataURL(qrdata);
		} catch (error) {
			console.error(error);
		}
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
		{owner}
	</section>
	<div class="flex justify-center items-center h-screen">
		<img class="w-64 h-64" src={qrCodeDataUrl} alt="QR Code" />
	</div>

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
