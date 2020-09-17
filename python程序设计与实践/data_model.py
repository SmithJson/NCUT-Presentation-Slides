# python中的对象模型
# 一个对象，通常有三个部分组成：
# 1. identity： 对象的identity一旦分配，在生命周期内不再改变
# 2. type：对象类型，对象的类型不能更改
# 3. value：对象的值

# is 操作符: 比较两个操作数的identity是否相同
# id()函数： 返回对象的identity(未必就是python内部真实的编码)

# 对象的type决定了对象所支持的操作
# type()函数返回对象的类型

# mutable, immutable
# mutable: 对象的值可以被修改
# immutable： 对象的值不能被修改

 
# type影响对象的几乎所有的行为（affects almost all aspects of object behavior）
# immutable的对象可能被重复使用
a = "Hello_world!"
b = "Hello" + "_" + "world!"
print( a is b)

# mutable的对象是不能被重复使用的
c = []
d = []
print(c is d)


# Garbage-collection
# Python中的对象，不能被显示销毁(explicitly destroy)
# 无法访问的资源（包括数据和函数），系统都会启用garbage collection
# 上述特性依赖于python的实现



# 容器 
# [] () {} 
# 容器的mutable或immutable可以类比于C语言
#   immutable容器：常指针数组
#   mutable容器：指针数据

e = [12, ["a"], ([5])] # 可以理解为指针数组
e[0] = 1


h = [7]
f = (h, "Hello") # 可以理解为常指针数组
print(f)
h[0] = 9
print(f)


def add_five(L=[]):
    L.append("5")
    return L

print(add_five(), add_five())# 不是["5"] ["5", "5"]
