import React from 'react';
import renderer from 'react-test-renderer';
import SortingOptions from './sorting-options';

const options = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

it(`SortingOptions is rendered correctly`, () => {
  const tree = renderer
    .create(
        <SortingOptions
          options={options}
          onSelect={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
