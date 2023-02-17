<script>
	import welcome from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/albatros_horizontal-320x72.png';
	import welcome_fallback from '/workspace/RFID-Crypto-Demo/frontend/src/lib/images/alby_logo.png';
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';

	let qrCodeDataUrl = '';
	let address = '';
	let tipAmount = 0.01;
	let tipMessage = 'Thanks for the awesome demo!';
	let src = '';

	onMount(async () => {
		const qrdata = 'Hello World!';
		try {
			qrCodeDataUrl = await QRCode.toDataURL(qrdata);
		} catch (error) {
			console.error(error);
		}
	});

	let data = JSON.stringify({
		address: address,
		amount: tipAmount,
		message: tipMessage
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>
<div>
	<section>
		<span class="object-scale-down object-center">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
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

		.welcome {
			display: block;
			position: relative;
			width: 100%;
			height: 0;
			padding: 0 0 calc(100% * 495 / 2048) 0;
		}

		.welcome img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			display: block;
		}
	</style>
</div>
