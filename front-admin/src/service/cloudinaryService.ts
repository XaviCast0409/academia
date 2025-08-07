import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dbfkciy1w/image/upload';
const UPLOAD_PRESET = 'evidencias_unsigned';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

export const uploadToCloudinary = async (file: File): Promise<CloudinaryResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  
  // Optimización de imagen antes de subir
  formData.append('quality', 'auto');
  formData.append('fetch_format', 'auto');
  
  const response = await axios.post<CloudinaryResponse>(CLOUDINARY_URL, formData);
  return response.data;
};

export const uploadMultipleToCloudinary = async (files: File[]): Promise<CloudinaryResponse[]> => {
  const uploadPromises = files.map(file => uploadToCloudinary(file));
  return Promise.all(uploadPromises);
};
