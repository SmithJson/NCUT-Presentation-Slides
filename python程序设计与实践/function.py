# DRY: Don't Repeat Yourself
# WET: Write Everything TWice !!! BAD !!!

print("Hello, world!")

# 定义函数
# def 
def my_func(): # : 不能少
    print("spam")
    print("eggs")

my_func()

# 函数使用前，必须完成定义。
# 类似于变量需要赋值才能使用

# hello()

# def hello():  
#    print("Hello, world!")

# 参数
def print_with_exlamation(word):
    print(word + "!")

print_with_exlamation("Hello")
print_with_exlamation("eggs")


def print_sum_twice(x, y):
    print(x + y)
    print(x + y)

print_sum_twice(5, 8)


# argument is local
def func(var):
    var += 1
    print(var)

func(7)
# print(var) # Error! 


# return 语句
# 只能在定义函数中使用
def max(x, y):
    if x >= y:
        return x
    else:
        return y

print(max(4, 7))


def add_numbers(x, y):
    total = x + y
    return total
    print("This won't be printed")

print(add_numbers(9, 6))


# 函数的说明文档
# """""" 紧接着函数定义语句之后

def shout(word):
    """
    print a word with an exclamation
    mark following it
    """
    print(word + "!")

shout("spam")


# 函数可以作为对象使用（functions as objects）
# 函数可以赋值给变量

def multiply(x, y):
    return x * y

a = 4
b = 7
operation = multiply
print(operation(a, b))



def shout2(word):
    return word + "!"

speak = shout2
output = speak("shout")
print(output)


# 函数当参数使用

def add(x, y):
    return x + y

def do_twice(func, x, y):
    return func(func(x,y), func(x, y))

a = 5
b = 10
print(do_twice(add, a, b))
print(do_twice(multiply, a, b))



# module模块
# 类似于C语言中的头文件

import random ## 导入random模块
for i in range(5):
    value = random.randint(1, 6)
    print(value)

import math
num = 10
print(math.sqrt(num))

# 导入模块中的部分对象或变量
# from module_name import var
from math import pi
print(pi)

from math import pi, sqrt # 同时导入两个
print(sqrt(pi))

# from math import * # 强烈不建议！！！可能导致名字污染（name pollution)

# 如果导入的模块不存在，那么会抛出ModuleNotFoundError异常
# import module_name 

# 导入变量重命名
from math import sqrt as square_root 
# square_root = sqrt
print(square_root(100))
# print(sqrt(100)) # 错误，sqrt已经重命名




# 练习题

# 1.填空
__ min(x, y):
    if x <= y_
        return x
    else:
        ______ y


# 2. 代码行排序
res = 0
for i in range(x):
def sum(x)
return res
res += i


# 3. 选择
from random import randint as rnd_int
1. random.rnd_int
2. rnd_int
3. randint


# 4. 执行结果
def print_nums(x):
    for i in range(x):
        print(i)
        return
print_nums(10)


# 5. 执行结果
def func(x):
    res = 0
    for i in range(x):
        res += i
    return res

print(func(4))
