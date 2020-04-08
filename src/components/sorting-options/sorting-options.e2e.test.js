import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SortingOptions from './sorting-options';

configure({adapter: new Adapter()});

const options = [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`];

it(`onClickToggle is called`, () => {
  const onClickToggle = jest.fn();
  const sortingOptions = shallow(<SortingOptions
    options={options}
    activeOptionIndex={0}
    isOpen={false}
    onClickOption={() => {}}
    onClickToggle={onClickToggle}
  />);
  const toggle = sortingOptions.find(`.places__sorting-type`);

  toggle.simulate(`click`);
  expect(onClickToggle).toHaveBeenCalledTimes(1);
});

it(`onClickToggle is called`, () => {
  const onClickOption = jest.fn();
  const sortingOptions = shallow(<SortingOptions
    options={options}
    activeOptionIndex={0}
    isOpen={true}
    onClickOption={onClickOption}
    onClickToggle={() => {}}
  />);
  const option = sortingOptions.find(`.places__option`).at(2);

  option.simulate(`click`);
  expect(onClickOption).toHaveBeenCalledTimes(1);
});
