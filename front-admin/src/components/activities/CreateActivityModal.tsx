import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { uploadMultipleToCloudinary } from '../../service/cloudinaryService';
import { activityService } from '../../service/activityService';
import { colors } from '../../styles/theme/colors';
import { authService } from '../../service/authService';

interface CreateActivityModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  xavicoints: number;
  difficulty: string;
  section: string;
  mathTopic: string;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  xavicoints: 0,
  difficulty: 'beginner',
  section: '',
  mathTopic: ''
};

export const CreateActivityModal: React.FC<CreateActivityModalProps> = ({
  open,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'xavicoints' ? Number(value) : value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) return;

    try {
      setIsUploading(true);
      setError(null);
      
      const uploadResults = await uploadMultipleToCloudinary(selectedFiles);
      const imageUrls = uploadResults.map(result => result.secure_url);
      
      setUploadedImages(prev => [...prev, ...imageUrls]);
      setSelectedFiles([]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Error al subir las imágenes. Por favor, inténtalo de nuevo.');
      console.error('Error uploading images:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      setError('Por favor, completa todos los campos requeridos.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

                   const professorId = authService.getUserId();
      if (!professorId) {
        setError('Error: No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
        return;
      }

      const activityData = {
        ...formData,
        images: uploadedImages || [],
        professorId
      };

      await activityService.createActivity(activityData);
      
      // Reset form
      setFormData(initialFormData);
      setSelectedFiles([]);
      setUploadedImages([]);
      
      onSuccess();
      onClose();
    } catch (err) {
      setError('Error al crear la actividad. Por favor, inténtalo de nuevo.');
      console.error('Error creating activity:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isUploading) {
      setFormData(initialFormData);
      setSelectedFiles([]);
      setUploadedImages([]);
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(40, 40, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border.primary}`,
          borderRadius: 3,
          color: colors.text.primary
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${colors.border.primary}`,
          pb: 2,
          color: colors.text.primary,
          fontWeight: 600,
          fontSize: '1.5rem',
          margin: 2
        }}
      >
        Crear Nueva Actividad
        <IconButton
          onClick={handleClose}
          disabled={isSubmitting || isUploading}
          sx={{ color: colors.text.secondary }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, background: 'rgba(244, 67, 54, 0.1)' }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Basic Information */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              fullWidth
              label="Título"
              value={formData.title}
              onChange={handleInputChange('title')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: colors.border.primary },
                  '&:hover fieldset': { borderColor: colors.border.secondary },
                  '&.Mui-focused fieldset': { borderColor: colors.primary.main }
                },
                '& .MuiInputLabel-root': { color: colors.text.secondary },
                '& .MuiInputBase-input': { color: colors.text.primary }
              }}
            />

            <TextField
              fullWidth
              label="Xavicoints"
              value={formData.xavicoints}
              onChange={handleInputChange('xavicoints')}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: colors.border.primary },
                  '&:hover fieldset': { borderColor: colors.border.secondary },
                  '&.Mui-focused fieldset': { borderColor: colors.primary.main }
                },
                '& .MuiInputLabel-root': { color: colors.text.secondary },
                '& .MuiInputBase-input': { color: colors.text.primary }
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: colors.text.secondary }}>Dificultad</InputLabel>
              <Select
                value={formData.difficulty}
                onChange={(event) => {
                  const value = event.target.value;
                  setFormData(prev => ({
                    ...prev,
                    difficulty: value
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border.primary },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.border.secondary },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary.main },
                  '& .MuiSelect-icon': { color: colors.text.secondary },
                  '& .MuiSelect-select': { color: colors.text.primary }
                }}
              >
                <MenuItem value="beginner">Principiante</MenuItem>
                <MenuItem value="intermediate">Intermedio</MenuItem>
                <MenuItem value="advanced">Avanzado</MenuItem>
                <MenuItem value="expert">Experto</MenuItem>
              </Select>
            </FormControl>

                         <FormControl fullWidth>
               <InputLabel sx={{ color: colors.text.secondary }}>Sección</InputLabel>
               <Select
                 value={formData.section}
                 onChange={(event) => {
                   const value = event.target.value;
                   setFormData(prev => ({
                     ...prev,
                     section: value
                   }));
                 }}
                 sx={{
                   '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border.primary },
                   '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: colors.border.secondary },
                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primary.main },
                   '& .MuiSelect-icon': { color: colors.text.secondary },
                   '& .MuiSelect-select': { color: colors.text.primary }
                 }}
               >
                 <MenuItem value="Primaria">Primaria</MenuItem>
                 <MenuItem value="1ro Sec">1ro Sec</MenuItem>
                 <MenuItem value="2do Sec">2do Sec</MenuItem>
                 <MenuItem value="3ro Sec">3ro Sec</MenuItem>
                 <MenuItem value="4to Sec">4to Sec</MenuItem>
                 <MenuItem value="5to Sec">5to Sec</MenuItem>
               </Select>
             </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Tema Matemático"
            value={formData.mathTopic}
            onChange={handleInputChange('mathTopic')}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.border.primary },
                '&:hover fieldset': { borderColor: colors.border.secondary },
                '&.Mui-focused fieldset': { borderColor: colors.primary.main }
              },
              '& .MuiInputLabel-root': { color: colors.text.secondary },
              '& .MuiInputBase-input': { color: colors.text.primary }
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descripción"
            value={formData.description}
            onChange={handleInputChange('description')}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.border.primary },
                '&:hover fieldset': { borderColor: colors.border.secondary },
                '&.Mui-focused fieldset': { borderColor: colors.primary.main }
              },
              '& .MuiInputLabel-root': { color: colors.text.secondary },
              '& .MuiInputBase-input': { color: colors.text.primary }
            }}
          />

          {/* Image Upload Section */}
          <Box>
            <Typography variant="h6" sx={{ color: colors.text.primary, mb: 2 }}>
              Imágenes de la Actividad
            </Typography>

            {/* File Selection */}
            <Paper
              sx={{
                background: 'rgba(30, 30, 30, 0.8)',
                border: `2px dashed ${colors.border.primary}`,
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                mb: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: colors.border.secondary,
                  background: 'rgba(40, 40, 40, 0.8)'
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                sx={{
                  borderColor: colors.border.primary,
                  color: colors.text.primary,
                  '&:hover': {
                    borderColor: colors.border.secondary,
                    background: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Seleccionar Imágenes
              </Button>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mt: 1 }}>
                Selecciona una o más imágenes para la actividad
              </Typography>
            </Paper>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1 }}>
                  Archivos seleccionados:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedFiles.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => handleRemoveFile(index)}
                      deleteIcon={<DeleteIcon />}
                      sx={{
                        background: 'rgba(66, 133, 244, 0.2)',
                        color: colors.text.primary,
                        '& .MuiChip-deleteIcon': { color: colors.error.main }
                      }}
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  onClick={handleUploadImages}
                  disabled={isUploading}
                  startIcon={isUploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3367D6 0%, #2E7D32 100%)'
                    }
                  }}
                >
                  {isUploading ? 'Subiendo...' : 'Subir Imágenes'}
                </Button>
              </Box>
            )}

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ color: colors.text.primary, mb: 1 }}>
                  Imágenes subidas:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {uploadedImages.map((_imageUrl, index) => (
                    <Chip
                      key={index}
                      label={`Imagen ${index + 1}`}
                      onDelete={() => handleRemoveUploadedImage(index)}
                      deleteIcon={<DeleteIcon />}
                      sx={{
                        background: 'rgba(76, 175, 80, 0.2)',
                        color: colors.text.primary,
                        '& .MuiChip-deleteIcon': { color: colors.error.main }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: `1px solid ${colors.border.primary}`,
          p: 3,
          gap: 2
        }}
      >
        <Button
          onClick={handleClose}
          disabled={isSubmitting || isUploading}
          sx={{
            color: colors.text.secondary,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)'
            }
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting || isUploading || !formData.title || !formData.description}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : <AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #3367D6 0%, #2E7D32 100%)'
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: colors.text.secondary
            }
          }}
        >
          {isSubmitting ? 'Creando...' : 'Crear Actividad'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
