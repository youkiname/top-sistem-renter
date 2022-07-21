import { BaseController } from "./baseController";

export class ApiController extends BaseController {
    getTransactSum() {
        return this.instance.get("/renter/statistic/transactions/sum")
    }

    getVisitorsCountIndicatorMounth() {
        return this.instance.get("/renter/statistic/visitors/month")
    }

    getVisitorCountIndicatorToday() {
        return this.instance.get("/renter/statistic/visitors/today")
    }

    getStatisticTransactionToday() {
        return this.instance.get("/renter/statistic/transactions/sum/today")
    }

    getStatisticUsersGraphMonth() {
        return this.instance.get("/renter/statistic/visitors_graph/month")
    }

    getStatisticAverageSumMonth() {
        return this.instance.get("/renter/statistic/transactions/average_sum/month")
    }

    getStatisticAverageSumToday() {
        return this.instance.get("/renter/statistic/transactions/average_sum/today")
    }

    getStatisticAverageGraph() {
        return this.instance.get("/renter/statistic/transactions/average_sum/graph")
    }

    getShopsIncomeStatistics() {
        return this.instance.get(`statistic/shops`)
    }

    getBanners() {
        return this.instance.get(`/renter/transactions?limit=10/`)
    }

    getBanner(id) {
        return this.instance.get(`banners/${id}`)
    }





    toggleActiveBannerState(id, is_active) {
        let route = 'banners/activate'
        if (is_active) {
            route = 'banners/deactivate'
        }
        return this.instance.put(`${route}/${id}`)
    }

    toggleActivePollState(id, is_active) {
        let route = 'polls/activate'
        if (is_active) {
            route = 'polls/deactivate'
        }
        return this.instance.put(`${route}/${id}`)
    }

    getCustomerStatistics() {
        return this.instance.get(`/renter/statistic/customers`)
    }
    getSellers() {
        return this.instance.get(`renter/sellers`)
    }
    addSeller(data) {
        return this.instance.post(`renter/register_seller`, data)
    }

    getPolls() {
        return this.instance.get(`polls/`)
    }


    getVisitorsAgePlot(range = 'week') {
        return this.instance.get(`renter/statistic/visitors/age_plot/${range}`)
    }
    getStatisticsSellers() {
        return this.instance.get(`renter/statistic/sellers`)
    }
    getShoppingCenters() {
        return this.instance.get(`shopping_centers`)
    }


    getShopCategories() {
        return this.instance.get(`/shops/categories`)
    }
    getLegalForm() {
        return this.instance.get('legal_form')
    }

    savePoll(data) {
        return this.instance.post(`polls`, null, {
            params: data
        })
    }


    updateProfile(data,) {
        return this.instance.put(`renter/update_profile`, data)
    }
}

