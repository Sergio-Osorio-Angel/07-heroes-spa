import { useState } from "react";

export function useForm( initialForm = {} ) {

    const [formState, setformState] = useState(initialForm);

    function onInputChange({target}) {
        const {name, value} = target;
        setformState({
            ...formState,
            [name]:value
        })
    }

    function onResetForm() {
        setformState(initialForm);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
}
