import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import type { Product } from '../../types/products';
import { getCurrentUser } from '../../utils/common';
interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
    productToEdit?: Product;
}

export const ProductModal = ({ open, onClose, onSave, productToEdit }: Props) => {
    const user = getCurrentUser();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
  
    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price.toString());
        } else {
            setName('');
            setDescription('');
            setPrice('');
        }
    }, [productToEdit]);

    const handleSubmit = () => {
        onSave({
            name,
            description,
            price: parseFloat(price),
            professorId: user?.id || 0,
        });
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth
            PaperProps={{
                sx: {
                    fontFamily: "'Press Start 2P', cursive",
                    border: '3px solid #E07F3F',
                    borderRadius: '8px'
                }
            }}
        >
            <DialogTitle sx={{ 
                bgcolor: '#0D3745', 
                color: '#FFCC00',
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.9rem',
                textAlign: 'center'
            }}>
                {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#f5f5f5', py: 3 }}>
                <TextField 
                    fullWidth 
                    margin="dense" 
                    label="Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#E07F3F',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#E07F3F',
                        },
                    }}
                />
                <TextField 
                    fullWidth 
                    margin="dense" 
                    label="Descripción" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={3}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#E07F3F',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#E07F3F',
                        },
                    }}
                />
                <TextField 
                    fullWidth 
                    margin="dense" 
                    label="Precio" 
                    value={price} 
                    type="number" 
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: '#E07F3F',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#E07F3F',
                        },
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#f5f5f5', px: 3, pb: 3 }}>
                <Button 
                    onClick={onClose}
                    sx={{ 
                        color: '#84341C',
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: '0.7rem'
                    }}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{ 
                        bgcolor: '#E07F3F', 
                        fontFamily: "'Press Start 2P', cursive",
                        fontSize: '0.7rem',
                        '&:hover': {
                            bgcolor: '#84341C'
                        }
                    }}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};