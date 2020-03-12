print("Hello, world!")

# 基础运算符
# + - * / 
print(2 + 2)
print(5 + (3 - 4))
print(2 * (3 - 5))
print(10 / 2) # 5.0 ? 5 ? or ....
print(10 / 3) # 与C语言区别最大的地方

# print( 2 / 0) # error! 抛出零除异常

# floor division 地板除
print(10 // 3) # 与C语言的 / 结果相同

# modulo 模运算 %
# 求余数
print( 7 % 5) 
print(1.25 % 0.5) # 与C语言不同


# 幂运算 **
print("幂运算")
print(2 ** 5)
print(9 ** 0.5)
print(9 ** (1 / 2)) # 使用括号改变运算次序
print('')


# += -= *= /= ....
x = 3
x += 5 # 等价于 x = x + 5
print(x)
# *= 等运算符也是类似的

# 浮点类型
# 1. 直接定义； 2. 整数除法；3. 浮点数之间的数值运算
print(3.1415926) # 1
print(3 / 2) # 2
print( 3.1 * 2.5) # 3

print(6 * 7.0) # 这个是例外！大多数情况下，我们需要显式地转换类型。不要依赖
               # implicit conversion


# 字串 string
# 字串定义三种方式：1.' ' ; 2. " "; 3. """ """

print('Hello, w\'orld!') # 中间不能使用 '
print("Hello, wor\"ld!") # 中间不能使用 "
print("Hello, \nworld!")
print("""Hello, 
            world!""") # 通常用于块注释



# 简单输入 input
# print(input("Enter something please: "))

# 字符串连接
print("2" + "3")
# 字符串复制
print("6" * 8)
# 字符串的强制转换
print(int("2") + int("3"))
print("6" * int(input("Tell me how many 6s: ")))


# 变量
# 变量自身没有类型，可以反复、多次地用于保存不同类型的数据
# 但是，不推荐这样用
x = 7
print(x)
print(x + 3)

spam = "eggs"
print(spam * 3) # spamspamspam? eggseggseggs?

x = spam
print(x)

# 变量命名规则与c语言相同
a_variable_name = "foo" # correct
# a-variable # error
print(a_variable_name)
# 去除变量
del a_variable_name
print(a_variable_name)



# 课后练习
# 第一题
spam = '7'
spam += "0"
eggs = int(spam) + 3
print(float(eggs))

# 第二题
word = input("Enter a word: ")
print(word + ' shop')


# 第三题
x = 5
y = x + 3
y = int(str(y) + "2")
print(y)


# 第四题
x = 4
x += 5
print(str(x) + "7")


# 第五题
x = 3
num = 17
print(num % x)
