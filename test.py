

class A:

    def abc(self):
        return "ab"
    
    @classmethod
    def b(cls):
        return "classmethod"
    
b = A()

A.b()

print(b.abc())