import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
    username: "",
    loggedIn: false,
});

export { setGlobalState, useGlobalState }