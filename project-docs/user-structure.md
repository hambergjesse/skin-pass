# CS2 Skin Inspect Converter - User Flow & Project Structure

## User Journey

### Link to Password Conversion
1. **Entry Point**
   - User lands on homepage
   - Sees two conversion options
   - Selects "Link to Password" mode

2. **Input Phase**
   - User pastes CS2 skin inspect link
   - System validates link format
   - Provides feedback if invalid

3. **Conversion Phase**
   - User clicks "Convert" button
   - System processes link
   - Generates secure password
   - Displays result

4. **Output Phase**
   - User can copy password
   - Clear form option
   - Switch to reverse mode

### Password to Link Conversion
1. **Entry Point**
   - User selects "Password to Link" mode
   - Or switches from previous mode

2. **Input Phase**
   - User enters previously generated password
   - System validates password format
   - Provides feedback if invalid

3. **Conversion Phase**
   - User clicks "Convert" button
   - System processes password
   - Decrypts to original link
   - Displays result

4. **Output Phase**
   - User can copy link
   - Clear form option
   - Switch to other mode

## Data Flow

### Link to Password
1. Input Validation
   ```
   User Input → Validate Format → Process Link → Encrypt → Generate Password → Display
   ```

2. Error Handling
   ```
   Invalid Input → Error Message → User Correction → Re-validation
   ```

### Password to Link
1. Input Validation
   ```
   User Input → Validate Format → Process Password → Decrypt → Generate Link → Display
   ```

2. Error Handling
   ```
   Invalid Input → Error Message → User Correction → Re-validation
   ```

## Project Structure

### Directory Layout
```
project-root/
├── src/
│   ├── components/         # UI Components
│   │   ├── Converter/     # Main conversion component
│   │   ├── Input/         # Input field components
│   │   ├── Output/        # Output display components
│   │   └── UI/            # Common UI elements
│   ├── lib/
│   │   ├── crypto/        # Cryptographic functions
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript definitions
│   ├── routes/            # Page routes
│   └── styles/            # Global styles
├── public/                # Static assets
├── tests/                 # Test files
└── project-docs/          # Project documentation
```

### Component Structure

1. **Main Components**
   - `Converter.svelte`: Main conversion interface
   - `InputField.svelte`: Input handling
   - `OutputDisplay.svelte`: Result display
   - `ModeToggle.svelte`: Conversion mode switch

2. **Utility Components**
   - `Button.svelte`: Common button styles
   - `ErrorDisplay.svelte`: Error messages
   - `LoadingIndicator.svelte`: Loading states
   - `CopyButton.svelte`: Clipboard functionality

3. **Layout Components**
   - `Header.svelte`: Page header
   - `Footer.svelte`: Page footer
   - `Container.svelte`: Content wrapper

## File Organization

### Source Files
1. **Components**
   - Organized by feature
   - Reusable components in common directory
   - Feature-specific components in feature directories

2. **Library**
   - Cryptographic functions in crypto/
   - Utility functions in utils/
   - Type definitions in types/

3. **Routes**
   - Single page application
   - Route-based code splitting
   - Lazy loading where appropriate

### Asset Files
1. **Styles**
   - Global styles in styles/
   - Component-specific styles with components
   - Tailwind configuration

2. **Public Assets**
   - Images in public/images/
   - Fonts in public/fonts/
   - Other static assets

## State Management

### Local State
1. **Component State**
   - Input values
   - Conversion results
   - Error states
   - Loading states

2. **UI State**
   - Active mode
   - Form validation
   - Copy status
   - Error messages

### Global State
1. **Application State**
   - Theme preferences
   - Language settings
   - User preferences

2. **Security State**
   - Encryption keys
   - Validation rules
   - Security settings 