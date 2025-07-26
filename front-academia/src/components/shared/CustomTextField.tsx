import {
  TextField,
  MenuItem
} from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';

interface CustomTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  select?: boolean;
  options?: { value: string | number; label: string }[];
  rules?: RegisterOptions<T, Path<T>>;
}

const CustomTextField = <T extends FieldValues>({
  name,
  control,
  label,
  select = false,
  options = [],
  rules,
  ...props
}: CustomTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          select={select}
          fullWidth
          label={label}
          variant="outlined"
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputLabelProps={{ style: { fontFamily: "'Press Start 2P', cursive" } }}
          inputProps={{ style: { fontFamily: "'Press Start 2P', cursive" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#84341C",
              },
              "&:hover fieldset": {
                borderColor: "#E07F3F",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#E07F3F",
              },
            },
            "& .MuiInputLabel-root": {
              fontFamily: "'Press Start 2P', cursive",
            },
            "& .MuiOutlinedInput-input": {
              fontFamily: "'Press Start 2P', cursive",
            },
            "& .MuiSelect-icon": {
              color: "#84341C",
            },
            "& .MuiFormHelperText-root": {
              fontFamily: "'Press Start 2P', cursive",
              fontSize: "0.6rem",
            },
            ...props.sx,
          }}
        >
          {select && options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default CustomTextField;
