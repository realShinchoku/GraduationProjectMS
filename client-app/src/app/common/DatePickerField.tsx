import React from "react";
import {Field, useField, useFormikContext} from "formik";
import {DatePicker} from "@mui/x-date-pickers";
import {DatePickerProps} from "@mui/x-date-pickers/DatePicker/DatePicker.types";
type Props<TDate> = {
    name: string;
} & Omit<DatePickerProps<TDate>, "onChange" | "value">;
export const DatePickerField = <TInputDate, TDate = TInputDate>(props: Props<TDate>) => {
    const { name, ...restProps } = props;
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();
    return (
        <DatePicker
            {...restProps}
            value={field.value ?? null}
            onChange={(val) => setFieldValue(name, val)}
        />
    );
};