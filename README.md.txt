# 🐦 Twitter Clone

Um clone simplificado do Twitter (X), com **Django REST Framework** no backend e **React (Vite)** no frontend.

---

## 🚀 Tecnologias
- **Backend:** Django 5.2, Django REST Framework, PostgreSQL  
- **Frontend:** React + Vite, Styled Components, Fetch API  
- **Testes:** Pytest, Factory Boy  

---

## ✨ Funcionalidades
- Autenticação de usuários  
- Criação e exibição de posts  
- Curtidas e comentários  
- Sistema de seguir/deixar de seguir  
- Perfil com contadores e avatar  
- Modais de seguidores e seguidos  

---

## ⚙️ Como rodar

### 🧩 Backend
```bash
cd backend 
python -m venv env
env\Scripts\activate  # (Windows)
# ou source env/bin/activate (Linux/Mac)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

💻 Frontend
cd twitter-clone 
npm install
npm run dev


👨‍💻 Autor

 Felipe0l
[GitHub]( https://github.com/felipe0l)
