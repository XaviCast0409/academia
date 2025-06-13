import EvidenceUploader from './EvidenceUploader';
import { Container } from '@mui/material';

interface ImageCloudinaryProps {
  setImageLinks: (urls: string[]) => void;
  resetUploader: number;
}

const ImageCloudinary = ({ setImageLinks, resetUploader }: ImageCloudinaryProps) => {
  return (
    <Container>
      <EvidenceUploader
        onUploadComplete={(urls) => setImageLinks(urls)}
        resetUploader={resetUploader}
      />
    </Container>
  );
};

export default ImageCloudinary;
