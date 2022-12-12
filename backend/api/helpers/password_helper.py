import random
import string
import secrets


class PasswordHelper:
    def generate_password():
        uppercase_loc = random.randint(1, 4)
        symbol_loc = random.randint(5, 6)
        lowercase_loc = random.randint(7, 12)
        password = ""

        pool = string.ascii_letters + string.punctuation

        for i in range(12):
            if i == uppercase_loc:
                password += secrets.choice(string.ascii_uppercase)
            elif i == lowercase_loc:
                password += secrets.choice(string.ascii_lowercase)
            elif i == symbol_loc:
                password += secrets.choice(string.punctuation)
            else:
                password += secrets.choice(pool)

        return password
