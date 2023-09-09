export const userEndpoints = {
    login : "/login",
    signUP : "/register",
    verifyEmail: "/verifyEmail",
    forgetPassword: "/resetPasswordCode",
    resetPassword: "/resetPassword",
    getProfile: (userID) => `profile/${userID}`,
    editProfile: "",
    logoutUser:'/logout'
}