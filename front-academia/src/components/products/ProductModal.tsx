import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import type { Product } from '../../types/products';
import parseJwt from '../../utils/parseJwt';
interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
    productToEdit?: Product;
}

export const ProductModal = ({ open, onClose, onSave, productToEdit }: Props) => {
    const token = localStorage.getItem("auth-storage");
    const user = parseJwt(token || "");
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
            professorId: user.id,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            <DialogContent>
                <TextField fullWidth margin="dense" label="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField fullWidth margin="dense" label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextField fullWidth margin="dense" label="Precio" value={price} type="number" onChange={(e) => setPrice(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#E07F3F' }}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};