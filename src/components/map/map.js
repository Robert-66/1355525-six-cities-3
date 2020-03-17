import React from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {offerType} from '../../types/offers-types';
import {MapSettings} from '../../const';

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.mapParams = {
      center: this.props.city,
      zoom: MapSettings.ZOOM,
      zoomControl: false,
      marker: true,
      layers: [
        leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
          attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
        }),
      ]
    };

    this.icon = leaflet.icon({
      iconUrl: MapSettings.ICON_URL,
      iconSize: MapSettings.ICON_SIZE,
    });

    this.iconActive = leaflet.icon({
      iconUrl: MapSettings.ICON_URL_ACTIVE,
      iconSize: MapSettings.ICON_SIZE,
    });
  }

  componentDidMount() {
    this.map = leaflet.map(this.mapRef.current, this.mapParams);
    this.layer = leaflet.layerGroup().addTo(this.map);
    this.updateMarkers(this.props.offers);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.city !== this.props.city) {
      this.map.setView(this.props.city, MapSettings.ZOOM);
    }

    if (prevProps.offers !== this.props.offers || prevProps.hoverOfferId !== this.props.hoverOfferId) {
      this.updateMarkers(this.props.offers);
    }
  }

  updateMarkers(offers) {
    this.layer.clearLayers();
    offers.forEach((offer) => {
      leaflet
        .marker(offer.coords, {icon: offer.id === this.props.hoverOfferId ? this.iconActive : this.icon})
        .addTo(this.layer);
    });
  }

  render() {
    const {className} = this.props;

    return (
      <section
        className={`map${className ? ` ` + className : ``}`}
        ref={this.mapRef}
      />
    );
  }
}

Map.propTypes = {
  className: PropTypes.string,
  offers: PropTypes.arrayOf(offerType).isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
  hoverOfferId: PropTypes.number,
};

export default Map;
