import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import RegisterPage from '../register/RegisterPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


describe('Login', () => {

  let authService: authServiceMock;

  beforeEach(() => {
    authService = new authServiceMock();
  })
  
  // 1- Testa se o campo de email não está vazio
  test('given email, when empty, then show required error message', async () => {
    renderLoginPage();

    const email = screen.getByTestId('email');

    await userEvent.type(email, "anyValue");
    await userEvent.clear(email);

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).not.toBeNull();

  })

  // 2- Testa se o campo de email foi preenchido
  test('given email, when has value, then hide required error message', async () => {
    renderLoginPage();

    const email = screen.getByTestId('email');

    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })
  
  // 3- Testa se o campo de email foi modificado
  test('given email, when field not changed, then hide required error message', async () => {
    renderLoginPage();

    const requiredError = screen.queryByTestId('email-required');
    expect(requiredError).toBeNull();
  })

   //4- Testa se o campo de email é inválido
   test('given email, when invalid, then show invalid error message', async () => {
    renderLoginPage();

    const email = screen.getByTestId('email');
    
    await userEvent.type(email, "anyValue");

    const requiredError = screen.queryByTestId('email-invalid');
    expect(requiredError).not.toBeNull();
  })

     //5- Testa se o campo de email é inválido
     test('given email, when valid, then hide invalid error message', async () => {
      renderLoginPage();
  
      const email = screen.getByTestId('email');
      
      await userEvent.type(email, "valid@email.com");
  
      const requiredError = screen.queryByTestId('email-invalid');
      expect(requiredError).toBeNull();
    })

   //6- Testa se o campo de Senha não está vazio
   test('given password, when empty, then show required error message', async () => {
    renderLoginPage();

    const password = screen.getByTestId('password');

    await userEvent.type(password, "anyValue");
    await userEvent.clear(password);

    const requiredError = screen.queryByTestId('password-required');
    expect(requiredError).not.toBeNull();

  })
     //7- Testa se o campo de Senha não está vazio
     test('given password, when has value, then hide required error message', async () => {
      renderLoginPage();
  
      const password = screen.getByTestId('password');

      await userEvent.type(password, "anyValue");
  
      const requiredError = screen.queryByTestId('password-required');
      expect(requiredError).toBeNull();
  
    })
    
    //8- Testa se o Email digitado é invalido e desabilita o botão recuperar senha
    test('given email, when empty, then disable recover password button', () => {
      renderLoginPage();

      const recoverPasswordButton = screen.getByTestId('recover-password-button');

      expect(recoverPasswordButton).toBeDisabled();
    })

    //9- Testa se o Email digitado é válido e habilita o botão recuperar senha
    test('given email, when valid, then enable recover password button', () => {
      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,"valid@email.com");

      const recoverPasswordButton = screen.getByTestId('recover-password-button');

      expect(recoverPasswordButton).not.toBeDisabled();
    })

    //10- Testa os dados do Formulário  são inválidos e habilita o botão Entrar
    test('given form invalid, then disable login button', () => {
      renderLoginPage();

    const loginButton = screen.getByTestId('login-button');

    expect(loginButton).toBeDisabled();
      })

    //11 - Testa os dados do Formulário são válidos e habilita o botão Entrar
    test('given form valid, then enable login button', () => {
      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,"valid@email.com");
      const password = screen.getByTestId('password');
      userEvent.type(password, "anyValue");

      const loginButton = screen.getByTestId('login-button');

      expect(loginButton).not.toBeDisabled();
    }) 
     
    test('given user clicks on register button, then go to resgister page', async () => {
      renderLoginPage();
      
      const registerButton = screen.getByTestId('register-button');
      await userEvent.click(registerButton);

      expect(window.location.pathname).toEqual('/register');
    })

    describe('given user clicks on login button', () => {
      test('then call login', async () => {
        authService.response = Promise.resolve({} as any);
    

        renderPageAndTryToLogin();

        await waitFor( () => expect(authService.isLoggingIn).toBeTruthy());

      })

      test('then show Loading', async () => {
        authService.response = Promise.resolve({} as any);

        renderPageAndTryToLogin();

        expect(await screen.findByTestId('loading')).not.toBeNull();

      })


      test('when success, then hide loading', async () => {
        authService.response = Promise.resolve({} as any);

        renderPageAndTryToLogin();

        await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());

      })

      test('when success, then go to home page', async () => {
        authService.response = Promise.resolve({} as any);

        renderPageAndTryToLogin();

        await waitFor( () => expect(window.location.pathname).toEqual('/home'));

      })

      test('when fail, then show error message', async () => {
        authService.response = Promise.reject({message: "error"});
        renderPageAndTryToLogin();

        expect(await screen.findByTestId('error')).not.toBeNull();

      })

      test('when fail, then hide loading', async () => {
        authService.response = Promise.reject({message: "error"});
        renderPageAndTryToLogin();

        await waitFor( () => expect(screen.queryByTestId('loading')).toBeNull());

      })

      function renderPageAndTryToLogin() {
        renderLoginPage();
        fillFormatValidaValues();
        clickOnLoginButton();
      }
  })
  
  // Bateria de teste para Funcionalidade Recuperar Senha
  describe('given user clicks on recover password button', () => {
    test('then call recover password', () => {
      authService.response = new Promise(() => {});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      expect(authService.isRecoveringPassword).toBeTruthy();
    })
    test('then show loading', async () => {
      authService.response = new Promise(() => {});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      expect(await screen.findByTestId('loading')).not.toBeNull();
    })

    test('when success, the show success message', async () => {
      authService.response = Promise.resolve({});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      expect(await screen.findByTestId('recover-password-success-message'))
      .not.toBeNull();
    })
    test('when success, the hide loading', async () => {
      authService.response = Promise.resolve({});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      await waitFor(() => expect(screen.queryByTestId('loading'))
      .toBeNull());
    })

    test('when fail, the show error message', async () => {
      authService.response = Promise.reject({message: "error"});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      expect(await screen.findByTestId('error'))
      .not.toBeNull();
    })

    test('when fail, the hide loading', async () => {
      authService.response = Promise.reject({message: "error"});

      renderLoginPage();

      const email = screen.getByTestId('email');
      userEvent.type(email,'valid@email.com');
      const recoverPasswordButton = screen.getByTestId('recover-password-button');
      userEvent.click(recoverPasswordButton);

      await waitFor(() => expect(screen.queryByTestId('loading'))
      .toBeNull());
    })
  })

  test('given page starts, the hide recover password success message', () => {
    renderLoginPage();

    expect(screen.queryByTestId('recover-password-success-message')).toBeNull();
  })

    function fillFormatValidaValues() {
      const email = screen.getByTestId('email');
      userEvent.type(email,"valid@email.com");
      const password = screen.getByTestId('password');
      userEvent.type(password, "anyValue");
    }

    function clickOnLoginButton() {
      const loginButton = screen.getByTestId('login-button');
      userEvent.click(loginButton);
    }

    function renderLoginPage() {
      render(
        <BrowserRouter>
        <Routes location={'/'}>
          <Route path='/' 
            element={<LoginPage authService={authService as authServiceMock} />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
      );
    }

    // Elemento que  simula o código real que faz a chamada ao Firebase
    class authServiceMock {
      isLoggingIn = false;
      isRecoveringPassword = false;
      response: any;
      login() {
        this.isLoggingIn = true;
        return this.response;
      }
      recoverPassword(){
        this.isRecoveringPassword = true;
        return this.response;
      }
    }
})
