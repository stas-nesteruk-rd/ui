let currentUser = undefined;

const getCurrentUser = () => {
    return currentUser;
};

const setCurrentUser = user => {
    currentUser = user;
};
export { getCurrentUser, setCurrentUser };
