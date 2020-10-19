import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { LngLat, LngLatBoundsLike, LngLatLike, MapMouseEvent } from 'mapbox-gl';
import styles from './LocationMap.module.css';
import withLabel from './utils/LabeledComponent';

/**
 * Max map bounds. Restricts view area
 */
const MAX_BOUNDS: LngLatBoundsLike = [
  /**
   * Southwest coordinates
   */
  [
    29.281524984914313,
    59.62023377214044,
  ],

  /**
   * Northeast coordinates
   */
  [
    31.263740364566985,
    60.282501691026226,
  ],
];

/**
 * Props for LocationMap component
 */
interface Props {
  /**
   * Latitude and longitude of location position
   */
  lngLat?: LngLatLike;

  /**
   * Handler for changing location position
   *
   * @param lngLat - new position
   */
  onChange?(lngLat: LngLat): void;

  /**
   * Is changing position enabled
   */
  viewOnly?: boolean;
}

/**
 * Component for displaying and changing point on map where location located
 *
 * @param props - props for component rendering
 */
export default function LocationMap(props: Props): React.ReactElement {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map>();
  const marker = useRef<mapboxgl.Marker>();
  const [mapState, setMapState] = useState({
    lng: 30.3462,
    lat: 59.9296,
    zoom: 8.5,
  });

  useEffect(() => {
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        attributionControl: false,
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [mapState.lng, mapState.lat],
        zoom: mapState.zoom,
        maxBounds: MAX_BOUNDS,
      });

      const navigationControl = new mapboxgl.NavigationControl();
      const scaleControl = new mapboxgl.ScaleControl();
      const fullscreenControl = new mapboxgl.FullscreenControl();
      const attributionControl = new mapboxgl.AttributionControl({ compact: true });

      map.current.addControl(fullscreenControl, 'top-right');
      map.current.addControl(navigationControl, 'top-right');
      map.current.addControl(scaleControl, 'bottom-right');
      map.current.addControl(attributionControl, 'bottom-left');

      map.current.on('move', () => {
        map.current && setMapState({
          lng: +map.current.getCenter().lng.toFixed(4),
          lat: +map.current.getCenter().lat.toFixed(4),
          zoom: +map.current.getZoom().toFixed(2),
        });
      });

      if (props.lngLat) {
        marker.current = new mapboxgl.Marker()
          .setLngLat(props.lngLat)
          .addTo(map.current);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: MapMouseEvent): void => {
      if (props.onChange) {
        props.viewOnly || props.onChange(e.lngLat);
      }
    };

    if (map.current) {
      map.current.on('click', handler);
    }

    return () => {
      if (map.current) {
        map.current.off('click', handler);
      }
    };
  }, [ props.onChange ]);

  useEffect(() => {
    if (map.current && props.lngLat) {
      if (marker.current) {
        marker.current.setLngLat(props.lngLat);
      } else {
        marker.current = new mapboxgl.Marker()
          .setLngLat(props.lngLat)
          .addTo(map.current);
      }
    }
  }, [ props.lngLat ]);

  return (
    <div className={styles.container}>
      <div className={styles.map} ref={mapContainer}/>
    </div>
  );
}

LocationMap.defaultProps = {
  viewOnly: false,
};

/**
 * Returns LocationMap with label
 */
export const LabeledLocationMap = withLabel(LocationMap);
