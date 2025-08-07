# User Creation Feature

## Overview

This feature provides a modularized user creation page for the Xavi Play application. It allows administrators to create new users with proper validation, role selection, and Pokémon assignment.

## Backend Analysis

### Database Structure
- **User Model**: Contains fields for name, email, password, roleId, pokemonId, section, and various game-related fields
- **Role Model**: Defines user roles (e.g., student, professor)
- **Pokemon Model**: Stores Pokémon data with images and high-resolution artwork
- **Relationships**: User belongs to Role and Pokemon, with various other associations

### API Endpoints
- `POST /users` - Create new user
- `GET /roles` - Get all available roles
- `GET /pokemons?page=X` - Get paginated Pokémon list
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Validation
- Email format validation
- Password minimum length (6 characters)
- Required fields validation
- Unique email constraint
- Role and Pokémon selection required

## Frontend Implementation

### Components

#### CreateUserPage.tsx
Main component for user creation with the following features:

- **Form Fields**:
  - Name (required)
  - Email (required, validated)
  - Password (required, min 6 chars)
  - Confirm Password (required, must match)
  - Section (required)
  - Role selection (dropdown)
  - Pokémon selection (grid with pagination)

- **Validation**:
  - Real-time error clearing
  - Comprehensive form validation
  - Password confirmation matching
  - Email format validation

- **UI Features**:
  - Loading states
  - Error handling with alerts
  - Responsive design
  - Pokémon image display
  - Pagination for Pokémon selection
  - Back button navigation
  - Admin information message

#### Styles (createUser.styles.ts)
Comprehensive styling that matches the app's design system:

- Consistent color scheme (blue/yellow theme)
- Proper spacing and typography
- Error state styling
- Interactive elements (buttons, selectors)
- Responsive grid layouts

### Services

#### userService.ts
Centralized service for user-related API calls:

- `createUser()` - Create new user
- `getRoles()` - Fetch available roles
- `getPokemons()` - Fetch paginated Pokémon list
- `getUserById()` - Get user details
- `updateUser()` - Update user information
- `deleteUser()` - Delete user

### Navigation Integration

- Added to `RootStackParamList` as `CreateUser` route
- Integrated into `AppNavigator.tsx` (available for both authenticated and non-authenticated users)
- Accessible from LoginPage via "Crear nuevo usuario" link
- Accessible from ProfilePage via "Crear Usuario" button
- Added back button functionality to return to previous screen

## Usage

### For Administrators

1. **Navigate to Create User**:
   - **From Login Page**: Tap "Crear nuevo usuario" link at the bottom of the login form
   - **From Profile Page**: Tap "Crear Usuario" button in Quick Actions

2. **Fill the Form**:
   - Enter user's full name
   - Provide valid email address
   - Set secure password (min 6 characters)
   - Confirm password
   - Select user's section (A, B, C, etc.)
   - Choose appropriate role from dropdown
   - Select Pokémon avatar from grid

3. **Submit**:
   - Form validates all fields
   - Shows loading state during creation
   - Displays success/error messages
   - Returns to previous screen on success

### Form Validation Rules

- **Name**: Required, trimmed
- **Email**: Required, valid format, converted to lowercase
- **Password**: Required, minimum 6 characters
- **Confirm Password**: Must match password exactly
- **Section**: Required, trimmed
- **Role**: Must be selected from dropdown
- **Pokémon**: Must be selected from grid

### Error Handling

- **Network Errors**: Displayed as alerts with specific messages
- **Validation Errors**: Shown inline below each field
- **Backend Errors**: Parsed from API response
- **Loading States**: Visual feedback during operations

## Technical Features

### Modularity
- Separate service layer for API calls
- Reusable components and styles
- Type-safe interfaces
- Clean separation of concerns

### Performance
- Paginated Pokémon loading
- Efficient state management
- Optimized re-renders
- Memory-conscious image handling

### Security
- Password confirmation
- Input sanitization
- Secure API communication
- Error message sanitization

### User Experience
- Intuitive form layout
- Clear error messages
- Loading indicators
- Success feedback
- Easy navigation

## File Structure

```
xavi-play/
├── src/
│   ├── pages/
│   │   └── CreateUserPage.tsx          # Main component
│   ├── services/
│   │   └── userService.ts              # API service
│   ├── styles/
│   │   └── createUser.styles.ts        # Component styles
│   ├── navigation/
│   │   └── AppNavigator.tsx            # Navigation setup
│   └── types/
│       └── navigation.ts               # Type definitions
└── docs/
    └── user-creation-feature.md        # This documentation
```

## Future Enhancements

1. **Role-based Access**: Only show to admin users
2. **Bulk User Creation**: Import from CSV/Excel
3. **User Templates**: Predefined configurations
4. **Advanced Validation**: Custom business rules
5. **Audit Trail**: Track user creation events
6. **Email Notifications**: Welcome emails to new users

## Testing

### Manual Testing Checklist

- [ ] Form validation works correctly
- [ ] Password confirmation matches
- [ ] Email format validation
- [ ] Role selection dropdown
- [ ] Pokémon grid with pagination
- [ ] Loading states display
- [ ] Error messages show properly
- [ ] Success flow works
- [ ] Navigation works correctly
- [ ] Responsive design on different screens

### API Testing

- [ ] Create user with valid data
- [ ] Handle duplicate email errors
- [ ] Handle network errors
- [ ] Validate required fields
- [ ] Test role and Pokémon relationships

## Dependencies

- React Native
- @react-navigation/native
- @react-navigation/stack
- AsyncStorage (for auth token)
- Axios (for API calls)

## Configuration

The feature uses the existing API configuration from `api.ts` and follows the established patterns in the application for:

- Error handling
- Loading states
- Navigation
- Styling
- Type safety 