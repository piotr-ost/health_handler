import React from 'react';
import {Divider} from 'react-native-elements';

const GrayDivider = () => {
  return <Divider style={{height: 2, backgroundColor: '#848484', marginBottom: 5}} />;
}

const GreenDivider = () => {
  return <Divider style={{height: 1, backgroundColor: '#6FBF44', marginBottom: 5}} />;
}

const ThinGrayDivider = () => {
  return <Divider style={{height: 0.5, backgroundColor: '#D1D1D1', marginBottom: 5}} />;
}

export {GrayDivider, GreenDivider, ThinGrayDivider};
