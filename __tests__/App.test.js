import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native'

import App from '../App';

describe('<App />', () => {

  it('has 2 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree?.children?.length).toBe(2);
  });

  it('should render Contacts label', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId("contact-label")).toBeTruthy();
  });
});
