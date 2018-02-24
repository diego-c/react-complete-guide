export default function validateInput(value, rules, field) {
    let validationArray = [];
    let requiredValidation = null;
    let minLengthValidation = null;
    let maxLengthValidation = null;
    let isEmailValidation = null;
    let isNumericValidation = null;

    if (rules) {
        if (rules.required) {                
            value.trim() !== '' ? 
            requiredValidation = {
                required: {
                    ok: true
                }
                
            } :
            requiredValidation = {
                required: {
                    ok: false
                }                    
            }

            validationArray.push((value.trim() !== ''))
        }

        if (rules.minLength) {
            value.length >= rules.minLength.value ?
            minLengthValidation = {
                minLength: {
                    ok: true
                }
            } :
            minLengthValidation = {
                minLength: {
                    ok: false
                }
            }

            validationArray.push((value.length >= rules.minLength.value));
        }

        if (rules.maxLength) {
            value.length <= rules.maxLength.value ?
            maxLengthValidation = {
                maxLength: {
                    ok: true
                }
            } :
            maxLengthValidation = {
                maxLength: {
                    ok: false
                }
            }

            validationArray.push((value.length <= rules.maxLength.value));
        }

        if (rules.isEmail) {

            const isValidEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            
            isValidEmail ?
            isEmailValidation = {
                isEmail: {
                    ok: true
                }
            } :
            isEmailValidation = {
                isEmail: {
                    ok: false
                }
            }

            validationArray.push(isValidEmail);
        }

        if (rules.isNumeric) {
            const isValidNumber = /^\d+$/.test(value);

            isValidNumber ?
            isNumericValidation = {
                isNumeric: {
                    ok: true
                }
            } :
            isNumericValidation = {
                isNumeric: {
                    ok: false
                }
            }

            validationArray.push(isValidNumber);
        }
    } else {
        validationArray.push(true);
    }

    return { valid: validationArray.every(entry => entry), validation: { ...requiredValidation, ...minLengthValidation, ...maxLengthValidation, ...isEmailValidation, ...isNumericValidation } }
}