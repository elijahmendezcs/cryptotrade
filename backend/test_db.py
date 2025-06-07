# main.py (or test_db.py)
from db import register_user, login_user

print(register_user("jd_ojeda", "secure123"))
print(login_user("jd_ojeda", "secure123"))   # ✅ Should succeed
print(login_user("jd_ojeda", "wrongpass"))   # ❌ Should fail
