import * as yup from "yup"
import {ValidationErrors} from "../../common/validationErrors";

export const validationSchema = yup.object().shape({
    name: yup.string().required(ValidationErrors.Required),
    shopId: yup.string().required(ValidationErrors.Required),
    dateRange: yup.array().required(ValidationErrors.Required),
    gender: yup.string().required(ValidationErrors.Required),
    ageRange: yup.string().required(ValidationErrors.Required),
    minBalance: yup.number().required(ValidationErrors.Required).transform(value => isNaN(value) ? undefined : value),
})