import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function MapClickHandler({ onLocationSelect, selectionMode }) {
  const [clickCount, setClickCount] = useState(0);
  const [bounds, setBounds] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (selectionMode === 'point') {
        onLocationSelect({
          type: 'Point',
          coordinates: [lng, lat]
        });
      } else if (selectionMode === 'polygon') {
        if (clickCount === 0) {
          setBounds({ lat1: lat, lng1: lng });
          setClickCount(1);
        } else if (clickCount === 1) {
          const lat1 = Math.min(bounds.lat1, lat);
          const lat2 = Math.max(bounds.lat1, lat);
          const lng1 = Math.min(bounds.lng1, lng);
          const lng2 = Math.max(bounds.lng1, lng);

          onLocationSelect({
            type: 'Polygon',
            coordinates: [[
              [lng1, lat1],
              [lng2, lat1],
              [lng2, lat2],
              [lng1, lat2],
              [lng1, lat1]
            ]]
          });
          setClickCount(0);
          setBounds(null);
        }
      }
    }
  });

  return null;
}

const Map = ({ onLocationSelect, selectedGeometry, selectionMode = 'point' }) => {
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onLocationSelect={onLocationSelect}
          selectionMode={selectionMode}
        />

        {selectedGeometry && selectedGeometry.type === 'Point' && (
          <Marker position={[selectedGeometry.coordinates[1], selectedGeometry.coordinates[0]]}>
            <Popup>
              Selected Location<br/>
              Lat: {selectedGeometry.coordinates[1].toFixed(4)}<br/>
              Lon: {selectedGeometry.coordinates[0].toFixed(4)}
            </Popup>
          </Marker>
        )}

        {selectedGeometry && selectedGeometry.type === 'Polygon' && (
          <Rectangle
            bounds={[
              [selectedGeometry.coordinates[0][0][1], selectedGeometry.coordinates[0][0][0]],
              [selectedGeometry.coordinates[0][2][1], selectedGeometry.coordinates[0][2][0]]
            ]}
            pathOptions={{ color: 'var(--primary)', weight: 2 }}
          >
            <Popup>Selected Area</Popup>
          </Rectangle>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
