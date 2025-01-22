import * as React from 'react';
import renderer from 'react-test-renderer';

import StatusBadge from '../StatusBadge';

it(`renders correctly`, () => {
  const tree = renderer.create(<StatusBadge status={'Alive'} />).toJSON();

  expect(tree).toMatchSnapshot();
});
