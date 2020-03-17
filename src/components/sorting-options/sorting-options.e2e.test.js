import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortingOptions from './sorting-options';

configure({adapter: new Adapter()});

const options = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

it(`Click on toggle should work correctly`, () => {
  const sortingOptions = shallow(<SortingOptions
    options={options}
    onSelect={() => {}}
  />);
  const toggle = sortingOptions.find(`.places__sorting-type`);

  toggle.simulate(`click`);
  expect(sortingOptions.find(`.places__options`).hasClass(`places__options--opened`)).toEqual(true);

  toggle.simulate(`click`);
  expect(sortingOptions.find(`.places__options`).hasClass(`places__options--opened`)).toEqual(false);
});

it(`Click on toggle should change state correctly`, () => {
  const sortingOptions = shallow(<SortingOptions
    options={options}
    onSelect={() => {}}
  />);
  const toggle = sortingOptions.find(`.places__sorting-type`);

  toggle.simulate(`click`);
  expect(sortingOptions.state().isOpen).toBeTruthy();

  toggle.simulate(`click`);
  expect(sortingOptions.state().isOpen).toBeFalsy();
});

it(`Click on option should change state correctly`, () => {
  const sortingOptions = shallow(<SortingOptions
    options={options}
    onSelect={() => {}}
  />);
  const option = sortingOptions.find(`.places__option`).at(2);

  sortingOptions.setState({isOpen: true});

  option.simulate(`click`);

  expect(sortingOptions.state().isOpen).toBeFalsy();
  expect(sortingOptions.state().activeOptionIndex).toEqual(2);
});

it(`onSelect should be called in correct format`, () => {
  const handleOptionSelect = jest.fn((...args) => [...args]);
  const sortingOptions = shallow(<SortingOptions
    options={options}
    onSelect={handleOptionSelect}
  />);

  sortingOptions.find(`.places__option`).at(2).simulate(`click`);

  expect(handleOptionSelect).toHaveBeenCalledTimes(1);

  expect(handleOptionSelect.mock.calls[0][0]).toEqual(2);
});
