# MyBlog - Frontend

[Deployed_Link](https://my-blog-raqib.netlify.app)

MyBlog is a full-stack blogging application where users can register, log in, view posts by pagination, add posts, edit posts, comment on posts, and view comments by pagination. This repository contains the frontend of the application, built with React and Redux Toolkit.

## Features
- **User Authentication**: Users can register and log in to access the platform.
- **Post Management**: Users can view posts, add new posts, and edit existing posts.
- **Comments**: Users can comment on posts, and comments are displayed with pagination.
- **Rich Text Editor**: Posts can be written with a WYSIWYG editor using TinyMCE.
- **Pagination**: Both posts and comments are paginated for better user experience.
- **State Management**: Handled by Redux Toolkit for efficient global state management.
- **Form Handling**: Managed with React Hook Form for smooth and efficient form handling.
- **Notifications**: Enhanced user interaction with SweetAlert2 for notifications and alerts.

## Tech Stack
- **React**: v18.3.1
- **Redux Toolkit**: v2.2.7
- **React Hook Form**: v7.52.2
- **TinyMCE**: v7.3.0
- **SweetAlert2**: v11.12.4
- **React Router DOM**: v6.26.1
- **HTML Parsing**: Managed by `html-react-parser`

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/Raqibreyaz/BlogFrontend.git]
   cd frontend-repo

2. **Install the dependencies**:
   ```bash
    npm install

3. **Create a .env file in the root directory and add the following variables**
   ```bash
   VITE_BACKEND_URL=your-backend-url
   VITE_TINYMCE_KEY=tinymce-key-for-text-editor

4. **This frontend works in conjunction with the Nodejs backend. For backend setup and more**:
   ```bash
   visit [Backend Repository](https://github.com/Raqibreyaz/BlogFrontend.git)