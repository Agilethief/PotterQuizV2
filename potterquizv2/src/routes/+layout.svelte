<script>
	import '../app.css';
	import { darkMode } from '$lib/stores/stores.js';
	import MdiQuill from '~icons/mdi/quill';
	import TdesignModeDark from '~icons/tdesign/mode-dark';
	import IconamoonModeLightLight from '~icons/iconamoon/mode-light-light';
	import Footer from '$lib/components/Footer.svelte';

	function toggleDarkmode() {
		darkMode.set(!$darkMode);
		//console.log('Dark mode toggled: ' + $darkMode);
	}
</script>

<!-- This div's purpose is purely to handle the darkmode settings -->
<div
	id="darkmodeHandler"
	class="{$darkMode
		? 'dark'
		: ''} generalSettings min-h-screen text-slate-900 transition-colors duration-1000 dark:text-slate-50"
>
	<div
		id="bghandler"
		class="
    h-full
    min-h-screen
    w-full bg-slate-50 bg-gradient-to-t
    from-slate-200
    transition-colors
    duration-1000
    dark:bg-slate-800
    dark:from-slate-800
    
    "
	>
		<nav
			id="mainnav"
			class="flex items-center justify-between bg-white px-10 py-5 text-slate-900 drop-shadow-sm transition-colors duration-500 dark:bg-slate-800 dark:text-slate-50"
		>
			<!-- Left hand side title -->
			<div class="flex">
				<MdiQuill style="align: center;" />
				<h1 class="text-xl font-bold"><a href="/">Quibbler Quills</a></h1>
			</div>
			<div class="flex items-center">
				<!-- Search bar -->
				<!--         
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 pt-0.5 text-gray-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						class="font- ml-2 bg-transparent outline-none"
						type="text"
						name="search"
						id="search"
						placeholder="Search..."
					/>
				</div> -->
				<!-- Nav buttons -->
				<ul class="flex items-center space-x-6 font-semibold">
					<a class="hover:text-red-600" href="/quiz">House sorting</a>
					<a class="hover:text-red-600" href="/essay">Essays</a>
					{#if $darkMode}
						<button on:click={toggleDarkmode}
							><TdesignModeDark style="align-items: center; font-size:1.5em" /></button
						>
					{:else}
						<button on:click={toggleDarkmode}
							><IconamoonModeLightLight style="align-items: center; font-size:1.5em" /></button
						>
					{/if}
				</ul>
			</div>
		</nav>
		<div id="mainbody" class="mx-auto min-h-lvh w-10/12">
			<slot />
		</div>
		<Footer />
	</div>
</div>
