
export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addUser':
            return {
                ...state,
                users: [
                    ...state.users,
                    {
                        ...action.payload,
                    }
                ]
            };
        case 'removeUser':
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            };
        case 'updateUser':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.payload.id) {
                        return {
                            ...action.payload,
                            password: u.password
                        };
                    }
                    return u;
                })
            };
        case 'loadingUsers':
            const { totalPages, currentPage } = action.payload;
            return {
                ...state,
                users: action.payload.content,
                paginator: {
                    totalPages,
                    currentPage
                }
            };
        default:
            return state;
    }
};
