import React, { useState } from 'react';
import { calculateDistance } from '../helper/calculateDistance';
import { calculateTime } from '../helper/calculateTime';
import 'bootstrap/dist/css/bootstrap.min.css';

const POICard = ({ pois, propertyLocation }) => {

  const categories = pois.reduce((acc, poi) => {
    const subCategory = poi.subCategory || 'Otros';
    if (!acc[poi.category]) {
      acc[poi.category] = {};
    }
    if (!acc[poi.category][subCategory]) {
      acc[poi.category][subCategory] = [];
    }
    acc[poi.category][subCategory].push(poi);
    return acc;
  }, {});

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categories)[0] || '');

  const renderPOIs = (pois) => {
    return pois.map((poi, index) => {
      if (!poi.location || !poi.location.coordinates) {
        return null; 
      }
      const distance = calculateDistance(
        propertyLocation.coordinates[1],
        propertyLocation.coordinates[0],
        poi.location.coordinates[1],
        poi.location.coordinates[0]
      );
      const time = calculateTime(distance);
      return (
        <li className="list-group-item" key={`${poi._id?.$oid ?? poi._id}-${index}`}>
          <strong>{poi.name}</strong><br />
          {time.toFixed(0)} mins - {distance.toFixed(0)} metros
        </li>
      );
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Información de la zona</h5>
        <p className="card-text">Son los puntos más cercanos al inmueble en un rango de 2 km.</p>
        <ul className="nav nav-tabs" id="poiTab" role="tablist">
          {Object.keys(categories).map((category, index) => (
            <li className="nav-item" key={category}>
              <a
                className={`nav-link ${category === selectedCategory ? 'active' : ''}`}
                id={`${category.replace(/\s+/g, '-')}-tab`}
                data-bs-toggle="tab"
                href={`#${category.replace(/\s+/g, '-')}`}
                role="tab"
                aria-controls={category.replace(/\s+/g, '-')}
                aria-selected={category === selectedCategory}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="poiTabContent">
          {Object.keys(categories).map((category) => (
            <div
              className={`tab-pane fade ${category === selectedCategory ? 'show active' : ''}`}
              id={category.replace(/\s+/g, '-')}
              key={category}
              role="tabpanel"
              aria-labelledby={`${category.replace(/\s+/g, '-')}-tab`}
            >
              {Object.keys(categories[category]).map((subCategory) => (
                <div key={subCategory}>
                  <h6>{subCategory}</h6>
                  <ul className="list-group">
                    {renderPOIs(categories[category][subCategory])}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default POICard;
