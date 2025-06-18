// EvidenceUploader.tsx
import { useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Chip,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { uploadMultipleToCloudinary } from "../../services/cloudinaryService";

const Input = styled("input")({
  display: "none",
});

interface EvidenceUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  resetUploader: number;
  maxFiles?: number;
  maxFileSize?: number; // en bytes
}

const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onUploadComplete,
  resetUploader,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB por defecto
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFiles = useCallback((selectedFiles: FileList): boolean => {
    if (selectedFiles.length > maxFiles) {
      setError(`Máximo ${maxFiles} imágenes permitidas`);
      return false;
    }

    for (const file of Array.from(selectedFiles)) {
      if (file.size > maxFileSize) {
        setError(`La imagen ${file.name} excede el tamaño máximo permitido`);
        return false;
      }
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten archivos de imagen');
        return false;
      }
    }
    return true;
  }, [maxFiles, maxFileSize]);

  const handleFileChange = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    setError(null);
    if (!validateFiles(selectedFiles)) return;

    setFiles(selectedFiles);
    setSelectedCount(selectedFiles.length);
    setIsUploaded(false);

    // Limpiar URLs anteriores para evitar memory leaks
    previewUrls.forEach(URL.revokeObjectURL);

    const previews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(previews);
  }, [validateFiles, previewUrls]);

  useEffect(() => {
    setFiles(null);
    setPreviewUrls([]);
    setSelectedCount(0);
    setIsUploading(false);
    setIsUploaded(false);
    setError(null);
  }, [resetUploader]);

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setIsUploaded(false);
    setError(null);

    try {
      const responses = await uploadMultipleToCloudinary(Array.from(files));
      const urls = responses.map(response => response.secure_url);
      setIsUploaded(true);
      onUploadComplete(urls);
    } catch (err) {
      setError('Error al subir las imágenes. Por favor, intente nuevamente.');
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  // Limpiar URLs de preview al desmontar
  useEffect(() => {
    return () => {
      previewUrls.forEach(URL.revokeObjectURL);
    };
  }, [previewUrls]);

  return (
    <Box>
      <label htmlFor="file-upload">
        <Input
          accept="image/*"
          id="file-upload"
          multiple
          type="file"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <Button 
          variant="contained" 
          component="span"
          disabled={isUploading}
        >
          Seleccionar Imágenes
        </Button>
      </label>

      {selectedCount > 0 && (
        <Box mt={2}>
          <Chip
            label={`${selectedCount} imagen${
              selectedCount > 1 ? "es" : ""
            } seleccionada${selectedCount > 1 ? "s" : ""}`}
            color="primary"
          />
        </Box>
      )}

      <Box mt={2}>
        <Button
          onClick={handleUpload}
          variant="outlined"
          disabled={isUploading || selectedCount === 0}
        >
          {isUploading ? <CircularProgress size={20} /> : "Subir Imágenes"}
        </Button>
      </Box>

      {isUploaded && previewUrls.length > 0 && (
        <Box mt={3}>
          <Typography variant="subtitle1" color="success.main">
            ✅ Imágenes enviadas
          </Typography>
        </Box>
      )}

      {previewUrls.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">Previsualización:</Typography>
          <Grid container spacing={2}>
            {previewUrls.map((url, index) => (
              <Grid key={index}>
                <img
                  src={url}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "2px solid #ccc",
                  }}
                  loading="lazy"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EvidenceUploader;
