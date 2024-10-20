import React from 'react';
import Ratings from 'react-ratings-declarative';

const StarRating = ({ rating }) => {
  return (
    <Ratings
      rating={rating}
      widgetRatedColors="rgb(255, 153, 51)"
      widgetDimensions="20px"
      widgetSpacings="0px"
    >
      <Ratings.Widget widgetHoverColor="rgb(255, 153, 51)" />
      <Ratings.Widget widgetHoverColor="rgb(255, 153, 51)" />
      <Ratings.Widget widgetHoverColor="rgb(255, 153, 51)" />
      <Ratings.Widget widgetHoverColor="rgb(255, 153, 51)" />
      <Ratings.Widget widgetHoverColor="rgb(255, 153, 51)" />
    </Ratings>
  );
};

export default StarRating;
