export const logInUser = user => ({
    type: 'LOG_IN_USER',
    payload: user
})

export const logOutUser = () => ({
    type: "LOG_OUT_USER"
})