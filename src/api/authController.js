import { BaseController } from "./baseController";

export class AuthController extends BaseController {
    verifyTwoFactorAuth(params) {
        return this.instance.get('auth/verify', {
            params
        })
    }
    applyCsrfCookie() {
        return this.instance.get('csrf-cookie')
    }
    getAuth(params) {
        return this.instance.get(`renter/auth`, { params })
    }
    getMe() {
        return this.instance.get(`get_me`)
    }
    logout() {
        return this.instance.post(`logout`)
    }
}