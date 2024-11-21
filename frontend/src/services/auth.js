export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        // Decode JWT and check expiration
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp > Date.now() / 1000; // Token is valid if not expired
    } catch (error) {
        console.error("Invalid token:", error); // Log errors for debugging
        return false;
    }
};
