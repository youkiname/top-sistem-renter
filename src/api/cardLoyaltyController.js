import {BaseController} from "./baseController";

export class CardLoyaltyController extends BaseController {
    updateCardStatus(statusId, data) {
        return this.instance.put(`card_statuses/${statusId}`, data)
    }
}

