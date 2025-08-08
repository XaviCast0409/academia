import React, { useEffect, useMemo, useState } from 'react'
import { Box, Typography, IconButton, Tooltip, Grid, Card, CardContent, CardActions, Button } from '@mui/material'
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import { colors } from '../../styles/theme/colors'
import { productService } from '../../service/productService'
import type { Product, ProductsResponse } from '../../types/ProductTypes'
import { ProductFormModal } from './ProductFormModal'

export const ProductsView: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [page, _setPage] = useState(1)
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await productService.getAll(page, true)
      setData(res)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const products = useMemo(() => data?.products ?? [], [data])

  const handleCreate = () => {
    setEditing(null)
    setIsFormOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditing(product)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar producto?')) return
    await productService.remove(id)
    fetchProducts()
  }

  const handleFormClose = () => setIsFormOpen(false)

  const handleFormSuccess = () => {
    setIsFormOpen(false)
    fetchProducts()
  }

  return (
    <Box sx={{ p: 3, width: '80vw' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600 }}>Productos</Typography>
        <Box>
          <Tooltip title="Refrescar">
            <span>
              <IconButton onClick={fetchProducts} disabled={loading} sx={{ color: colors.text.secondary }}>
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Nuevo producto">
            <IconButton onClick={handleCreate} sx={{ color: colors.primary.main }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id}>
            <Card sx={{ background: colors.background.secondary, border: `1px solid ${colors.border.primary}` }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600 }}>{p.name}</Typography>
                <Typography variant="body2" sx={{ color: colors.text.secondary, mt: 1 }} noWrap>{p.description}</Typography>
                <Typography variant="subtitle1" sx={{ color: colors.primary.light, mt: 1 }}>XaviCoins: {p.price}</Typography>
                {p.professor?.name && (
                  <Typography variant="caption" sx={{ color: colors.text.muted }}>Profesor: {p.professor.name}</Typography>
                )}
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" onClick={() => handleEdit(p)} sx={{ color: colors.text.secondary }}>Editar</Button>
                <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Eliminar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ProductFormModal
        open={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editing={editing}
      />
    </Box>
  )
}


