type ValidationErrorProps = {
    errorMessage: string;
    hasChanged: boolean;
    type: 'required' | 'email';
    value: string;
    testId: string;
}
export default function ValidationError(props: ValidationErrorProps) {
    if (!props.hasChanged) {
        return null;
    } 
    
    return (
        props.type === 'required' && props.value === '' ?
        <div data-testeid={props.testId}>Erro!</div>
        : null
    )
}