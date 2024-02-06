import { writable } from 'svelte/store';

export const darkMode = writable(false);

export const quizQuestions = writable([]);

export function AddNewChoice(questionID) {
	quizQuestions.update((questions) => {
		return questions.map((question) => {
			if (question.questionID === questionID) {
				// If it is the ID, we create a new question object with the extra option.
				return {
					...question,
					questionContent: [
						...question.questionContent,
						{ choiceText: 'Enter the choice here', scoreR: 1, scoreG: 0, scoreH: 0, scoreS: 0 }
					]
				};
			}
			return question; // Returned the unchanged question if id does not line up
		});
	});
}

export function RemoveChoice(questionID, choiceIndex) {
	quizQuestions.update((questions) => {
		return questions.map((question) => {
			// First confirm we have the right question
			if (questionID.questionID != questionID) {
				return question; // If we fail, we simply return the unchanged Q
			}

			// Then return that question with the choiceIndex filtered out.
			return {
				...question,
				questionContent: []
			};
		});
	});
}
