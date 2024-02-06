<script>
	export let id = '';
	export let title = '';
	export let placeholder = 'Enter Text...';
</script>

<label class="pb-1" for={id}>{title}</label>
<input
	class="block w-full rounded-md border-0 py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
	{id}
	type="text"
	{placeholder}
/>
