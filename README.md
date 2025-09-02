# 📚 Minimal Library Management System (Frontend)

A **React + TypeScript** based minimal **Library Management System** built with **Redux Toolkit Query (RTK Query)** for state management and API handling.  
This project provides essential features like **book management (CRUD)**, **borrowing books**, and **borrow summary**, all accessible without authentication.  

---

## 🚀 Features

## livelink:[BookSelf](https://assignment-frontend-4-g11q.vercel.app/)

### ✅ Public Routes  
- All pages are accessible without login/authentication.  

### 📖 Book Management  
- **Book List Table**: Displays all books in a clean tabular format.  
- Columns: `Title | Author | Genre | ISBN | Copies | Availability | Actions`.  
- **Actions:**  
  - ✏️ Edit Book → Update book details (copies=0 → automatically unavailable).  
  - 🗑️ Delete Book → Confirmation dialog before removing.  
  - 📥 Borrow Book → Borrow a book with quantity and due date.  
- **Add New Book**: Create new book with title, author, genre, ISBN, description, copies.  
- UI updates instantly on all CRUD actions.  

### 📥 Borrow Book  
- Borrow form with:  
  - **Quantity** (cannot exceed available copies).  
  - **Due Date**.  
- Copies reduce accordingly, and when copies = 0 → book marked as unavailable.  
- Redirect to **Borrow Summary** after successful borrowing.  

### 📊 Borrow Summary  
- Displays an aggregated list of borrowed books.  
- Columns: `Book Title | ISBN | Total Quantity Borrowed`.  

---

## 📂 Pages & Routes

- `/books` → List all books with actions (view, edit, delete, borrow).  
- `/create-book` → Add a new book.  
- `/books/:id` → View detailed book info.  
- `/edit-book/:id` → Edit book details.  
- `/borrow/:bookId` → Borrow book form.  
- `/borrow-summary` → Summary of all borrowed books.  

---

## 🛠️ Tech Stack

- **React 18 + TypeScript**  
- **Redux Toolkit + RTK Query** (API state management)  
- **React Router DOM** (client-side routing)  
- **Tailwind CSS / ShadCN (optional)** (styling)  

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/library-management-frontend.git
cd library-management-frontend
