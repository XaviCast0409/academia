import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'mui-image';
import type { Product } from '../../types/products';

interface Props {
    product: Product;
    mode: 'edit' | 'buy';
    onEdit?: () => void;
    onDelete?: () => void;
    onBuy?: () => void;
}

export const ProductUserCard = ({ product, onBuy }: Props) => {
    return (
        <Card sx={{ width: '200px', bgcolor: 'white', border: '2px solid #0D3745', borderRadius: 3 }}>
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/500px-Pokebola-pokeball-png-0.png"
                height="150px"
                duration={0}
                fit="contain"
                style={{ backgroundColor: '#F5F5F5' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, color: '#E07F3F' }}>xaviCoins {product.price}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    variant="contained"
                    sx={{ bgcolor: '#E07F3F', m: 1 }}
                    onClick={onBuy}
                >
                    Comprar
                </Button>

            </CardActions>
        </Card>
    );
};
