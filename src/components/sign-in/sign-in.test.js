import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import {SignIn} from './sign-in';

it(`SignIn is rendered correctly when the user is unauthorized`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <SignIn
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            onSubmit={() => {}}
          />
        </BrowserRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
