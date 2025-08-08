import React, { useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material'
import { colors } from '../../styles/theme/colors'
import type { Product, ProductFormData } from '../../types/ProductTypes'
import { productService } from '../../service/productService'

interface Props {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  editing: Product | null
}

export const ProductFormModal: React.FC<Props> = ({ open, onClose, onSuccess, editing }) => {
  const [form, setForm] = useState<ProductFormData>({ name: '', description: '', price: 0 })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (editing) {
      setForm({ name: editing.name, description: editing.description, price: editing.price })
    } else {
      setForm({ name: '', description: '', price: 0 })
    }
  }, [editing])

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'price' ? Number(value) : value
    }))
  }

  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      if (editing) {
        await productService.update(editing.id, form)
      } else {
        await productService.create(form)
      }
      onSuccess()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          background: colors.background.primary,
          color: colors.text.primary,
          border: `1px solid ${colors.border.primary}`,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
          borderRadius: 2
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colors.border.primary}`,
          pb: 2,
          color: colors.text.primary,
          fontWeight: 600,
          fontSize: '1.25rem'
        }}
      >
        {editing ? 'Editar producto' : 'Nuevo producto'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'grid', gap: 2, py: 1 }}>
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: colors.text.secondary },
              '& .MuiOutlinedInput-root': {
                color: colors.text.primary,
                background: colors.background.secondary,
                '& fieldset': { borderColor: colors.border.primary },
                '&:hover fieldset': { borderColor: colors.border.secondary },
                '&.Mui-focused fieldset': { borderColor: colors.primary.main }
              }
            }}
          />
          <TextField
            label="Descripción"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            multiline
            minRows={3}
            sx={{
              '& .MuiInputLabel-root': { color: colors.text.secondary },
              '& .MuiOutlinedInput-root': {
                color: colors.text.primary,
                background: colors.background.secondary,
                '& fieldset': { borderColor: colors.border.primary },
                '&:hover fieldset': { borderColor: colors.border.secondary },
                '&.Mui-focused fieldset': { borderColor: colors.primary.main }
              }
            }}
          />
          <TextField
            label="XaviCoins"
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            fullWidth
            sx={{
              '& .MuiInputLabel-root': { color: colors.text.secondary },
              '& .MuiOutlinedInput-root': {
                color: colors.text.primary,
                background: colors.background.secondary,
                '& fieldset': { borderColor: colors.border.primary },
                '&:hover fieldset': { borderColor: colors.border.secondary },
                '&.Mui-focused fieldset': { borderColor: colors.primary.main }
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: `1px solid ${colors.border.primary}`, p: 2 }}>
        <Button onClick={onClose} disabled={submitting} sx={{ color: colors.text.secondary }}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
          sx={{
            bgcolor: colors.primary.main,
            color: colors.primary.contrastText,
            '&:hover': { bgcolor: colors.primary.light }
          }}
        >
          {editing ? 'Guardar cambios' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}


