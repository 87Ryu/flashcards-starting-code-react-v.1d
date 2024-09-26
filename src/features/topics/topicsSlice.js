import { createSlice } from '@reduxjs/toolkit';
import { addQuiz } from '../quizzes/quizzesSlice'; // Import addQuiz from quizzesSlice

// Define the initial state
const initialState = {
    topics: {}
};

const topicsSlice = createSlice({
    name: 'topics',
    initialState: initialState,
    reducers: {
        // Action to add a topic
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id,
                name,
                icon,
                quizIds: [] // Initialize quizIds as an empty array
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addQuiz, (state, action) => {
            const { id, topicId } = action.payload;
            state.topics[topicId].quizIds.push(id); // Add quiz ID to the quizIds array of the relevant topic
        });
    }
});

// Selector to select topics from the state
export const selectTopics = (state) => state.topics.topics;

// Export the actions and reducer
export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;