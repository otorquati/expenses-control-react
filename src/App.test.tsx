import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe('Login', () => {
  // 1- Testa se o campo de email não está vazio
  test('given email, when empty, then show required error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');
    await userEvent.type(email, "anyValue");
    await userEvent.clear(email);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).not.toBeNull();

  })
  // 2- Testa se o campo de email foi preenchido
  test('given email, when has value, then show required error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');
    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();

  })
  
  // 3- Testa se o campo de email foi modificado
  test('given email, when field not changed, then hide required error message', async () => {
    render(<App />);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();

  })

   //4- Testa se o campo de email é inválido
   test('given email, when invalid, then show invalid error message', async () => {
    render(<App />);

    const email = screen.getByTestId('email');
    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).not.toBeNull();

  })
   //5- Testa se o campo de Senha não está vazio
   test('given password, when empty, then show required error message', async () => {
    render(<App />);

    const password = screen.getByTestId('password');
    await userEvent.type(password, "anyValue");
    await userEvent.clear(password);

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).not.toBeNull();

  })
     //6- Testa se o campo de Senha não está vazio
     test('given password, when not empty, then hide required error message', async () => {
      render(<App />);
  
      const password = screen.getByTestId('password');
      await userEvent.type(password, "anyValue");
  
      const requiredError = screen.queryByTestId('password-required');
      expect(requiredError).toBeNull();
  
    })
    //7- Testa se o Email digitado é invalido e desabilita o botão recuperar senha
    test('given email, when empty, then disable recover password button', () => {
      render (<App />);

      const recoverPasswordButton = screen.getByTestId('recover-password-button');

      expect(recoverPasswordButton).toBeDisabled();
    })

    //8- Testa se o Email digitado é válido e habilita o botão recuperar senha
    test('given email, when valid, then enable recover password button', () => {
      render (<App />);

      const email = screen.getByTestId('email');
      userEvent.type(email,"valid@email.com");

      const recoverPasswordButton = screen.getByTestId('recover-password-button');

      expect(recoverPasswordButton).not.toBeDisabled();
    })

    //9- Testa os dados do Formulário  são inválidos e habilita o botão Entrar
    test('given form invalid, then disable login button', () => {
    render (<App />);

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDisabled();
      })

    //10 - Testa os dados do Formulário são válidos e habilita o botão Entrar
    test('given form valid, then enable login button', () => {
      render (<App />);

      const email = screen.getByTestId('email');
      userEvent.type(email,"valid@email.com");
      const password = screen.getByTestId('password');
      userEvent.type(password, "anyValue");
      const loginButton = screen.getByTestId('login-button');

      expect(loginButton).not.toBeDisabled();
        })  
})
