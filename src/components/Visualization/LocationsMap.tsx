import React from 'react';

/**
 * Displays map with all locations
 */
export default function LocationsMap(): React.ReactElement {
  return (
    <div className='visualization-block'>
      <h2 className='visualization-block__header'>Locations map</h2>
      <div className='visualization-block__content visualization-block__content--light p-0'>
        <iframe
          frameBorder='0'
          height='580'
          src='https://observablehq.com/embed/@nikmel/st-retrospect-locations-map?cell=map'
          width='100%'/>
      </div>
    </div>
  );
}
