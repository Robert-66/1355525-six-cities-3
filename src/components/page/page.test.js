import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import {Page} from './page';

const children = <div className="children-component" />;
const authorizedUser = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  email: ``,
};
const unauthorizedUser = {
  authorizationStatus: AuthorizationStatus.AUTH,
  email: `email@mail.ru`,
};

describe(`Page is rendered correctly`, () => {

  it(`when the user is authorized`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Page user={authorizedUser}>
              {children}
            </Page>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`when the user is unauthorized`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <Page user={unauthorizedUser}>
              {children}
            </Page>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
