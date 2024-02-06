<script>
	import Button from '$lib/components/Button.svelte';
	import Editor from '$lib/components/Editor.svelte';

	import LoadSpinner from '$lib/components/LoadSpinner.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import TextInput from '$lib/components/TextInput.svelte';

	let quill;
	const pageID = $page.params.id;
	let essay;
	let essayTitle = '';
	let editingTitle = false;
	let container = document.getElementById('editor');
	let editorWrapper;

	onMount(async () => {
		const response = await fetch(`/api/essay/get/${pageID}`);
		const data = await response.json();
		essay = data;
		essayTitle = data.title;
		if (data.content[0] === '{') {
			essay.content = JSON.parse(data.content);
		}

		loadQuill();
	});

	function loadQuill() {
		if (!import.meta.env.SSR) {
			import('quill').then((Quill) => {
				container = document.getElementById('editor');

				if (container) {
					quill = new Quill.default(container, {
						modules: {
							toolbar: [
								['bold', 'italic', 'underline', 'strike'], // toggled buttons
								['blockquote', 'code-block'],

								[{ header: 1 }, { header: 2 }], // custom button values
								[{ list: 'ordered' }, { list: 'bullet' }],
								[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
								[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
								[{ direction: 'rtl' }], // text direction

								[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
								[{ header: [1, 2, 3, 4, 5, 6, false] }],

								[{ color: [] }, { background: [] }], // dropdown with defaults from theme
								[{ font: [] }],
								[{ align: [] }],

								['clean'] // remove formatting button
							]
						},
						theme: 'snow' // or 'bubble'
					});

					// Now load the container with the DB information
					// If it is a string we just put it in as text
					if (typeof essay.content === 'string') {
						quill.setText(essay.content + '\n');
					} else {
						// Else load it as a json object
						quill.setContents(essay.content);
					}
				} else {
					console.error('Editor container not found.');
				}
			});
		}
	}

	async function SaveClick() {
		const quillContents = quill.getContents();

		//console.log('Display contents: ' + container.firstChild.innerHTML);

		// Send content
		const response = await fetch('/api/essay/update', {
			method: 'POST',
			body: JSON.stringify({
				id: essay._id,
				title: essayTitle,
				content: quillContents,
				displayContent: container.firstChild.innerHTML
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (response.ok) {
			alert('Essay saved');
		}
	}
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

{#if essay}
	{#if editingTitle}
		<input
			class="block w-full rounded-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
			id="titleEdit"
			type="text"
			bind:value={essayTitle}
		/>
		<Button
			on:click={() => {
				editingTitle = false;
			}}>Save title</Button
		>
	{:else}
		<h1>Editing: {essayTitle}</h1>
		<Button
			on:click={() => {
				editingTitle = true;
			}}>Edit title</Button
		>
	{/if}
	<Button on:click={SaveClick}>Save essay</Button>
	<hr />
	<div class="mx-auto w-full rounded-lg pt-3">
		<div id="editor"></div>
	</div>
{:else}
	<LoadSpinner />
{/if}
