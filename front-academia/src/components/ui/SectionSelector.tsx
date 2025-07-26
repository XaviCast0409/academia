import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SECTIONS } from '../../utils/common';

interface SectionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  fullWidth?: boolean;
}

export const SectionSelector = ({
  value,
  onChange,
  label = 'Filtrar por sección',
  fullWidth = false,
}: SectionSelectorProps) => {
  return (
    <FormControl sx={{ minWidth: 250 }} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {SECTIONS.map((section) => (
          <MenuItem key={section.value} value={section.value}>
            {section.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
