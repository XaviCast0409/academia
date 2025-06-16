import {
  TextField,
  MenuItem
} from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { Controller } from 'react-hook-form';
import type { Control, FieldError } from 'react-hook-form';

interface CustomTextFieldProps
  extends Omit<TextFieldProps, 'name' | 'select' | 'defaultValue' | 'error'> {
  name: string;
  control: Control<any>;
  fieldError?: FieldError;
  select?: boolean;
  options?: { label: string; value: any }[];
  helperText?: string;
  error?: boolean;
}

export const CustomTextField = ({
  name,
  control,
  fieldError,
  select = false,
  options = [],
  helperText,
  ...props
}: CustomTextFieldProps) => (
  <Controller
    name={name}
    control={control}
    defaultValue={select ? '' : ''}
    render={({ field }) => (
      <TextField
        {...field}
        {...props}
        select={select}
        fullWidth
        margin="normal"
        error={!!fieldError}
        helperText={fieldError?.message || helperText}
        slotProps={{
          input: {
            style: {
              fontFamily: "'Press Start 2P'",
              fontSize: '0.6rem'
            }
          },
          inputLabel: {
            style: {
              fontFamily: "'Press Start 2P'",
              fontSize: '0.6rem'
            }
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            '& fieldset': { borderColor: '#84341C' },
            '&:hover fieldset': { borderColor: '#E07F3F' },
          },
        }}
      >
        {select &&
          options.map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </TextField>
    )}
  />
);
