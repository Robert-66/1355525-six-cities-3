import {reducer, ActionCreators, ActionTypes} from './app.js';
import {CityNames} from '../../const';

describe(`App Reducer work correctly`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: CityNames.PARIS,
      sortBySelectedOptionIndex: 0,
      hoverOfferId: null,
    });
  });

  it(`Reducer should change city by a given value`, () => {
    expect(reducer({
      city: ``,
    }, ActionCreators.changeCity(CityNames.PARIS))).toEqual({
      city: CityNames.PARIS,
    });
  });

  it(`Reducer should set selected option index sort by a given value`, () => {
    expect(reducer({
      sortBySelectedOptionIndex: 0,
    }, ActionCreators.setSortBySelectedOptionIndex(1))).toEqual({
      sortBySelectedOptionIndex: 1,
    });
  });

  it(`Reducer should set the identifier of the offer that the cursor is over by a given value`, () => {
    expect(reducer({
      hoverOfferId: null,
    }, ActionCreators.setHoverOfferId(11))).toEqual({
      hoverOfferId: 11,
    });
  });

  it(`Reducer should set the offer identifier to null when the cursor leaves the offer by a given value`, () => {
    expect(reducer({
      hoverOfferId: 11,
    }, ActionCreators.resetHoverOfferId())).toEqual({
      hoverOfferId: null,
    });
  });
});

describe(`App Action creators work correctly`, () => {

  it(`Action creator for change city returns correct action`, () => {
    expect(ActionCreators.changeCity(CityNames.PARIS)).toEqual({
      type: ActionTypes.CHANGE_CITY,
      payload: CityNames.PARIS
    });
  });

  it(`Action creator for selected option index sort returns correct action`, () => {
    expect(ActionCreators.setSortBySelectedOptionIndex(1)).toEqual({
      type: ActionTypes.SET_SORT_BY_SELECTED_OPTION_INDEX,
      payload: 1
    });
  });

  it(`Action creator for set the identifier of the offer that the cursor is over returns correct action`, () => {
    expect(ActionCreators.setHoverOfferId(11)).toEqual({
      type: ActionTypes.SET_HOVER_OFFER_ID,
      payload: 11
    });
  });

  it(`Action creator for set the offer identifier to null when the cursor leaves the offer returns correct action`, () => {
    expect(ActionCreators.resetHoverOfferId()).toEqual({
      type: ActionTypes.RESET_HOVER_OFFER_ID,
    });
  });
});
