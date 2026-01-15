# 📦 Proiect Baze de Date Distribuite - E-Shop Distribuit

Acest proiect reprezintă o aplicație de tip E-Commerce care demonstrează conceptele de **Baze de Date Distribuite**. Aplicația utilizează o arhitectură bazată pe **fragmentarea verticală (funcțională)**, separând datele de securitate de datele comerciale în instanțe fizice diferite.

---

## 🏛️ Arhitectura Sistemului

Sistemul este construit pe un model Client-Server, utilizând două baze de date distincte pentru a simula distribuția datelor:

1.  **Baza de Date 1 (`db_auth`):**
    * Responsabilă strict de securitate și autentificare.
    * Stochează tabela `users` (ID, username, password).
    * Gestionează procesele de **Login** și **Register**.

2.  **Baza de Date 2 (`db_shop`):**
    * Responsabilă de logica de afaceri.
    * Stochează tabelele `products` și `orders`.
    * Produsele conțin link-uri către imagini reale.

**Interacțiunea Distribuită:**
* Când un utilizator plasează o comandă, serverul verifică identitatea în **BD1** (prin token JWT) și apoi scrie tranzacția în **BD2**, realizând o legătură logică (Soft Link) între cele două baze de date.

---

## ✨ Funcționalități Cheie

### 🔐 Securitate & Autentificare
* **Login & Register:** Posibilitatea de a crea conturi noi și de a te autentifica.
* **JWT (JSON Web Tokens):** Sesiunile sunt stateless și securizate prin tokeni.
* **Logout:** Ștergerea sesiunii și securizarea clientului.

### 🛒 Experiență E-Commerce
* **Coș de Cumpărături Persistent:** Produsele din coș sunt salvate în memoria locală a browserului (LocalStorage), astfel încât nu se pierd la refresh sau delogare.
* **Design Modern:** Interfață "Glassmorphism" cu fundaluri animate și tranziții fluide.
* **Imagini Reale:** Produsele sunt afișate cu imagini de înaltă calitate.

---

## 🛠️ Tehnologii Folosite

* **Backend:** Node.js + Express.js
* **Baze de Date:** MySQL (2 instanțe logice)
* **ORM:** Sequelize (pentru modelarea datelor și sincronizare)
* **Frontend:** HTML5, CSS3 (Custom, fără framework-uri), Vanilla JavaScript
* **Altele:** `dotenv` (variabile de mediu), `cors` (permisiuni cross-origin)

---

## 🚀 Instrucțiuni de Instalare și Rulare

### 1. Pre-condiții
Asigură-te că ai instalate:
* [Node.js](https://nodejs.org/)
* MySQL Server (care să ruleze pe portul 3306)

### 2. Configurare
Creează un fișier numit `.env` în rădăcina proiectului și adaugă configurările tale:

```env
DB_USER=root
DB_PASS=parola_ta_mysql
DB_HOST=localhost
JWT_SECRET=cheie_secreta_proiect
PORT=3000