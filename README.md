# 🚦 Auto-Track

Auto-Track is a comprehensive Traffic Management System designed to streamline the process of vehicle monitoring and challan generation using advanced ALPR (Automatic License Plate Recognition) technology.

The project includes a **mobile application** (for police officers) and a **web platform** (for both admins and users):

- **Police Mobile Application**:  
  - Officers can **scan vehicle number plates** to automatically fetch vehicle records from the database and generate online penalty tickets (challans) instantly.
  - If the internet is unavailable, officers can **manually fill in challan details offline**. These tickets will be stored locally and **auto-synced** with the server once the internet is back.
  - The app also features an **analytics dashboard** showing statistics like total challans issued, penalties collected, and graphical reports.

- **Web Platform**:
  - **Admin Section**: Admins can verify police-generated challans, monitor live video feeds of different roads, manage police team members, respond to user queries, and view a detailed analytics dashboard.
  - **User Section**: Users can raise queries regarding challans they have received and track the status of their queries.

The project ensures efficient and transparent traffic management with real-time and offline capabilities.

---

## 🎥 Demo Videos

- **Mobile Application Functionality Demo**:  
  [Watch Video Here](https://drive.google.com/file/d/11RMAVFibmcyPdxD1wPDdpQJj67-14Js5/view?usp=sharing)

- **Website Functionality Demo**:  
  [Watch Video Here](https://drive.google.com/file/d/1go6-JHm7y4hlz_O6jc3mupcfMdZIbIE8/view?usp=sharing)

---

## ✨ Features

### Mobile Application (Police Officers)
- **Online Challan Generation** with real-time database fetch.
- **Offline Challan Generation** with auto-sync when the internet is available.
- **Analytics Dashboard** showing total challans, penalties, and performance graphs.

### Web Platform
- **Admin Dashboard** for verifying challans, monitoring live traffic, managing police teams, and handling user queries.
- **User Dashboard** for raising and tracking challan queries.

---

## 🛠️ Technology Stack

| Component      | Technology                |
|----------------|----------------------------|
| Mobile App     | React Native (Expo)         |
| Web Frontend   | React.js                    |
| Backend APIs   | Django (Python)             |
| Database       | PostgreSQL                  |
| Storage        | Firebase Storage (Photos)   |

---

## 📁 Folder Structure

```
Auto-Track/
├── application/
│   ├── frontend/    # React Native app (Expo)
│   └── backend/     # Django server for mobile
├── website/
│   ├── frontend/    # React.js web portal
│   └── backend/     # Django server for web
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auto-track.git
cd auto-track
```

---

## 📱 Setting Up the Mobile Application (application/)

### Frontend (React Native)

```bash
cd application/frontend
npm install
npm start
```
This will start the mobile application using Expo.

> 📢 **Note:** Make sure you have Expo CLI installed globally:  
> ```bash
> npm install -g expo-cli
> ```

---

### Backend (Django API for Mobile App)

```bash
cd ../backend
python -m venv venv
# Activate the virtual environment:
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py runserver
```
The Django server will start locally, typically at `http://127.0.0.1:8000/`.

---

## 🖥️ Setting Up the Website (website/)

### Frontend (React.js)

```bash
cd ../../website/frontend
npm install
npm start
```
The website frontend will be available at `http://localhost:3000/`.

---

### Backend (Django API for Website)

```bash
cd ../backend
python -m venv venv
# Activate the virtual environment:
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py runserver
```
The Django server for the website will also run locally, usually at `http://127.0.0.1:8000/`.

---

## ⚙️ Environment Variables

- Configure your database settings (PostgreSQL) in Django `settings.py`.
- Connect Firebase Storage credentials where needed for uploading photos.
- API endpoints should be updated correctly inside both React Native and React projects depending on your local/production server.

---

## 📋 Important Notes
- **Master branch** is the default branch.
- Ensure PostgreSQL server is running before starting the Django backend.
- Install all necessary dependencies using `npm install` and `pip install`.
- Keep the virtual environment activated while running Django server.
- For Expo app testing, you can use the Expo Go app on your Android/iOS device.

---

## 💬 Support
For any issues, please raise a query or contact the project maintainers.

---

# 🔥 Happy Hacking!
