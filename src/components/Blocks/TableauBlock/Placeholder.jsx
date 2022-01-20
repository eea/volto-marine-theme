import React from 'react';
import { Image } from 'semantic-ui-react';

const TableauPlaceholder = (props) => {
  const { url } = props.data;
  const imageSRC = url + '?&:format=png';

  return (
    <div className="tableau-image-placeholder">
      <Image src={imageSRC} />
    </div>
  );
};

export default TableauPlaceholder;
