# OrangeHRM Automation Project

Automation testing menggunakan Cypress dengan konsep Page Object Model (POM) dan Intercept.

## Features Tested

### 1. Login
- 8 Test Cases
- Valid login
- Invalid login
- Empty validation
- Dashboard verification
- Logout

### 2. Directory
- 8 Test Cases
- Open directory
- Search employee
- Reset search
- Employee card verification

### 3. Recruitment
- 8 Test Cases
- Open recruitment
- Search candidate
- Reset search
- Candidate table verification


## Tools
- Cypress
- JavaScript
- Page Object Model
- Intercept


## Result

Login : 8 Passing  
Directory : 8 Passing  
Recruitment : 8 Passing

Berikut adalah Struktur file yang saya gunakan dalam pengerjaan proyek akhir:
e2e
   project-akhir
      login.cy.js
      directory.cy.js
      recruitment.cy.js

fixtures
   orangehrmData.json

pages
   AuthPage.js
   DirectoryPage.js
   RecruitmentPage.js

screenshots

support
