import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Stack,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import type { Product } from '../../types/products';

interface Props {
	open: boolean;
	onClose: () => void;
	onSave: (productData: Omit<Product, 'id'>) => Promise<void>;
	productToEdit?: Product;
}

export const ProductUserModal = ({ open, onClose, onSave, productToEdit }: Props) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<Omit<Product, 'id' | 'professorId'>>();

	useEffect(() => {
		if (productToEdit) {
			reset({
				name: productToEdit.name,
				description: productToEdit.description,
				price: productToEdit.price,
			});
		} else {
			reset({ name: '', description: '', price: 0 });
		}
	}, [productToEdit, reset]);

	const onSubmit = (data: any) => {
		onSave(data);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
			<DialogTitle>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Stack spacing={2}>
						<Controller
							name="name"
							control={control}
							rules={{ required: 'El nombre es obligatorio' }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Nombre del Producto"
									error={!!errors.name}
									helperText={errors.name?.message}
									fullWidth
								/>
							)}
						/>

						<Controller
							name="description"
							control={control}
							rules={{ required: 'La descripción es obligatoria' }}
							render={({ field }) => (
								<TextField
									{...field}
									label="Descripción"
									error={!!errors.description}
									helperText={errors.description?.message}
									multiline
									rows={3}
									fullWidth
								/>
							)}
						/>

						<Controller
							name="price"
							control={control}
							rules={{
								required: 'El precio es obligatorio',
								min: { value: 1, message: 'El precio debe ser mayor a 0' },
							}}
							render={({ field }) => (
								<TextField
									{...field}
									label="Precio (S/.)"
									type="number"
									error={!!errors.price}
									helperText={errors.price?.message}
									fullWidth
								/>
							)}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					<Button type="submit" variant="contained" sx={{ bgcolor: '#0D3745' }}>
						{productToEdit ? 'Actualizar' : 'Crear'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
