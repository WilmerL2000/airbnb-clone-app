<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h1 align="center">Airbnb Clone App</h1>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1686248755/GitHub/airbnb-clone/home2_xvfmc4.jpg" width="100%" >
  <p align="center">
    <a href="https://dream-stay-w.vercel.app/" target="_blank">Web Page</a>
  </p>
</div>

## Test User

- Email:
  ```
   test@gmail.com
  ```
- Password:
  ```
   Test123
  ```
  <br/>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>
    <strong>
        Table of Contents
    </strong>
  </summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a>
        </li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#desktop">Desktop</a></li>
        <li><a href="#mobile">Mobile</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is developed with Next.js 13 and the new App Router: React, Tailwind, Prisma, MongoDB, NextAuth and other tecnologies. It has many of the features of the main application as detailed below.

### Features

- Credential authentication.
- Google authentication.
- Github authentication.
- Image upload using Cloudinary CDN.
- Client form validation and handling using react-hook-form.
- Calendars with react-date-range.
- Booking / Reservation system.
- Guest reservation cancellation.
- Owner reservation cancellation.
- Creation and deletion of properties.
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms.
  For example we will filter out properties that have a reservation in your desired date range to travel
- Favorites system.
- Shareable URL filters.

### Tech Stack

<table>
    <tr>
      <td align="center" width="96">          
        <br><strong>Tech</strong>
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487162/GitHub/assets/image_20211214122557_0_h9qr5m.png" width="48" height="48" alt="Next.js" />
        <br><strong>Next.js</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487163/GitHub/assets/react_original_logo_icon_146374_whazfv.png" width="48" height="48" alt="React" />
        <br><strong>React</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1686199220/GitHub/assets/logo-sm_omxcdj.png" width="48" height="48" alt="NextAuth" />
        <br><strong>NextAuth</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487162/GitHub/assets/file_type_typescript_official_icon_130107_svjybp.png" width="48" height="48" alt="TypeScript" />
        <br><strong>TypeScript</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682487162/GitHub/assets/file_type_tailwind_icon_130128_mwu7ie.png" width="48" height="48" alt="Tailwind CSS" />
        <br><strong>Tailwind CSS</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682537001/GitHub/assets/axios_hhohil.png" width="48" height="48" alt="Axios" />
        <br><strong>Axios</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682489027/GitHub/assets/zustand_dyq4zd.png" width="64" height="48" alt="Zustand" />
        <br><strong>Zustand</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1686199264/GitHub/assets/prisma_she1mb.png" width="64" height="48" alt="Prisma" />
        <br><strong>Prisma</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1686199544/GitHub/assets/reacthookform_kekzdz.png" width="64" height="48" alt="React Hook Form" />
        <br><strong>React Hook Form</strong>        
      </td>      
      <td align="center" width="96">
          <img src="https://res.cloudinary.com/wils09/image/upload/v1682564470/GitHub/assets/cloudinary_sjvklt.png" width="64" height="48" alt="Next Cloudinnary" />
        <br><strong>Next Cloudinnary</strong>        
      </td>      
      <td align="center" width="96">        
        <br><strong>Bcrypt</strong>        
      </td>      
      <td align="center" width="96">        
        <br><strong>Date-fns</strong>        
      </td>      
      <td align="center" width="96">        
        <br><strong>React-date-range</strong>        
      </td>      
      <td align="center" width="96">        
        <br><strong>React-select</strong>        
      </td>  
    </tr>
     <tr>
      <td align="center" width="96">          
        <br><strong>Version</strong>
      </td>      
      <td align="center" width="96">
        <br>13.4.3
      </td>      
      <td align="center" width="96">
        <br>18.2.0
      </td>      
      <td align="center" width="96">
        <br>4.22.1
      </td>      
      <td align="center" width="96">
        <br>5.1.3
      </td>      
      <td align="center" width="96">
        <br>3.3.2
      </td>      
      <td align="center" width="96">
        <br>1.4.0
      </td>      
      <td align="center" width="96">
        <br>4.3.8
      </td>      
      <td align="center" width="96">
        <br>4.15.0
      </td>      
      <td align="center" width="96">
        <br>7.44.3
      </td>      
      <td align="center" width="96">
        <br>4.12.0
      </td>      
      <td align="center" width="96">
        <br>5.1.0
      </td>      
      <td align="center" width="96">
        <br>2.30.0
      </td>      
      <td align="center" width="96">
        <br>1.4.0
      </td>      
      <td align="center" width="96">
        <br>5.7.3
      </td>      
    </tr>
  </table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Desktop

<div align="center">
  <div>
    <h3>Home Page</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1686198213/GitHub/airbnb-clone/home_tw61su.jpg" width="100%" >
  </div>
  <div>
    <h3>Login</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1686198935/GitHub/airbnb-clone/login_ktrxtl.jpg" width="100%" >
  </div>
  <div>
    <h3>Register</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1686198935/GitHub/airbnb-clone/register_bfgxad.jpg" width="100%" >
  </div>
  <div>
    <h3>My Properties</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379367/GitHub/airbnb-clone/properties_rvbzsh.jpg" width="100%" >
  </div>
  <div>
    <h3>My Trips</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379369/GitHub/airbnb-clone/trips_zpkjkz.jpg" width="100%" >
  </div>
  <div>
    <h3>Reservations Made To My Properties</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379368/GitHub/airbnb-clone/reservations_zlx6mu.jpg" width="100%" >
  </div>
  <div>
    <h3>My Favorites</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687380916/GitHub/airbnb-clone/favorites_wtman8.jpg" width="100%" >
  </div>
  <div>
    <h3>Add New Property</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379367/GitHub/airbnb-clone/add_prop_1_st1i7x.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379368/GitHub/airbnb-clone/add_prop_2_x1bnwh.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379367/GitHub/airbnb-clone/add_prop_3_vjo8fm.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379369/GitHub/airbnb-clone/add_prop_4_ri59a3.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379370/GitHub/airbnb-clone/add_prop_5_h1uoby.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379370/GitHub/airbnb-clone/add_prop_6_wzleb5.jpg" width="100%" >
  </div>
  <div>
    <h3>Filter Properties</h3>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687381250/GitHub/airbnb-clone/filter_1_faxfyl.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379370/GitHub/airbnb-clone/filter_2_xvinwk.jpg" width="100%" >
    <img src="https://res.cloudinary.com/wils09/image/upload/v1687379367/GitHub/airbnb-clone/filter_3_cds0qk.jpg" width="100%" >
  </div>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Mobile

<div align="center">
  <div>
    <img src="https://res.cloudinary.com/wils09/image/upload/v1686245983/GitHub/airbnb-clone/mobile1_ju2j0k.jpg" width="100%" >
  </div>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

_Follow the instructions below_

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/WilmerL2000/airbnb-clone-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Go to `https://console.cloud.google.com` and create a new project
4. Go to your GitHub account and in `Settings - Developer settings` create a new OAuth App
5. Setup `.env` file

   ```js
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   GITHUB_ID=
   GITHUB_SECRET=
   NEXTAUTH_SECRET=
   ```

6. Setup Prisma

   ```shell
   npx prisma db push
   ```

7. Start the app
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

`Wilmer Lopez Cespedes`

- Correo: wilmerlopezcespedes@gmail.com
- <a href="https://www.linkedin.com/in/wilmer-lopez-cespedes/" target="_blank">LinkedIn</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
