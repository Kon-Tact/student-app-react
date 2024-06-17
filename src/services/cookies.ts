class CookieService {

    public static token: string = "token";
    public static account: string = "connectedAccount";
    
    setCookie(name: string, value: string, days: number) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }

    getCookie(name: string): string | null {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return cookieValue;
            }
        }
        return null;
    }

    removeCookie(name: string) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }

    isAuthenticated():boolean {
        return cookieServiceInstance.getCookie('account') ? true : false;
    }
}

const cookieServiceInstance = new CookieService(); // Creating an instance of CookieService

export default cookieServiceInstance; // Exporting the named instance as the default export
