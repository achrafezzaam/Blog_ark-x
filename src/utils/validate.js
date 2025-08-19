const validate = (schema, data) => {
    const errors = {};
    let isValid = true;

    for (const key in schema) {
        const rule = schema[key];
        const value = data[key];

        // Required field check
        if (rule.required && (value === undefined || value === null || value === '')) {
            errors[key] = `${key} is required.`;
            isValid = false;
            continue;
        }

        // Skip validation for non-required, empty fields
        if (value === undefined || value === null) {
            continue;
        }

        // Array validation
        if (rule.isArray) {
            if (!Array.isArray(value)) {
                errors[key] = `${key} must be an array.`;
                isValid = false;
                continue; // Skip further checks for this key
            }
            if (rule.maxItems && value.length > rule.maxItems) {
                errors[key] = `${key} must not have more than ${rule.maxItems} items.`;
                isValid = false;
            }
            // **FIX:** Check the type of each element within the array
            if (rule.type) {
                for (const item of value) {
                    if (typeof item !== rule.type) {
                        errors[key] = `All items in ${key} must be of type ${rule.type}.`;
                        isValid = false;
                        break; // Exit the loop on first invalid item
                    }
                }
            }
            continue; // Move to the next key after array validation
        }

        // Primitive type validation (for non-arrays)
        if (rule.type && typeof value !== rule.type) {
            errors[key] = `${key} must be a ${rule.type}.`;
            isValid = false;
        }
        if (rule.minLength && value.length < rule.minLength) {
            errors[key] = `${key} must be at least ${rule.minLength} characters long.`;
            isValid = false;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
            errors[key] = `${key} must be at most ${rule.maxLength} characters long.`;
            isValid = false;
        }
    }

    return {
        value: isValid ? data : undefined,
        error: isValid ? null : { statusCode: 400, message: 'Validation failed', details: errors }
    };
};

const postCreateSchema = {
    title: { required: true, type: 'string', minLength: 3, maxLength: 120 },
    content: { required: true, type: 'string', minLength: 10, maxLength: 10000 },
    author: { required: true, type: 'string', minLength: 2, maxLength: 60 },
    tags: { isArray: true, type: 'string', maxItems: 20 } // The type 'string' now applies to elements
};

const postUpdateSchema = {
    title: { type: 'string', minLength: 3, maxLength: 120 },
    content: { type: 'string', minLength: 10, maxLength: 10000 },
    author: { type: 'string', minLength: 2, maxLength: 60 },
    tags: { isArray: true, type: 'string', maxItems: 20 }
};

const validatePostCreate = (body) => validate(postCreateSchema, body);
const validatePostUpdate = (body) => validate(postUpdateSchema, body);


module.exports = { validatePostCreate, validatePostUpdate };
