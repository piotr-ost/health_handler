import React from 'react';
import {Divider} from 'react-native-elements';

const GrayDivider = () => {
  return <Divider style={{height: 2, backgroundColor: 'gray', marginBottom: 5}} />;
}

const GreenDivider = () => {
  return <Divider style={{height: 1, backgroundColor: '#6FBF44', marginBottom: 5}} />;
}

export {GrayDivider, GreenDivider};
