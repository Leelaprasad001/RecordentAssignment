# 🚀 Recordent Internship Assignment  

## 📄 Overview  
This project is a sample **web application** developed as part of the internship assignment for **Recordent Pvt Ltd**. The application includes Sign-Up and Sign-In flows, a Dashboard for employee data management, **JWT-based session handling**, and bulk upload functionality.  

### 🌐 **Live Demo**  
🔗 [Live Link](https://recordent.vercel.app/) 

### 🛠️ Tech Stack  
- **Frontend**: React, Tailwind  
- **Backend**: Node.js, Express.js, JWT (Session Management)  
- **Database**: MySQL (Aiven)
- **File Handling**: ExcelJS (Excel Upload), PDFKit (PDF Generation)  

---

## ✨ Features  

### 🔐 **Sign-Up Flow**  
- A **form** to capture:  
  - Name  
  - Email  
  - Mobile Number  
  - Password & Confirm Password  
- **Validations**:  
  - Client-side and server-side validations.  
  - Prevents duplicate users using Email/Mobile as unique identifiers.  

### 🔑 **Sign-In Flow**  
- A **responsive Sign-In page** replicating the UI of [Recordent](https://www.recordent.com).  
- Successful sign-in redirects to the **Dashboard**.  

### 📊 **Dashboard Functionalities**  
A top navigation menu with a **dropdown** providing:  

1. **📝 New Record**  
   - Add new employee details:  
     - Name  
     - Department  
     - Salary  

2. **📋 View All**  
   - View employee records in a **paginated table**.  
   - Inline editing of employee data.  
   - **Download PDF**: Generate a password-protected PDF containing all records.  

3. **📂 Bulk Upload**  
   - Upload an **Excel file** to bulk-insert records into the database.  

### 🔒 **Session Management**  
- Implemented using **JWT**.  
- **Idle Timeout**: Token invalidates after **10 minutes** of inactivity.  
- Active sessions seamlessly fetch a **new token** for a smooth user experience.  

---
