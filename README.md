# Blog Management System

A modern, full-featured blog management system built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features an intuitive admin panel with step-by-step post creation wizard and rich markdown editing capabilities.

![Next.js](https://img.shields.io/badge/Next.js-15.4.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🎯 **Core Functionality**

- **CRUD Operations** - Create, Read, Update, Delete blog posts
- **Step-by-Step Wizard** - Guided post creation process
- **Rich Markdown Editor** - Full-featured content editing with live preview
- **Admin Dashboard** - Comprehensive post management interface
- **Responsive Design** - Optimized for all device sizes

### 📝 **Content Management**

- **4-Step Creation Wizard**:
  1. Basic Info (Title, Author)
  2. Details (Summary, Category, Featured Image)
  3. Content (Rich Markdown Editor)
  4. Review & Submit
- **Markdown Support** with GitHub Flavored Markdown (GFM)
- **Live Preview** functionality
- **Category Management**
- **View Tracking**

### 🎨 **Modern UI/UX**

- **shadcn/ui Components** - Consistent, accessible design system
- **Dark/Light Mode** support
- **Interactive Elements** with smooth animations
- **Mobile-First** responsive design
- **Modern Typography** and spacing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/IsnuMdr/blog-app.git
cd blog-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
blog-app/
├── app/
│   ├── (root)/                    # Public-facing pages
│   │   ├── page.tsx              # Homepage with post grid
│   │   └── post/[id]/page.tsx    # Individual post pages
│   ├── admin/                    # Admin panel
│   │   ├── page.tsx             # Dashboard overview
│   │   └── posts/               # Post management
│   └── api/posts/               # API endpoints
├── components/
│   ├── admin/                   # Admin-specific components
│   ├── post-wizard/            # Step-by-step creation wizard
│   └── ui/                     # Reusable UI components
├── data/
│   └── posts.json              # JSON data storage
├── lib/                        # Utility functions
├── types/                      # TypeScript definitions
└── hooks/                      # Custom React hooks
```

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework

### **UI Components**

- **shadcn/ui** - Modern, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons

### **Content Editing**

- **@uiw/react-md-editor** - Rich markdown editor
- **react-markdown** - Markdown rendering
- **remark-gfm** - GitHub Flavored Markdown

### **Data & Validation**

- **JSON File Storage** - Simple, file-based persistence
- **Zod** - Runtime type validation

## 📖 Usage

### 🏠 **Public Interface**

- Browse all blog posts on the homepage
- Click any post to view full content
- Responsive grid layout adapts to screen size

### 👨‍💼 **Admin Panel**

Access the admin panel at `/admin`

#### Dashboard Features:

- **Statistics Overview** - View total posts, categories, and views
- **Post Management** - Edit or delete existing posts
- **Quick Actions** - Create new posts with one click

#### Creating Posts:

1. Click "Create New Post"
2. Follow the 4-step wizard:
   - **Step 1**: Enter title and author
   - **Step 2**: Add summary, category, and featured image
   - **Step 3**: Write content using the rich markdown editor
   - **Step 4**: Review and publish

#### Editing Posts:

- Click "Edit" on any post in the dashboard
- Modify content using the same wizard interface
- Changes are saved immediately

## 🔧 API Endpoints

| Method   | Endpoint          | Description       |
| -------- | ----------------- | ----------------- |
| `GET`    | `/api/posts`      | Get all posts     |
| `POST`   | `/api/posts`      | Create new post   |
| `GET`    | `/api/posts/[id]` | Get specific post |
| `PUT`    | `/api/posts/[id]` | Update post       |
| `DELETE` | `/api/posts/[id]` | Delete post       |

## 🎨 Customization

### **Styling**

The project uses Tailwind CSS with custom design tokens. Modify `tailwind.config.js` to customize:

- Colors and themes
- Typography scales
- Spacing system
- Breakpoints

### **Components**

All components are built with shadcn/ui. Customize by:

- Modifying component variants in `components/ui/`
- Updating design tokens
- Adding new component patterns

### **Content Types**

Extend the post schema in `types/post.ts` to add new fields:

- Tags/categories
- SEO metadata
- Publishing status
- Author information

## 🚀 Performance

### **Optimizations Included**

- **Next.js 15 Features** - Turbopack for faster builds
- **React 19** - Automatic batching and concurrent rendering
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Optimized bundle sizes

### **Lighthouse Scores**

- Performance: 96
- Accessibility: 94
- Best Practices: 100
- SEO: 100

## 🧪 Development

### **Available Scripts**

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Code Quality**

- **ESLint** configuration for code consistency
- **TypeScript** strict mode enabled
- **Prettier** formatting (recommended)
- **Conventional Commits** for clear history

## 🚀 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/IsnuMdr/blog-app)

### **Other Platforms**

- **Netlify** - Works out of the box
- **Railway** - Simple deployment
- **Docker** - Container deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[Muhammad Isnu Munandar]**

- GitHub: [@IsnuMdr](https://github.com/IsnuMdr)
- LinkedIn: [Muhammad Isnu Munandar](https://www.linkedin.com/in/muhammad-isnu-munandar-b256961b3/)
- Email: isnu.mdr@gmail.com

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [shadcn](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives

---

⭐ **Star this repository if it helped you!**
