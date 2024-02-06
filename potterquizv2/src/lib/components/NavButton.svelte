<script>
	/** @type {string} */
	export let href;
</script>

<div id="buttonContainer">
	<a
		{href}
		on:click
		class="
  hover:bg-tim-red
  mt-1
  rounded-lg
  bg-sky-500
  p-1
  transition
  duration-1000
  ease-in-out
  hover:scale-110
  hover:duration-200
  dark:bg-slate-500"
	>
		<slot />
	</a>
</div>
