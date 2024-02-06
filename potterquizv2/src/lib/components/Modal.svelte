<script>
	import Button from './Button.svelte';

	export let showModal;
	export let confirmAction;

	let dialog;

	$: if (dialog && showModal) dialog.showModal();

	async function actionConfirmed() {
		await confirmAction();
		dialog.close();
	}
</script>

<!-- TODO: Add some nice animation juice. -->
{#if showModal}
	<div
		id="Background blurrer"
		class="absolute left-0 top-0 h-screen w-screen bg-white/30 opacity-100 backdrop-blur-sm transition-all"
	></div>
{/if}

<!-- TODO: Dress the modal up to look a bit nicer. -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="backdrop-blur-xs w-8/12 rounded-md shadow-md"
>
	<div on:click|stopPropagation class="m-4 flex flex-col">
		<slot name="header" />
		<hr />
		<div class="pb-4 pt-4">
			<slot />
		</div>
		<hr />

		<div class="flex flex-row justify-end gap-3 self-end pt-4">
			<Button autofocus on:click={() => dialog.close()}>Cancel</Button>
			<Button on:click={actionConfirmed}>Confirm</Button>
		</div>
	</div>
</dialog>
