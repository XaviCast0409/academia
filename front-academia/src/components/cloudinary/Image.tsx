import { memo } from 'react';
import EvidenceUploader from './EvidenceUploader';
import { Container, Typography } from '@mui/material';

interface ImageCloudinaryProps {
  setImageLinks: (urls: string[]) => void;
  resetUploader: number;
  maxFiles?: number;
  maxFileSize?: number;
  title?: string;
}

const ImageCloudinary = memo(({ 
  setImageLinks, 
  resetUploader,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024,
  title = 'Subir Imágenes'
}: ImageCloudinaryProps) => {
  return (
    <Container>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <EvidenceUploader
        onUploadComplete={(urls) => setImageLinks(urls)}
        resetUploader={resetUploader}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
      />
    </Container>
  );
});

ImageCloudinary.displayName = 'ImageCloudinary';

export default ImageCloudinary;