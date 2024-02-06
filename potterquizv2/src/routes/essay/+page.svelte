<script>
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import { onMount } from 'svelte';

	let essays;
	let searchTerm = '';
	let filteredEssays;
	onMount(async () => {
		const response = await fetch('/api/essay/list');
		const data = await response.json();
		//console.log(data);
		essays = data;
		filteredEssays = essays; // Default to all
	});

	function searchFilter() {
		return (filteredEssays = essays.filter((essay) => {
			let essayTitle = essay.title.toLowerCase();
			return essayTitle.includes(searchTerm.toLowerCase());
		}));
	}

	// TODO: Consider putting this in the data structure instead of here.
	function CreateBlurb(text, maxLength) {
		let blurb = text.substring(0, maxLength);

		if (text.length > maxLength) {
			blurb += '...';
		}
		return blurb;
	}
</script>

{#if filteredEssays !== undefined}
	<div class="grid grid-cols-3">
		<div class="col-span-2">
			<div class="pt-2 text-2xl font-semibold">Essays</div>
		</div>
		<div>
			<form class="pt-2">
				<input
					class="block w-full rounded-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
					id="search"
					type="text"
					placeholder="Search"
					bind:value={searchTerm}
					on:input={searchFilter}
				/>
			</form>
		</div>
	</div>
	<div id="essayContainer" class="grid min-w-20 grid-cols-2 gap-3">
		{#each filteredEssays as essay}
			<div
				class="duration my-3 min-h-60 min-w-60 gap-4 overflow-hidden rounded-md bg-slate-100 drop-shadow transition-transform duration-300 hover:-translate-y-1"
			>
				<div id="header" class="grid min-h-24 w-full items-end justify-items-end bg-indigo-500">
					{#if essay.image}
						<img class="w-full" src={essay.image} alt="Supporting image" />
					{/if}
					<div class="p-4 text-2xl font-semibold text-slate-50">{essay.title}</div>
				</div>
				<div class="px-6 py-4">
					<div class="text-sm font-light italic text-slate-600 dark:text-slate-200">
						{new Date(essay.createdDate).toLocaleDateString('en-GB')}
					</div>
					<div class="my-4">{CreateBlurb(essay.content, 120)}</div>
					<div class="grid w-full items-end justify-items-end">
						<Button on:click={() => (location.href = `/essay/${essay._id}`)}>Read</Button>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<LoadSpinner loadText="Loading..." />
{/if}
