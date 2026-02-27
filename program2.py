
def calculate_total(price, tax, /,  discount):
    total = price + (price * tax) - discount
    return total

print(calculate_total(100, 0.12, 10)) # Correct
# print(calculate_total(price=100, tax=0.12, discount=10)) # Incorrect


def create_account(username, password, *, is_admin):
    print("Account Created:")
    print("Username:", username)
    print("Password:", password)
    print("Admin Access:", is_admin)
#
create_account("santiago", "mypassword123", is_admin=True)

def order_summary(*args, **kwargs):
    print("Order Summary")

    # products
    print("\nProducts Ordered:")
    if args:
        for product in args:
            print("-", product)
    else:
        print("No products ordered.")

    # Costumer details
    print("\nCustomer Details:")
    if kwargs:
        for key, value in kwargs.items():
            print(f"{key}: {value}")
    else:
        print("No customer details provided.")

order_summary("Book", "Pen")
order_summary(name="Maria", payment="Cash")




counter = 0

#Local
def my_local():
    x = 500
    print(x)
my_local

#nonlocal
def outer():
    counter = 10  # Local variable inside outer()
    
    def inner():
        nonlocal counter   # Refers to outer() counter
        counter += 5
        return counter
    
    result = inner()
    print("Inner modified outer counter:", result)
    
    return result

outer()

#Global
def modify_global():
    global counter   
    counter += 20
    return counter
modify_global()

print("The global counter right now is:", counter)



