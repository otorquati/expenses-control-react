import { isEmailValid } from "../../helpers/EmailHelper";
import './ValidationError.css';

type ValidationErrorProps = {
    errorMessage: string;
    hasChanged: boolean;
    type: 'required' | 'email';
    value: string;
    testId: string;
}

export default function ValidationError(props: ValidationErrorProps) {

    const error = <div data-testid={props.testId} className='error'>{props.errorMessage}</div>
    if (!props.hasChanged) {
        return null;
    } 
    
    if (props.type === 'required') {
        return (
            props.value === '' ?
            error
            : null
        )
    }
    
    return(
        !isEmailValid(props.value) ?
        error
            : null
    )
}