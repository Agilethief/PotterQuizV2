<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import FeArrowLeft from '~icons/fe/arrow-left';
	import FeArrowRight from '~icons/fe/arrow-right';
	const pageID = $page.params.id;
	//console.log(pageID);

	let essay;
	let createdDate;
	let updatedDate;
	onMount(async () => {
		const response = await fetch(`/api/essay/get/${pageID}`);
		const data = await response.json();
		essay = data;
		createdDate = new Date(essay.createdDate).toLocaleDateString('en-GB');
		updatedDate = new Date(essay.updatedDate).toLocaleDateString('en-GB');
	});

	function nextClick(nextID) {
		location.href = `/essay/${nextID}`;
	}
	function prevClick(prevID) {
		location.href = `/essay/${prevID}`;
	}
</script>

{#if essay !== undefined}
	<div class="pb-4 pt-4">
		<div id="essayHeader" class="text-center">
			<h1 class="pb-2 text-2xl">{essay.title}</h1>
			<div
				class="flex justify-center gap-6 text-sm font-light italic text-slate-600 dark:text-slate-200"
			>
				<div>Written: {createdDate}</div>
				{#if createdDate != updatedDate}
					<div>Last update: {updatedDate}</div>
				{/if}
			</div>
		</div>
		<hr />
		<div id="essayContent" class="essay_content pt-4">
			{@html essay.displayContent}
		</div>
	</div>

	{#if essay.prev || essay.next}
		<hr class="my-2" style="height:1px;border-width:0;color:gray;background-color:gray" />

		<div id="NextSection" class="flex items-center justify-between gap-10">
			{#if essay.prev !== undefined && essay.prev != ''}
				<div class="flex">
					<button
						class=" hover:bg-tim-red
            hover: focus:bg-tim-red
            container mx-auto mb-4 mt-4 max-h-32 min-h-20 w-48 min-w-20 self-end overflow-hidden rounded bg-indigo-100 px-3 pb-2 pt-2.5
            text-xs font-medium uppercase
            leading-normal shadow-[0_4px_9px_-4px_#3b71ca] shadow-lg
            transition
            duration-150
            ease-in-out hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            focus:outline-none
            focus:ring-0 active:bg-indigo-400
            active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
            dark:bg-slate-600
            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
            dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
            dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
						on:click={prevClick(essay.prev_id)}
					>
						<div class="flex flex-row p-2">
							<FeArrowLeft style="align-items: center; font-size:2em;" />
							<div>
								<p>Previous:</p>
								<p>{essay.prev}</p>
							</div>
						</div>
					</button>
				</div>
			{/if}
			{#if essay.next !== undefined && essay.next != ''}
				<div class="flex items-end">
					<button
						class="  hover:bg-tim-red
          hover: focus:bg-tim-red
          container mx-auto mb-4 mt-4 max-h-32 min-h-20 w-48 min-w-20 self-end overflow-hidden rounded bg-indigo-100 px-3 pb-2 pt-2.5 text-xs
          font-medium uppercase leading-normal
          shadow-[0_4px_9px_-4px_#3b71ca] shadow-lg transition
          duration-150
          ease-in-out
          hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          focus:outline-none
          focus:ring-0
          active:bg-indigo-400 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
          dark:bg-slate-600
          dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)]
          dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
						on:click={nextClick(essay.next_id)}
					>
						<div class="flex flex-row p-2">
							<div>
								<p>Next:</p>
								<p>{essay.next}</p>
							</div>
							<FeArrowRight style="align-items: center; font-size:2em;" />
						</div>
					</button>
				</div>
			{/if}
		</div>
	{/if}
{:else}
	<LoadSpinner />
{/if}
