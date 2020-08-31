# Functional Programming

# 高阶函数
# 能够使用其他函数作为参数的函数
# 也就是，该函数的参数列表可以接受函数作为参数

def apply_twice(func, arg): # func是个函数, 因此，我们称apply_twice为高阶函数
    return func(func(arg))

def add_five(x):
    return x + 5

print(apply_twice(add_five, 10))


def test(func, arg):
    return func(func(arg))

def mult(x):
    return x * x

print(test(mult, 2)) # print(mult(mutl, 2))
print(test(add_five, 16)) 





# 纯函数
# 函数返回值，只依赖函数参数。
# 更具体地，函数执行，不依赖外部变量，仅仅依赖函数参数
# 
def pure_func(x, y):
    return x * 2 + y



# impure example
some_list = []
def impure(arg):
    some_list.append(arg)
    return some_list




# lambda函数，或者 匿名函数
# 没有具体函数形式的函数
# lambda x1, x2, ...: 语句

def my_func(f, arg):
    return f(arg)

print(my_func(add_five, 17))
# 用lambda函数的等价形式
print(my_func(lambda x: x + 5, 17))


def polynomial(x):
    return x ** 2 + 5 * x + 4

print(polynomial(-4))
print((lambda x: x ** 2 + 5 * x + 4)(-4)) # 函数polynormial的等价形式


# 间接地给匿名函数一个名字
double = lambda x: x * 2
print(double(2))


triple = lambda x: x * 3
add = lambda x, y: x + y
print(add(triple(3), 4))



# map, filter函数
# map(function, list) 将function应用于list中的每一个元素
# 也可以使用tuple, set
# map和filter函数都可以被for语句块取代，但是 map和filter效率更好、含义更清晰
nums = [11, 22, 33, 44, 55]
result = list(map(add_five, nums)) # nums中的每个元素加5, 显示转换为list类型
print(result)

result = list(filter(lambda x: x % 2 == 0, nums)) # nums中符合条件（偶数）的元素
print(result)





# Generator(生成器)
# 生成器可以使用在for语句中，但是它不能被索引，不能随机访问其中的元素
# 函数中，使用yield返回生成的对象
# 不是一次性生成整个序列

def countdown():
    i = 5
    while i > 0:
        yield i   # 与return的用法相近
        i -= 1

for i in countdown():
    print(i)


def infinite_sevens():
    while True:
        yield 7

# for i in infinite_sevens():
#     print(i)



def numbers(x):
    for i in range(x):
        if i % 2 == 0:
            yield i

print(list(numbers(11))) # 完成整个序列的生成，然后使用



# 装饰器 Decorator
# 是一个返回函数的函数，它的主要目的是为了扩展原函数的功能

def decor(func):
    def wrap():
        print("============")
        func()
        print("============")
    return wrap

def print_text():
    print("Hello world!")

decorated = decor(print_text)
decorated()

print_text = decor(print_text)
print_text()

#### 最为常用的方式
@decor ## 等价于print_text2 = decor(print_text2)
def print_text2():
    print("Hell world!")

print_text2()




# 递归
def factorial(n):
    if n == 1: ## base case
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))


# 间接递归
def is_even(x):
    if x == 0:
        return True
    else:
        return is_odd(x - 1)

def is_odd(x):
    return not is_even(x - 1)




# Set
# 集合
# {}
# 注意，Set类型使用{}和字典类型相同; 创建空集合，必须使用{}
num_set = {1, 2, 3, 4, 5}
word_set = set(["spam", "eggs", "sausage"])
print(3 in num_set)
print("spam" not in word_set)

# 不索引其中的元素
# 不存在重复元素
# add(): 添加元素
# remove(): 移除元素
nums = {1, 2, 3, 4, 1, 3, 4, 5, 6}
print(nums)
nums.add(-7)
print(nums)
nums.remove(3)
print(nums)

# Set相关的运算
# 交 &, 并 |, 差 -, 对称差 ^
print("set operators")
nums1 = {1, 2, 3, 4}
nums2 = {1, 3, 4, 5, 6}
print(nums1 & nums2)
print(nums1 | nums2)
print(nums1 - nums2)
print(nums1 ^ nums2)




# itertools
print("itertools")
from itertools import count, cycle, repeat
for i in count(3): # 从3开始计数
    print(i)
    if i == 7:
        break

# for i in cycle("abcd"):
#     print(i)

for i in repeat(10, 3): # 重复3次10, 10 10 10
    print(i)

# repeat(obj, times=None) 
# 生成一个含有times个obj的序列，如果没有给的times，那么一个无穷长序列
print(list(map(pow, range(10), repeat(2))))
# [0, 1, 2, ..., 9], [2, 2, 2, ..., 2, ...]

from itertools import accumulate, takewhile
nums = list(accumulate(range(8)))
print(nums)
print(list(takewhile(lambda x: x <= 6, nums))) # takewhile的第一个参数是一个判断元素是否符合条件的函数


from itertools import product, permutations
letters = ("A", "B", "C")
print(list(product(letters, range(2)))) # ("A", "B") (0, 1)
print(list(permutations(letters)))