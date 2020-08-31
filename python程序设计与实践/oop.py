# 面向对象
# 命令式编程
# 函数式编程
# 面向对象

# 类
# 所有的类所属方法（method），第一个参数都必须是self
class Cat:
    def __init__(self, color, legs): # 构造函数
        self.color = color # self.color是Cat $实例$ 的属性 (attribute)
        self.legs = legs # self.legs (attribute)

felix = Cat("Ginger", 4)
rover = Cat("dog-colored", 4)


class Duck:
    def __init__(self, name, color):
        self.name = name
        self.color = color
    def bark(self):
        print("Woof!")

fido = Duck("Fido", "brown")
print(fido.name)
fido.bark()


# $类$ 属性
class Sheep:
    legs = 4 ### 类属性
    def __init__(self, name, color):
        self.name = name
        self.color = color

lily = Sheep("Lily", "White")
print(lily.legs) # 通过实例访问类属性
print(Sheep.legs) # 通过类访问类属性

# AttributeError
class Rect:
    def __init__(self, width, height):
        self.width = width
        self.height = height

rect = Rect(7, 8)
try:
    print(rect.color) # 尝试访问不存在的属性（或method），产生一个AttributeError
except:
    pass



# 继承
# class B(A): # A称为superclass， B称为subclass
#    .....
class Animal:
    def __init__(self, name, color):
        self.name = name
        self.color = color

# 类Animal的构造函数，被类Bat和Elephant所继承
class Bat(Animal): # Animal是Bat的父类（superclass)，Bat是子类(subclass)
    def purr(self):
        print("Bat purrr..")

class Elephant(Animal):
    def xxx(self):
        print("Elepant xxxx")

bat = Bat("BBBat", "black")
elep = Elephant("EEElephant", "Grey")
bat.purr()
elep.xxx()


# 方法重置 method overriding
# 与C++的重置概念一样
# subclass和superclass中，存在一模一样的方法，
# 那么superclass中的方法会被掩盖
class Wolf:
    def __init__(self, name, color):
        self.name = name
        self.color = color

    def bark(self):
        print("This is Wolf")

class Dog(Wolf):
    def bark(self): ## 重置Wolf中的bark方法
        print("This is Dog")

husky = Dog("Max", "grey")
husky.bark()



# 多层继承
class A:
    def method(self):
        print("A")

class B(A):
    def another_method(self):
        print("B")

class C(B):
    def method(self):
        print("C")

c = C()
c.method()
b = B()
b.method()



class AA:
    def a(self):
        print(1)
    
class BB(AA):
    def a(self):
        print(2)

class CC(BB):
    def c(self):
        print(3)

cc = CC()
cc.a()



print("super()")
# super() 函数: 返回superclass “对象“
# 方法(method): 类的函数
# 实例化(instantiate)
class A(object):
    def spam(self):
        print(1)

class B(A):
    def spam(self):
        print(2)
        super().spam()

B().spam()




# Magic Methods
# dunder methods
# 类似于C++中的运算符
# int &operator + (int &rhs, int &lhs)

# __init__ 

# __add__: 重载 + 
class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector2D(self.x + other.x, self.y + other.y)

vec1 = Vector2D(0, 1)
vec2 = Vector2D(1, 0)
vec3 = vec1 + vec2
print("Vector2D: {} {}".format(vec3.x, vec3.y))


# 常见运算符
# __sub__, __mul__, __truediv__, __floordiv__, __mod__, 
# __pow__, __and__, __xor__, __or__ 类型相同操作数(operand)
# __rsub__, __rmul__ .... 类型不同的操作数(operator)
# reverse operator

class SpecialString:
    def __init__(self, cont):
        self.cont = cont

    def __truediv__(self, other):
        line = "=" * len(other.cont)
        return "\n".join([self.cont, line, other.cont])

    def __rtruediv__(self, other):
        return "_rtrue_"

spam = SpecialString("spam")
hello = SpecialString("Hello world!")
print(spam / hello)

helo = "heloo world!"
print(helo / spam) # helo中没有定义 / ，python查看到spam中定义了一个__rtruediv__




# 比较运算符
# __lt__: <
# __le__: <=
# __eq__: ==
# __ne__: != 如果没有实现，那么会返回__eq__运算结果的”反“
# __gt__: >
# __ge__: >=

class SpecialString:
    def __init__(self, cont):
        self.cont = cont

    def __truediv__(self, other):
        line = "=" * len(other.cont)
        return "\n".join([self.cont, line, other.cont])

    def __gt__(self, other):
        for index in range(len(other.cont)+1):
            result = other.cont[:index] + ">" + self.cont
            result += ">" + other.cont[index:]
            print(result)



spam = SpecialString("spam")
eggs = SpecialString("eggs")
spam > eggs


# __len__
# __getitem__: 下标运算符[]
# __setitem__: 
# __delitem__
# __iter__: 为对象增加可迭代能力(iterable)
# __contains__: in

import random
class VagueList:
    def __init__(self, cont):
        self.cont =cont

    def __getitem__(self, index):
        return self.cont[index + random.randint(-2, 2)]

    def __setitem__(self, index, value):
        print("setitems")

    def __len__(self):
        return random.randint(0, len(self.cont)*2)

vaguelist = VagueList(["A", "B", "C", "D", "E"])
print(len(vaguelist))
print(len(vaguelist))
print(vaguelist[2])
print(vaguelist[2])


# x[y] = z 调用 x.__setitem__(y, z)


# 对象的生命周期
# 创建， 操作， 销毁
# 分配资源-》初始化——》操作-》销毁
# __new__ -> __init__ -> ... -> __del__

a = 42      # 创建一个对象<42>， a是对象<42>的使用者
b = a       # b也成为对象<42>的使用者
c = [a]     # c也是对象<42>的使用者
del a       # 对象<42>的使用者为 b, c
b = 100     # 对象<42>的使用者为 c
c[0] = -1   # 对象<42>没有使用者，此时对象<42>交回系统



# 数据隐藏 Data Hiding
# python的数据隐藏，仅仅是个”符号“， 也就是仅仅起到 提示 的作用
# 提示使用者，不要轻易地的使用这些数据

# 弱隐藏
# 以下划线_开头的变量
# 不能被from ... import ...所导入
class Queue:
    def __init__(self, contents):
        self._hiddenlist = list(contents) ####弱隐藏数据 _hiddenlist

    def push(self, value):
        self._hiddenlist.insert(0, value)

    def pop(self):
        return self._hiddenlist.pop(-1)

    def __repr__(self): # 序列化对象
        return "Queue({})".format(self._hiddenlist)

queue = Queue([1, 2, 3])
print(queue) ##  print自动调用queue的__repr__函数
queue.push(0)
print(queue)
queue.pop()
print(queue)
print(queue._hiddenlist)



# 强隐藏
# 以双下划线开头 __
# 不能被使用者 直接使用
# 如果要使用，需要更改数据名称为：_classname__hiddendata

class Spam:
    __egg = 7 ## 强隐藏
    def print_egg(self):
        print(self.__egg)

s = Spam()
s.print_egg()
print(s._Spam__egg) #_classname__hiddendata
try:
    print(s.__egg) # 错误，无法直接访问强隐藏数据
except:
    pass



# 类方法
# classmethod装饰器
# 第一个参数必须是cls
print("======================")
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height
    
    @classmethod
    def new_square(cls, side_length): ##第一个参数必须是cls
        return cls(side_length, side_length)

square = Rectangle.new_square(5)
print(square.area())


# 静态方法 @staticmethod
# 可以简单理解为 寄居在类中的一个普通函数
# 理解方式与C++中的静态成员一致
# 调用的方式 classname.function

class Pizza(object):
    def __init__(self, toppings):
        self.toppings = toppings

    @staticmethod
    def validate_topping(topping):
        if topping == "pineapple":
            raise ValueError("No pineapple")
        else:
            return True

ingredients = ["cheese", "onions", "spam"]
if all(Pizza.validate_topping(i) for i in ingredients): # classname.function
    pizza = Pizza(ingredients)



# 属性装饰器
# @property
# 将一个方法改造为对象的属性，但不能改写

print("@property")
class Pizza(object):
    def __init__(self, toppings):
        self.toppings = toppings
        # self.pineapple_allowed = False

    @property
    def pineapple_allowed(self):
        return False


pizza = Pizza(["cheese", "tomato"])
print(pizza.pineapple_allowed)
try:
    pizza.pineapple_allowed = True # 错误，因为pineapple不是对象的属性(attribute)
except:
    pass


print("@property setter")
class Pizza(object):
    def __init__(self, toppings):
        self.toppings = toppings
        self._pineapple_allowed = False

    @property
    def pineapple_allowed(self):
        return self._pineapple_allowed

    @pineapple_allowed.setter # 赋值器
    def pineapple_allowed(self, value):
        self._pineapple_allowed = value


pizza = Pizza(["cheese", "tomato"])
print(pizza.pineapple_allowed)
pizza.pineapple_allowed = True # 定义赋值器后，可以直接赋值
print(pizza.pineapple_allowed)



class Goblin():
    def __init__(self, name):
        self.name = "goblin"
        self.health = 3
        self._desc = "A foul creature"
    
    @property
    def desc(self):
        if self.health >= 3:
            return self._desc
        elif self.health == 2:
            health_line = "It has a wound on its knee."
        elif self.health == 1:
            health_line = "Its left arm has been cut off!"
        elif self.health <= 0:
            health_line = "It is dead."
        return self._desc + "\n" + health_line

