export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
        return payload.exp > Date.now() / 1000; // Check if token is expired
    } catch (error) {
        return false;
    }
};
