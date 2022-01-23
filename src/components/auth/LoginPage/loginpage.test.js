import { fireEvent, render } from '@testing-library/react';
import { LoginForm } from './LoginForm'
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import {screen} from '@testing-library/dom'

describe('loginpage', () => {
    test('should call loginform', () => {

        const email = 'beamg@hotmail.com'
        const password = '1234'
        const remember = false
        const onSubmit = jest.fn()

        const obj = render( 
                <LoginForm onSubmit={onSubmit}/>
        );
                
        const mailField = screen.getByAltText(/email/)
        const passwordField = screen.getByAltText(/password/)
        const rememberField = screen.getByAltText(/remember/)
        const submitButton = screen.getByRole('button');

    
    fireEvent.change(mailField, { target: { value: email } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.change(rememberField, { target: { value: remember } });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({ email, password, remember });


    })
    
})