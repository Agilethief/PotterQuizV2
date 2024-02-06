<script>
	import loadIcon from '$lib/assets/90-ring-with-bg.svg';
	export let loadText = '';
</script>

<div class="p-5">
	<img src={loadIcon} class="mx-auto size-10 animate-spin" alt="spinning load icon" />

	<div><p class="text-center text-sm italic">{loadText}</p></div>
</div>
