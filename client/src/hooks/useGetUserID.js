export const useGetUserID = () => {
    // get userID from localStorage
    return window.localStorage.getItem("userID");
}
