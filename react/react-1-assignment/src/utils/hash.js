export const hashString = (str) => {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
                hash = (hash * 33) ^ str.charCodeAt(i);
        }
        return hash >>> 0; // ensure positive integer
}