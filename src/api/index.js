import {ApiController} from "./api"
import {CardLoyaltyController} from "./cardLoyaltyController";
import {AuthController} from "./authController";

export const apiController = new ApiController()
export const cardLoyaltyController = new CardLoyaltyController()
export const authController = new AuthController()