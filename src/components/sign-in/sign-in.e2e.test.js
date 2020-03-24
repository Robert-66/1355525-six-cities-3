import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter, Route} from 'react-router-dom';
import {AuthorizationStatus} from '../../reducer/user/user';
import {SignIn} from './sign-in';

configure({
  adapter: new Adapter(),
});

describe(`SignIn`, () => {

  it(`Has to redirect`, () => {
    // eslint-disable-next-line react/prop-types
    const TestingRouter = ({ComponentWithRedirection, RedirectUrl}) => (
      <MemoryRouter>
        <Route path="/" exact render={() => <ComponentWithRedirection />} />
        <Route path={RedirectUrl} exact render={() => <div>{RedirectUrl}</div>} />
      </MemoryRouter>
    );
    const redirectUrl = `/main`;
    const tree = mount(
        <TestingRouter
          ComponentWithRedirection={() => <SignIn
            authorizationStatus={AuthorizationStatus.AUTH}
            redirectUrl={redirectUrl}
            onSubmit={() => {}}
          />}
          RedirectUrl={redirectUrl}
        />
    );

    expect(tree.text()).toEqual(redirectUrl);
  });

  it(`When user sign in form is not sent`, () => {
    const onSubmit = jest.fn();
    const tree = shallow(
        <SignIn
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          onSubmit={onSubmit}
        />
    );

    const form = tree.find(`form`);
    const formSendPrevention = jest.fn();
    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(formSendPrevention).toHaveBeenCalledTimes(1);
  });

  it(`When user sign in onSubmit gets the data in the correct format`, () => {
    const authData = {
      email: `email@mail.ru`,
      password: `password`,
    };
    const onSubmit = jest.fn();
    const tree = mount(
        <SignIn
          authorizationStatus={AuthorizationStatus.NO_AUTH}
          onSubmit={onSubmit}
        />
    );
    const form = tree.find(`form`);
    const inputEmail = tree.find(`input`).at(0);
    const inputPassword = tree.find(`input`).at(1);

    inputEmail.instance().value = authData.email;
    inputEmail.simulate(`change`);
    inputPassword.instance().value = authData.password;
    inputPassword.simulate(`change`);
    form.simulate(`submit`, {preventDefault() {}});

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual(authData);
  });
});
