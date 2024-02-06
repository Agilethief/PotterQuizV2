<script>
	//SimpleGet();
	import Button from '$lib/components/Button.svelte';
	import SvelteLogo from 'virtual:icons/logos/svelte-icon';
	import GameIconsScrollQuill from '~icons/game-icons/scroll-quill';
	import Fa6SolidScroll from '~icons/fa6-solid/scroll';
	import essayBanner from '$lib/assets/desk-1869579_1280.jpg';

	export let cardImage = '';
	export let cardTitle = 'cardTitle';
	export let cardBody = 'cardBody';
</script>

<div
	id="choiceCard"
	class="container mx-auto mb-4 min-h-80 min-w-80 max-w-sm overflow-hidden rounded bg-indigo-200 shadow-lg dark:bg-slate-600"
>
	<img class="w-full drop-shadow-sm" src={cardImage} alt="Sunset in the mountains" />

	<div class="px-6 py-4">
		<p class="mb-2 text-xl font-bold">{cardTitle}</p>
		<p class="mb-2 text-base text-gray-700">
			{cardBody}
		</p>
		<slot />
	</div>
</div>
