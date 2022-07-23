import { InjectionToken } from "@angular/core";

const server: any = {
    "local": {
        "url": "https://staging-api.theyachtwatch.com/api",
    },
    "remote": {
        "url": "https://staging-api.theyachtwatch.com/api"
    }
}

function chooseServer(type: any) {
    return server[type].url;
}

export const BASE_URL = new InjectionToken<string>('', {
    providedIn: "root", factory: () => {
        return chooseServer('remote');
    }
});
