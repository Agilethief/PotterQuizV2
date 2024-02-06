<script>
	import ItemCard from '../lib/components/ItemCard.svelte';

	//SimpleGet();
	import Button from '$lib/components/Button.svelte';
	import SvelteLogo from 'virtual:icons/logos/svelte-icon';
	import GameIconsScrollQuill from '~icons/game-icons/scroll-quill';
	import Fa6SolidScroll from '~icons/fa6-solid/scroll';
	import essayBanner from '$lib/assets/desk-1869579_1280.jpg';
</script>

<div class="mx-auto mt-5 w-fit">
	<h1 class="text-2xl">Welcome to Quibbler Quills</h1>
	<br />
	<p>
		Step into our library of enchantment and embark on a journey through the pages of Quibbler
		Quills
	</p>

	<!-- TODO: Make these collapse under each other on small screens -->
	<div class="mt-10 columns-2xs gap-8">
		<!-- ESSAYS card -->
		<ItemCard
			cardTitle="Explore essays"
			cardBody="Explore essays and insightful analyses that delve into character studies and thematic
    explorations."
			cardImage={essayBanner}
		>
			<div class="mx-auto flex pt-5">
				<Button
					on:click={() => {
						location.href = '/essay';
					}}>Explore</Button
				>
				<Button
					on:click={() => {
						location.href = '/essay/latest';
					}}>Latest</Button
				>
			</div>
		</ItemCard>

		<!-- QUIZ card -->
		<ItemCard
			cardTitle="Sorting Quiz"
			cardBody="Find which house you belong to. Complete this quiz to discover your calling."
			cardImage={essayBanner}
		>
			<div class="mx-auto flex pt-5">
				<Button
					on:click={() => {
						location.href = '/quiz';
					}}>Take the quiz</Button
				>
			</div>
		</ItemCard>
	</div>
	<hr />
</div>
