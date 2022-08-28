import React, { useEffect, useState } from 'react';
import { css } from 'glamor';
export interface InputProps {
    type?: string;
    label?: string;
    width?: string;
    maxWidth?: string;
    value?: string;
    validate?: (value: any) => boolean | string;
    placeholder?: string;
    onChange: (value: string) => any;
    disabled?: boolean;
}

const InputLabel = (props: InputProps) => {
    if (!props.label) {
        return null;
    }
    let labelStyles = css({
        marginBottom: '4px',
        display: 'inline-block',
        color: '#091e42',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '16px',
    });

    return <label {...labelStyles}>{props.label}</label>;
};

/**
 * This Function wil be used to Validation the Input Against the validation function provided.
 * @param value Current Input Value
 * @param validateFunction Validation Function, which will be called to validate the input value.
 * @returns If Error, an error message or an empty String in case of no error.
 */
function getValidationError(
    value: any,
    validateFunction?: (value: any) => boolean | string,
): string {
    if (!validateFunction) {
        return '';
    }

    let validationResult = validateFunction(value);

    if (validationResult === true) {
        return '';
    } else if (validationResult === false) {
        return 'Invalid Input';
    } else {
        return validationResult;
    }
}

const InputBox = (props: InputProps) => {
    const [isTouched, setTouched] = useState(false);
    const [shouldShowError, setShouldShowError] = useState(false);
    const [value, setValue] = useState(props.value);

    useEffect(() => {}, ['disabled']);

    // Input Box Styles
    let inputStyles = css({
        padding: '4px 10px',
        width: props.width || '100%',
        maxWidth: props.maxWidth,
        marginBottom: 0,
        border: '1px solid #ddd',
        boxSizing: 'border-box',
        minHeight: '42px',
    });

    // Validation Input Styles.
    let validationErrorStyles = css({
        fontSize: '12px',
        color: '#f34235',
    });

    // Input Box Props
    let inputProps: any = {
        type: props.type || 'text',
        value: props.value || '',
        placeholder: props.placeholder || '',
    };
    if (props.onChange) {
        inputProps.onChange = (e: any) => {
            setValue(e.target.value);
            props.onChange(e.target.value);
        };
        inputProps.onBlur = () => {
            setTouched(true);
            setShouldShowError(true);
        };
        inputProps.onFocus = () => {
            setShouldShowError(false);
        };
    }

    if (props.disabled === true) {
        inputProps.disabled = true;
    }

    return (
        <React.Fragment>
            <input {...inputStyles} {...inputProps}></input>
            <br />
            <label {...validationErrorStyles}>
                {isTouched && shouldShowError ? getValidationError(value, props.validate) : ''}
            </label>
        </React.Fragment>
    );
};

const Input = (props: InputProps) => {
    let containerStyles = css({
        marginBottom: '24px',
        width: props.width || '100%',
        maxWidth: props.maxWidth,
        minHeight: props.label ? '90px' : '80px',
    });

    return (
        <div {...containerStyles}>
            <InputLabel {...props}></InputLabel>
            <br />
            <InputBox {...props}></InputBox>
        </div>
    );
};
export default Input;
