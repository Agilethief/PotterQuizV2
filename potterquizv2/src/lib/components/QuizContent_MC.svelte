<script>
	import Button from '$lib/components/Button.svelte';
	import ExitCross from '~icons/fluent-emoji-high-contrast/cross-mark';

	export let i = 0;
	export let choiceText = '';
	export let scoreG = 0;
	export let scoreR = 0;
	export let scoreS = 0;
	export let scoreH = 0;
</script>

<div class="my-4 rounded-md bg-slate-300 p-2">
	<div class="flex">
		<div class="w-1/6 place-self-center">
			<label class="w-full text-lg" for="choice_{i}">
				{String.fromCharCode(i + 'A'.charCodeAt(0))}:
				<input type="radio" id="choice_{i}" name="choiceFieldset" class="size-4" />
			</label>
		</div>
		<div class="mx-4 w-full">
			<textarea
				class=" mb-3 h-16 w-full rounded-md border-2 border-slate-200 p-2 align-text-top"
				id="choiceText_{i}"
				value={choiceText}
			/>
		</div>
		<div class="w-1/6 place-self-center">
			<Button><ExitCross /></Button>
		</div>
	</div>

	<div class="text-center font-semibold">Choice points</div>
	<div class="flex flex-row justify-center gap-6">
		<div class="flex flex-col">
			<input
				value={scoreG}
				pattern="[0-9]"
				class="w-20 rounded-md border-2 border-slate-200 bg-red-500 text-center"
			/>
			Gryffindor
		</div>
		<div class="flex flex-col">
			<input
				value={scoreR}
				pattern="[0-9]"
				class="w-20 rounded-md border-2 border-slate-200 bg-blue-500 text-center"
			/>
			Ravenclaw
		</div>
		<div class="flex flex-col">
			<input
				value={scoreH}
				pattern="[0-9]"
				class="w-20 rounded-md border-2 border-slate-200 bg-yellow-400 text-center"
			/>
			Hufflepuff
		</div>
		<div class="flex flex-col">
			<input
				value={scoreS}
				pattern="[0-9]"
				class="w-20 rounded-md border-2 border-slate-200 bg-green-500 text-center"
			/>
			Slytherin
		</div>
	</div>
</div>
<hr />
