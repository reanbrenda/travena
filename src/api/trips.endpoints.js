export const tripEndpoints = {
    getFeatured: ``,
    getAllTrips: `/trip/all`,
    getTrip: (tripId) => `/trip/${tripId}`,
    getAgencyTrips: (agencyId) => `/trip/agency/${agencyId}`,
    getTripPromotions : ``,
    getPromotedTrips: (promotionId) => `/trip/promoted/${promotionId}`,
    getCategories: `/trip/categories/list`,
    postTrip: `/trip/new`,
    putTrip: `/trip/update`
}