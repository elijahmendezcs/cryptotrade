# db.py
import psycopg2
import bcrypt

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="almeda_db",
    user="almeda_user",
    password="your_secure_password",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

def register_user(username, password):
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (%s, %s)",
            (username, hashed)
        )
        conn.commit()
        return "✅ User registered successfully."
    except psycopg2.errors.UniqueViolation:
        conn.rollback()
        return "⚠️ Username already exists."
    except Exception as e:
        conn.rollback()
        return f"❌ Error: {e}"

def login_user(username, password):
    cursor.execute("SELECT password_hash FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    if result and bcrypt.checkpw(password.encode(), result[0].encode()):
        return "✅ Login successful!"
    return "❌ Invalid username or password."

# ✅ Add this new function here:
def get_user_by_username(username):
    cursor.execute("SELECT username FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    return {"username": result[0]} if result else None
