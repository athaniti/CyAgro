#!/usr/bin/env python3
"""
Script για να γεννήσει pbkdf2_sha256 hashes για passwords
"""
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# Password που θέλουμε να hash-άρουμε
password = "secret"

# Γεννάμε το hash
hashed = pwd_context.hash(password)

print(f"Password: {password}")
print(f"Hashed: {hashed}")

# Δημιουργούμε SQL για update
users = [
    'petros.iakovou',
    'maria.georgiou', 
    'andreas.papadopoulos',
    'eleni.konstantinou',
    'inspector1',
    'admin1'
]

print("\n-- SQL Updates:")
for username in users:
    print(f"UPDATE users SET password_hash = '{hashed}' WHERE username = '{username}';")