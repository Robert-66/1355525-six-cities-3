import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list';

const cities = [
  `Amsterdam`,
  `Paris`
];

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={cities}
          onClickCity={() => {}}
          currentCity={`Amsterdam`}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
