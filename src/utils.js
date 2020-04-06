export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const adapterApi = {
  transformOffer: (offer) => ({
    city: offer.city,
    previewImage: offer.preview_image,
    isPremium: offer.is_premium,
    type: offer.type,
    id: offer.id,
    name: offer.title,
    price: offer.price,
    coords: [offer.location.latitude, offer.location.longitude],
    rating: offer.rating,
    description: offer.description,
    images: offer.images,
    bedrooms: offer.bedrooms,
    maxAdults: offer.max_adults,
    isFavorite: offer.is_favorite,
    goods: offer.goods,
    host: {
      name: offer.host.name,
      isPro: offer.host.is_pro,
      avatarUrl: offer.host.avatar_url,
    },
  }),
  transformOffers: (data) => data.map(adapterApi.transformOffer),
  transformReview: (review) => ({
    comment: review.comment,
    date: review.date,
    id: review.id,
    rating: review.rating,
    user: {
      avatarUrl: review.user.avatar_url,
      id: review.user.id,
      isPro: review.user.is_pro,
      name: review.user.name,
    },
  }),
  transformReviews: (data) => data.map(adapterApi.transformReview),
};
