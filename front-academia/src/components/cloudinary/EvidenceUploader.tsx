// EvidenceUploader.tsx
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useEffect } from "react";

const Input = styled("input")({
  display: "none",
});

interface EvidenceUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  resetUploader: number;
}

const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({ onUploadComplete, resetUploader }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFiles(selectedFiles);
    setSelectedCount(selectedFiles.length);
    setIsUploaded(false);

    const previews = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(previews);
  };

  useEffect(() => {
  setFiles(null);
  setPreviewUrls([]);
  setSelectedCount(0);
  setIsUploading(false);
  setIsUploaded(false);
}, [resetUploader]);

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setIsUploaded(false);
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "evidencias_unsigned");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbfkciy1w/image/upload",
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setIsUploading(false);
    setIsUploaded(true);
    onUploadComplete(urls);
  };

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
        <Button variant="contained" component="span">
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
              <Grid item xs={6} sm={4} md={3} key={index} {...({} as any)}>
                <img
                  src={url}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    border: "2px solid #ccc",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default EvidenceUploader;
