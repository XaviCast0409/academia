export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

class CloudinaryService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbfkciy1w/image/upload';
  private uploadPreset = 'evidencias_unsigned';

  async uploadImage(imageUri: string): Promise<string> {
    try {
      console.log('CloudinaryService: Uploading image:', imageUri);

      // Crear FormData para la subida
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'evidence.jpg',
      } as any);
      formData.append('upload_preset', this.uploadPreset);
      
      // Optimización de imagen antes de subir
      formData.append('quality', 'auto');
      formData.append('fetch_format', 'auto');

      // Subir a Cloudinary
      const response = await fetch(this.cloudinaryUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.status}`);
      }

      const result: CloudinaryResponse = await response.json();
      console.log('CloudinaryService: Upload successful:', result.secure_url);

      return result.secure_url;
    } catch (error) {
      console.error('CloudinaryService: Upload error:', error);
      throw new Error('Error al subir la imagen a Cloudinary');
    }
  }

  async uploadMultipleImages(imageUris: string[]): Promise<string[]> {
    try {
      console.log('CloudinaryService: Uploading multiple images:', imageUris.length);

      const uploadPromises = imageUris.map(uri => this.uploadImage(uri));
      const uploadedUrls = await Promise.all(uploadPromises);

      console.log('CloudinaryService: All images uploaded successfully');
      return uploadedUrls;
    } catch (error) {
      console.error('CloudinaryService: Multiple upload error:', error);
      throw new Error('Error al subir las imágenes a Cloudinary');
    }
  }
}

const cloudinaryService = new CloudinaryService();
export default cloudinaryService; 