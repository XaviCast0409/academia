import {
  TextField,
  MenuItem
} from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';

interface CustomTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  select?: boolean;
  options?: { value: string | number; label: string }[];
}

const CustomTextField = <T extends FieldValues>({
  name,
  control,
  label,
  select = false,
  options = [],
  ...props
}: CustomTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
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
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'rgb(224, 127, 63)',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiOutlinedInput-input': {
              color: 'white',
            },
            '& .MuiSelect-icon': {
              color: 'white',
            },
            '& .MuiFormHelperText-root': {
              color: 'rgba(255, 255, 255, 0.7)',
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
