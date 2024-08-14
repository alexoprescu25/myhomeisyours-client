import React, { type FC } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api';
import { waitFor } from 'utils';

const containerStyle = {
  width: '100%',
  height: '400px'
};

type MapProps = {
    lat: number;
    lon: number;
    apiKey: string;
}

const Map: FC<MapProps> = ({ lat, lon, apiKey }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  })

  const [zoom, setZoom] = React.useState<number>(10);
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({ lat, lng: lon });
    map.fitBounds(bounds);

    setMap(map)

    waitFor(100).then(() => { setZoom(17) })
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ { lat, lng: lon } }
        zoom={ zoom }
        onLoad={ onLoad }
        onUnmount={ onUnmount }
      >
        <Circle
            center={{
                lat: lat,
                lng: lon
            }}
            radius={ 80 }
            options={ { 
                strokeColor: "rgba(0, 0, 0, 0.1)", 
                strokeWeight: 1,
                fillColor: 'rgba(0, 0, 0, .1)',
                fillOpacity: 1,
                strokeOpacity: 1
            } }
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map);