# v26 – Clean Energy Innovations Dashboard

This is a Single Page Application (SPA) built using Angular (frontend), Node.js/Express (backend), and MongoDB Atlas (database). It displays recent innovations and financial trends in the US clean energy sector. It includes authentication, dynamic charts, and full backend-frontend separation.


## Login Credentials

- **Username**: `vamsi`  
- **Password**: `vamsi`


## Tech Stack

| Layer     | Tech            |
|-----------|-----------------|
| Frontend  | Angular 16      |
| Backend   | Node.js + Express |
| Database  | MongoDB Atlas   |
| Auth      | JWT             |
| Charts    | ng2-charts + Chart.js |


# Features

## Login Page
  - Users log in using: `vamsi` / `vamsi`
  - JWT-based authentication
  - Unauthorized access redirects to login

## Navigation Bar
  - Available on all pages (Dashboard, Summary, Reports)
  - Styled hover effects and underline for active page
  - Logout button aligned to the right
## Dashboard Page
The Dashboard displays a 200-word summary of a recent innovation in clean energy,
along with the source URL and a brief technical 
description of the application’s tech stack and infrastructure.

## Summary Page
The Summary page features a dynamic chart retrieved from the backend through an HTTP GET request. The chart data is stored in MongoDB Atlas, accompanied by a description explaining its content.


## Reports Page
The Reports page presents a multi-line chart displaying Inflation, Federal Interest Rate, and Utility Debt trends. The data is securely fetched from MongoDB Atlas through authenticated API endpoints.




## 📚 Source

**Article**: [Funding growth in the US power sector – Deloitte](https://www2.deloitte.com/us/en/insights/industry/power-and-utilities/funding-growth-in-us-power-sector.html)
