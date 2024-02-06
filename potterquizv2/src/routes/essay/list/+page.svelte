<script>
	import Button from '$lib/components/Button.svelte';
	import ButtonJustText from '$lib/components/ButtonJustText.svelte';
	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { onMount } from 'svelte';

	let essays;
	let targetEssay;

	onMount(async () => {
		const response = await fetch('/api/essay/list');
		const data = await response.json();
		//console.log(data);
		essays = data;
	});

	let showCreateModal = false;
	let showDeleteModal = false;

	function DeleteClickedHandler(essay) {
		targetEssay = essay;
		showDeleteModal = true;
	}

	async function DeleteConfirmed() {
		await fetch(`/api/essay/delete/${targetEssay._id}`, {
			method: 'DELETE'
		});

		// TODO: Update list
		essays = essays.filter((t) => t !== targetEssay);
	}
</script>

<!-- TODO: add authentication checking here -->

<div>
	<Button on:click={() => (showCreateModal = true)}>Write new essay</Button>
</div>

{#if essays !== undefined}
	<div id="essayList">
		<table
			class="w-full table-fixed text-slate-900 transition-colors duration-1000 dark:text-slate-50"
		>
			<thead>
				<th class="w-3/5">Essay Title</th>
				<th>Created Date</th>
				<th>Options</th>
			</thead>
			<tbody>
				{#each essays as essay}
					<tr id={essay._id} class="even:bg-slate-100 dark:even:bg-slate-700">
						<td class="w-3/5"
							><ButtonJustText><a href="/essay/{essay._id}">{essay.title}</a></ButtonJustText>
						</td>
						<td class="text-center">{essay.createdDate} </td>
						<td>
							<ButtonJustText
								on:click={() => {
									console.log(`Edit clicked for: ${essay.id}`);
								}}
								><a href="/essay/{essay._id}/edit">Edit</a>
							</ButtonJustText>
							<ButtonJustText
								on:click={() => {
									DeleteClickedHandler(essay);
								}}
							>
								Delete
							</ButtonJustText>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<LoadSpinner loadText="Loading..." />
{/if}

<!-- MODAL for pop ups -->
<Modal
	bind:showModal={showCreateModal}
	confirmAction={async () => {
		// Get the value from the text input
		const essayTitle = document.getElementById('newEssayTitle').value;

		// Send content
		const response = await fetch('/api/essay/create', {
			method: 'POST',
			body: JSON.stringify({ title: essayTitle }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Ensure we got it ok
		if (response.ok) {
			const data = await response.json();
			// Get the new ID of the essay from the response
			const newEssayID = data.id;
			console.log(data);
			console.log(newEssayID);

			// Open the page for the new essay
			window.location.href = `/essay/${newEssayID}/edit`;
		}
	}}
>
	<h2 slot="header">Create new Essay</h2>
	<form class="pt-2">
		<TextInput id="newEssayTitle" title="Essay Title" placeholder="An essay's title" />
	</form>
</Modal>

<Modal
	bind:showModal={showDeleteModal}
	confirmAction={() => {
		DeleteConfirmed();
	}}
>
	<h2 slot="header">Delete Essay?</h2>

	<p>Please confirm you wish to delete the essay</p>
	<p>This action cannot be undone.</p>
</Modal>
