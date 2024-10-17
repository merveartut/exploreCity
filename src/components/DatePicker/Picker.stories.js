import React, { useState } from 'react';
import Picker from './Picker';

export default {
  title: 'Components/Picker',
  component: Picker,
};

const Template = (args) => {
  const [dateValue, setDateValue] = useState([null, null]);

  const handleSelectDate = (newValue) => {
    setDateValue(newValue);
  };

  return <Picker {...args} dateValue={dateValue} onSelectDate={handleSelectDate} />;
};

export const Default = Template.bind({});
Default.args = {
  dateValue: [null, null],
};