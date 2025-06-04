import React, { useState } from "react";
import {Button, Field, Fieldset, Input, NativeSelect, Stack, Alert, Box} from "@chakra-ui/react";

const FormLayout: React.FC = () => {
    type FieldName = "name" | "email" | "country";

    // data for the form
    const [formData, setFormData] = useState<Record<FieldName, string>>({
        name: "",
        email: "",
        country: ""
    });

    // errors for the form inputs
    const [errors, setErrors] = useState<Record<FieldName, string>>({
        name: "",
        email: "",
        country: ""
    });

    // Validate a single field
    const validateField = (name: string, value: string) => {
        if (name === "name") {
            if (!value) return "Name is required.";
            if (value.length < 3) return "Name must be at least 3 characters long.";
        }
        if (name === "email") {
            const validationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return "Email is required.";
            if (!validationRegex.test(value)) return "Email is invalid.";
            if (value.length < 5) return "Email must be at least 5 characters long.";
        }
        if (name === "country") {
            if (!value) return "Country is required.";
        }
        return "";
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {
            name: validateField("name", formData.name),
            email: validateField("email", formData.email),
            country: validateField("country", formData.country),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    // onChange handler for the input fields with validation
    const onInputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateForm()) {
            console.log("Form submitted successfully:", formData);
        } else {
            console.log("Form submission failed due to validation errors:", errors);
        }

        if (!validateForm()) {
            // scroll to the first error and focus on it
            const firstErrorField = (Object.keys(errors) as FieldName[]).find((key) => errors[key]);
            if (firstErrorField) {
                const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
                if (fieldElement) {
                    fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
                    (fieldElement as HTMLInputElement).focus();
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Fieldset.Root size="lg" maxW="md" invalid={Object.values(errors).some((error) => error)}>
                <Stack>
                    <Fieldset.Legend>Contact details</Fieldset.Legend>
                    <Fieldset.HelperText>
                        Please provide your contact details below.
                    </Fieldset.HelperText>
                </Stack>

                {/* General form error notification block with error status details */}
                {Object.values(errors).some((error) => error) && (
                    <Alert.Root status="error" mb={4}>
                        <Alert.Indicator />
                        <Alert.Content>
                            <Alert.Title>Form submission failed</Alert.Title>
                            <Alert.Description>
                                <Box>
                                    Please correct the errors below before submitting.
                                </Box>
                                <Box mt={2}>
                                    {Object.entries(errors).map(([field, error]) => (
                                        error ? <Box key={field}>{error}</Box> : null
                                    ))}
                                </Box>
                            </Alert.Description>
                        </Alert.Content>
                    </Alert.Root>
                )}

                <Fieldset.Content>
                    <Field.Root invalid={!!errors.name}>
                        <Field.Label>Name</Field.Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={onInputHandler}
                        />
                        <Fieldset.HelperText>
                            Please enter your full name.
                        </Fieldset.HelperText>
                        <Fieldset.ErrorText>
                            {errors.name}
                        </Fieldset.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.email}>
                        <Field.Label>Email address</Field.Label>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onInputHandler}
                        />
                        <Fieldset.HelperText>
                            Please enter a valid email address.
                        </Fieldset.HelperText>
                        <Fieldset.ErrorText>
                            {errors.email}
                        </Fieldset.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.country}>
                        <Field.Label>Country</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                name="country"
                                value={formData.country}
                                onChange={onInputHandler}
                            >
                                <option value="" disabled>
                                    Select your country
                                </option>
                                {["Ukraine", "United Kingdom", "Canada", "United States"].map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                        <Fieldset.HelperText>
                            Please select your country.
                        </Fieldset.HelperText>
                        <Fieldset.ErrorText>
                            {errors.country}
                        </Fieldset.ErrorText>
                    </Field.Root>
                </Fieldset.Content>

                <Button type="submit" alignSelf="flex-start">
                    Submit
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default FormLayout;