<script>
	import QuizContent_MC from '$lib/components/QuizContent_MC.svelte';
	import { quizQuestions, AddNewChoice } from '$lib/stores/stores.js';
	import Button from '$lib/components/Button.svelte';
	import ExitCross from '~icons/fluent-emoji-high-contrast/cross-mark';
	import Plus from '~icons/fluent-emoji-high-contrast/plus';

	let selectedQuestionType;

	let quizQuestionsData = [
		{
			questionID: 0,
			questionType: 'multiplechoice',
			questionDisplay: 'basic',
			questionText: 'Select which house you belong to',
			questionContent: [{ choiceText: 'House G', scoreR: 0, scoreG: 1, scoreH: 0, scoreS: 0 }]
		},
		{
			questionID: 1,
			questionType: 'multiplechoice',
			questionDisplay: 'basic',
			questionText: 'Select where you want to live',
			questionContent: [
				{ choiceText: 'House G', scoreR: 0, scoreG: 1, scoreH: 0, scoreS: 0 },
				{ choiceText: 'House R', scoreR: 1, scoreG: 0, scoreH: 0, scoreS: 0 }
			]
		}
	];

	quizQuestions.set(quizQuestionsData);
	//console.log($quizQuestions);	// Note this $ that is how we reference the store

	function SaveChoices(choiceArray) {
		console.log(choiceArray);
	}
</script>

<h1>Editing House sorting quiz</h1>

<div class="my-2">
	<Button>Save quiz</Button>
</div>
{#if quizQuestions}
	<!-- List quiz questions, get them from DB. -->
	<!-- Move quiz button. -->

	<!-- Add new question -->
	<hr class="mb-2" />
	<!-- QUIZ CONTROLS -->
	<div id="quizControls" class="mb-2 flex flex-row justify-between">
		<div class="items-start">
			<Button>Add question</Button>
		</div>
		<div class="items-end">
			<Button><ExitCross /></Button>
		</div>
	</div>
	<!-- QUIZ FORMS -->
	<!-- THIS IS JUST THE INITIAL TEMPLATE. Turn this into a component and then iteratre through the questions loaded in -->
	<div id="quizForm" class="">
		{#each $quizQuestions as question}
			<div class="mt-2 rounded-md bg-slate-200 p-3 drop-shadow-md">
				<!-- ID for the question being edited -->
				<input type="hidden" name="questionID" />

				<!-- Question title aka the question being asked -->
				<div>
					<label for="questionTitle" class="text-center font-semibold">Question text</label>
					<textarea id="questionTitle" rows="4" cols="50" class="w-full rounded-md p-2"
						>{question.questionText}
					</textarea>
				</div>

				<!-- Question type selector -->
				<div class="my-4">
					<label for="questionType" class="mr-4 text-center font-semibold">Question type</label>
					<select name="questionType" bind:value={question.questionType}>
						<option value="multiplechoice">Multiple choice </option>
						<option value="ranking">Ranking (characters) </option>
					</select>
				</div>

				<!-- MULTIPLE CHOICE QUESTION -->
				{#if question.questionType == 'multiplechoice'}
					<div class="text-center font-semibold">Choices</div>
					<fieldset id="choiceFieldset">
						{#each question.questionContent as content, i}
							<QuizContent_MC
								{i}
								choiceText={content.choiceText}
								scoreG={content.scoreG}
								scoreH={content.scoreH}
								scoreR={content.scoreR}
								scoreS={content.scoreS}
							/>
						{/each}
					</fieldset>
					<hr />
					<div class="mb-4 flex flex-row justify-between">
						<Button
							on:click={() => {
								AddNewChoice(question.questionID);
							}}
						>
							<Plus />
						</Button>
						<Button
							on:click={() => {
								//SaveChoices(choices);
							}}
						>
							Save choices
						</Button>
					</div>
				{:else}
					<p>ranking</p>
				{/if}

				<input type="submit" value="Submit" />
			</div>
			<hr class="my-4" />
		{/each}
	</div>
{/if}
