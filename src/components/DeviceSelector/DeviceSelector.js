import React from 'react'
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import { DEVICE_TYPES } from '../../constants'

const DeviceSelector = ({ deviceType, deviceList }) => {
  return (
  <FormGroup className="d-flex align-items-center mb-4">
    <Label for="camera" className="col-4 text-capitalize">{deviceType}:</Label>
    <Input type="select" name="select" id="camera" className="col-8">
      {
        deviceList.length > 0
          ? deviceList.map(({ name, value }) => (<option value={value}>{name}</option>))
          : <option value="" disabled selected>No {deviceType} is detected</option>
      }
    </Input>
  </FormGroup>
  )
}

DeviceSelector.defaultProps = {
  deviceType: []
};


DeviceSelector.propTypes = {
  deviceType: PropTypes.oneOf(Object.values(DEVICE_TYPES)).isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }))
};

export default DeviceSelector;
