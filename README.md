# 🛡️ Prueba Técnica – *El Guardián del Onboarding*

**Autor:** Jonathan Bohórquez  
**Tecnologías:** NestJS · Next.js 16 · TypeScript · Docker · SQLite · In-Memory Repositories · Tailwind · Swagger · Postman  
**Contexto:** Prueba Técnica – Banco Caja Social (sin logos ni imágenes)

---

## 🧭 Descripción General

Este proyecto implementa la solución completa para el desafío **“El Guardián del Onboarding”**

La solución se compone de dos módulos principales:

- **Backend (API NestJS):** provee autenticación JWT, endpoints REST para productos y onboarding, validaciones, documentación Swagger y cobertura de pruebas unitarias, de integración y E2E.
- **Frontend (Next.js):** aplicación visual moderna y reactiva que consume las APIs, con autenticación, dashboard administrativo, módulos independientes para productos y solicitudes de apertura.

Toda la solución está **contenedorizada con Docker**, detecta automáticamente el entorno (`development` o `production`) y ajusta el comportamiento y las credenciales según el entorno de despliegue.

---

## ⚙️ Backend (NestJS)

### 🧩 Características principales

| Módulo | Endpoint | Descripción |
|--------|-----------|-------------|
| **Auth** | `POST /auth/login` | Recibe credenciales ficticias, retorna JWT válido 5 minutos. |
| **Products** | `GET /products`, `GET /products/:id`, `POST/PUT/DELETE` | CRUD completo de productos, con guardias JWT. |
| **Onboarding** | `POST /onboarding`, `GET /onboarding`, `GET /onboarding/:id` | Creación de solicitudes de apertura, validaciones con `class-validator`, token requerido. |
| **Health** | `GET /health` | Endpoint de verificación del estado `{ ok: true }`. |

---

### 🧠 Arquitectura y Diseño

- **Modularización por Dominio:** cada dominio (Auth, Products, Onboarding, Health) tiene su propio módulo, controlador, servicio, DTOs, entidades y repositorio.  
- **Repositorios configurables:** mediante la variable `.env` `REPOSITORY`, se puede alternar entre:
  - `in-memory` → simula persistencia en memoria.
  - `sqlite` → persistencia real con SQLite y Prisma.
- **Inyección de dependencias (IoC):** desacopla los repositorios del servicio, permitiendo intercambiarlos sin modificar la lógica.
- **Validaciones:** uso de `class-validator` y `class-transformer` en los DTOs.
- **Autenticación JWT:** token válido 5 minutos, configurable por entorno (`JWT_SECRET` dinámico).
- **Guardias (Guards):** protegen rutas privadas (`Products`, `Onboarding`) verificando token JWT.
- **Swagger:** documentación completa de la API disponible en [`http://localhost:8080/api/docs`](http://localhost:8080/api/docs)  
  Incluye descripción de parámetros, ejemplos, paginación y autenticación Bearer.
- **Postman:** colección exportada con todas las rutas configuradas y ejemplos de request/response.

---

### 🧱 Patrones de diseño aplicados

| Patrón | Uso |
|--------|-----|
| **Repository Pattern** | Encapsula la lógica de acceso a datos (InMemory y SQLite). |
| **Dependency Injection** | Implementado nativamente con el sistema de módulos de NestJS. |
| **Strategy Pattern** | Selección dinámica de repositorio según entorno (`REPOSITORY` env var). |
| **Factory Pattern** | Registro condicional de repositorios. |
| **DTO Pattern** | Estandarización de entrada/salida entre capas. |

---

### 🧩 Principios SOLID aplicados

- **S – Single Responsibility:** cada clase o módulo tiene una única responsabilidad.  
- **O – Open/Closed:** nuevos repositorios o validadores pueden añadirse sin modificar la lógica existente.  
- **L – Liskov Substitution:** los repositorios in-memory y SQLite implementan la misma interfaz base.  
- **I – Interface Segregation:** se exponen únicamente métodos relevantes en cada dominio.  
- **D – Dependency Inversion:** los servicios dependen de abstracciones, no implementaciones concretas.

---

### 🧪 Testing

Se implementaron tres niveles de pruebas con Jest:

| Tipo | Descripción | Cobertura |
|------|-------------|------------|
| **Unitarias** | Testean la lógica de servicios de forma aislada. | AuthService, ProductsService, OnboardingService |
| **Integración** | Verifican la integración entre módulos y repositorios. | Módulos completos |
| **E2E** | Simulan requests reales a la API usando `supertest`. | `/auth`, `/products`, `/onboarding`, `/health` |

---

### 🐳 Dockerización (Backend)

- **Desarrollo local:** `nest start --watch` → puerto **3000**  
- **Producción (Docker):** expone puerto **8080**  
- Variables `.env` diferencian el entorno (`JWT_SECRET_DEV` / `JWT_SECRET_PROD`).

---

## 🎨 Frontend (Next.js 16)

### 🌟 Características principales

- **Framework:** Next.js 16 (App Router) con TypeScript.  
- **Estilos:** TailwindCSS.  
- **Estado global:** Context API (`LoadingContext`, `AuthContext`).  
- **Protección de rutas:** Middleware + Guards en rutas privadas.  
- **Interfaz modular y dinámica:** componentes genéricos y reutilizables (`DataTable`, `Modal`, `FormField`, etc.).  
- **Feedback visual:** spinners, toasts, animaciones suaves.  
- **Pantallas:**  
  - Login (con gestión de token).  
  - Dashboard principal.  
  - Módulo de administración de productos.  
  - Módulo de solicitudes de apertura (Onboarding).  
  - Página de “Unauthorized” para usuarios sin token.  

### 🔄 Integración con Backend
- API base configurable con `NEXT_PUBLIC_API_URL` (por entorno).
- Los módulos de productos y onboarding están relacionados:
  - Desde productos se puede iniciar una solicitud de apertura.
  - Desde onboarding se listan y gestionan las solicitudes realizadas.

---

### 🧱 Arquitectura de frontend

| Componente | Descripción |
|-------------|--------------|
| `services/rest.service.ts` | Abstracción de peticiones REST hacia el backend. |
| `context/LoadingContext.tsx` | Gestión global del estado de carga y spinners. |
| `components/ui/*` | Componentes reutilizables con Tailwind. |
| `middleware.ts` | Protege rutas privadas verificando JWT. |
| `pages/*` | Dashboard, módulos, login, error pages. |

---

### 🧩 Plus y buenas prácticas

- Diseño responsive y minimalista.  
- Dashboard administrativo con KPIs y sliders automáticos.  
- Paginación e integración de APIs documentadas.  
- Separación de responsabilidades en componentes.  
- Uso de `react-hot-toast` para notificaciones.  
- Código limpio, tipado y documentado.  
- Middlewares e interceptores para proteger rutas y gestionar sesiones.  

---

### 🐳 Dockerización (Frontend)

- **Desarrollo local:** `npm run dev` → puerto **4000**  
- **Producción (Docker):** expone puerto **4000**  
- Variable `.env` con `NEXT_PUBLIC_API_URL=http://localhost:8080`.

---

## 🚀 Despliegue y Ejecución

### 🔧 Modo desarrollo
**Backend**
```bash
cd back
npm install
npm run start:dev
# Puerto 3000
