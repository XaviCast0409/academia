# Activities Components

This directory contains the components for managing activities in the admin interface.

## Components

### ActivitiesView
Main view component that displays the list of activities with statistics and management options.

### ActivitiesTable
Table component for displaying activities in a structured format with action buttons.

### CreateActivityModal
Modal component for creating new activities with the following features:

#### Features
- **Form Fields**: Title, description, xavicoints, difficulty, section, and math topic
- **Image Upload**: Multiple image upload with Cloudinary integration
- **Validation**: Form validation for required fields
- **Star Wars Theme**: Consistent with the application's dark UI theme
- **Responsive Design**: Works on different screen sizes

#### Image Upload Flow
1. User selects multiple images using the file picker
2. Selected files are displayed as chips with delete options
3. User clicks "Subir Imágenes" to upload to Cloudinary
4. Uploaded images are displayed as green chips
5. Images can be removed before or after upload
6. Image URLs are stored and sent with the activity creation

#### Usage
```tsx
import { CreateActivityModal } from './CreateActivityModal'

<CreateActivityModal
  open={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onSuccess={handleSuccess}
  professorId={1} // TODO: Get from auth context
/>
```

## Dependencies

### Cloudinary Service
Located at `src/service/cloudinaryService.ts`

- Handles image upload to Cloudinary
- Supports single and multiple file uploads
- Optimizes images before upload (auto quality and format)
- Returns secure URLs for uploaded images

### Activity Service
Located at `src/service/activityService.ts`

- Handles CRUD operations for activities
- Integrates with the backend API
- Supports pagination and filtering

## Backend Integration

The modal sends the following data structure to the backend:

```typescript
{
  title: string;
  description: string;
  xavicoints: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  section: string;
  mathTopic: string;
  images: string[]; // Array of Cloudinary URLs
  professorId: number;
}
```

## Theme Integration

The modal follows the Star Wars dark theme with:
- Glass morphism effects
- Gradient buttons
- Consistent color scheme
- Hover animations
- Responsive design

## Future Improvements

1. **Authentication Integration**: Get professorId from auth context
2. **Image Preview**: Show thumbnails of uploaded images
3. **Drag & Drop**: Add drag and drop for image upload
4. **Image Optimization**: Client-side image compression
5. **Progress Tracking**: Show upload progress for large files
