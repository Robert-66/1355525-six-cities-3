export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export function adapterApi(data) {
  return data.map((offer) => {
    return {
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
      maxAdults: offer.maxAdults,
      isFavorite: offer.is_favorite,
      goods: offer.goods,
      host: offer.host,
    };
  });
}
