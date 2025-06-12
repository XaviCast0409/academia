import EvidenceUploader from './EvidenceUploader';
import { Container } from '@mui/material';

interface ImageCloudinaryProps {
  setImageLinks: (urls: string[]) => void;
}

const ImageCloudinary = ({ setImageLinks }: ImageCloudinaryProps) => {

  return (
    <Container>
      <EvidenceUploader
        onUploadComplete={(urls) => {
          setImageLinks(urls);
          // Aquí puedes enviarlas a tu backend
          console.log('Links listos para enviar al backend:', urls);
        }}
      />
    </Container>
  );
};

export default ImageCloudinary;
