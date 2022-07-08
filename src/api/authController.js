import { BaseController } from "./baseController";

export class AuthController extends BaseController {
    getVerifyCode(params) {
        return this.instance.get('auth/verify', {
            params
        })
    }
    applyCsrfCookie() {
        return this.instance.get('csrf-cookie')
    }
    getAuth(params) {
        return this.instance.get(`auth/admin`, { params })
    }
    getMe() {
        return this.instance.get(`me/admin`)
    }
    logout() {
        return this.instance.post(`logout`)
    }
}