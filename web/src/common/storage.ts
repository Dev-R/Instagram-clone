/**
 * Storage common service
*/
export const StorageService = {
    /**
     * Get saved token or information
     * 
     * @param title - title of saved token
     *
     * @returns Saved token
     */
    getStorage(title: string): string {
        return window.localStorage[title]
    },

    /**
     * Save a new token or information
     * 
     * @param title - title to be saved
     * @param token - token to be saved
     *
     * @returns Nothing
     */
    saveStorage(title: string, token: string) {
        window.localStorage[title] = token
    },

    /**
     * Destroy all saved token or information
     * in local storage
     *
     * @returns Nothing
     */
    clearStorage() {
        window.localStorage.clear()
    }
}