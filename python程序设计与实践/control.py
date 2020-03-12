# 布尔类型， 两个常量True和False
# built-in 
my_boolean = True
print(my_boolean)

# 比较运算符 ==， !=, >, <, >=, <=
print(2 == 3) # ==  判断是否相等
print(2 != 3) # != 
print("hello" == "Hello") # 按照字母表序，逐一比较

print(2 > 3) # False
print(10 < 15)

print(7 >= 7.0) # True

# print("aBc"  "abc")



# if 语句的使用形式
# if expression:
#     statements # 执行statements，如果expression执行结果为True
# note: 冒号， 缩进(具体形式取决于所使用的编辑器，4个空格，2个空格，1个tab)

if 10 < 5:
    print("10 is greater than 5")
    print("Program ended")

spam = 7
if spam > 5:
    print('five')
if spam > 8:
    print('eight')

# 控制嵌套，条件判断语句中套其他的条件判断语句
# 请注意嵌套时的缩进！！
num = 12
if num > 5:
    print("Bigger than 5")
    if num <= 47:
        print("Between 5 and 47")
        if num == 20: # { 类似于C语言的大括号
            print("It is 20")
        #}


# else 后面也是要有冒号 :
x = 4
if x == 5:
    print("Yes")
else:
    print("No")

if 1 + 1 == 2:
    if 2 * 2 == 8:
        print("if")
    else:
        print("else")


num = 7
if num == 5:
    print("Number is 5")
else:
    if num == 11:
        print("Number is 11")
    else:
        if num == 7:
            print("Number is 7")

        else:
            print("Number is not 5, 11 or 7")

# elif 类似于C语言中的else if
# if... else... 或 if ... elif.. else...
num = 7
if num == 5:
    print("Number is 5")
elif num == 11: # else if
    print("Number is 11")
elif num == 7:
    print("Number is 7")
else:
    print("Number is not 5, 11 or 7")


# 布尔运算符 
# and, or, not 与或非 （C语言中的&& || ！）
print(1 == 1 and 2 == 2)
print(1 != 1 and 2 == 2)
print(2 < 1 and 3 > 6)

if (1 == 1) and (2 + 2 > 3):
    print("true")
else:
    print("else")

# or
print(1 == 1 or 2 == 2)
print(1 != 1 or 2 == 2)

# not
print(not 1 == 1)
print(not 1 > 7)

if not True:
    print("1")
elif (not ((1 + 1) == 3)):
    print("2")
else:
    print("3")


# 运算符的优先次序
# 与C语言完全相同
# 如果优先次序没有把握，请使用括号！！！

x = 4
y = 2
if not 1 + 1 == y or x == 4 and 7 == 8: 
# if not (1 + 1 == y) or (x == 4) and (7 == 8)
    print("Yes")
elif x > y:
    print("No")


# while 循环
# 语义与C语言相同
i = 1
while i <= 5:
    print(i)
    i += 1
print("Finished")

#while True:
#    print("in the loop") # Ctrl-C 强行终止

# break
# 只能在循环语句中使用
i = 1
while i <= 5:
    print(i)
    i += 1
    if i == 2:
        print("break here")
        break
print("break Finished")


# continue
# 只能在循环语句中使用
i = 0
while True:
    i += 1
    if i == 2:
        print("skipping 2")
        continue
    if i == 5:
        print("Breaking")
        break
    print(i)
print("continue finished")


# List类型
words = ["Hello", "world", "!"]
print(words[0]) # access first element访问第一个元素
print(words[1])
print(words[2])


# list可以为空
empty_list = []
print(empty_list)

# list最后一个元素后，可以接上逗号 ,
l = ['a'] # 等价于 l = ['a', ]
print(l)

# list中可以存放不同类型的数据
number = 3
things = ['string', 0, [1, 2, number], 4.56]
print(things[1])
print(things[2])
print(things[2][2])



# string 可以作为一个 常列表
string = "Hello world"
print(string[6])
# string[6] = "!" 错误


# list 操作
nums = [7, 7, 7, 7]
nums[2] = 5 #
print(nums)

# 链接和复制
nums = [1, 2, 3]
print(nums + [4, 5, 6])
print(nums * 3)

# in 运算
words = ["spam", "eggs", "spam", "sausage"]
print("spam" in words)
print("tomato" in words)
# not in
print("tomato" not in words)
print(not "tomato" in words) # 210行， 211行等价

# in 用于判断一个字串是否为另一字串的子字串
print("hello" in "hello worlds!")

# append, len, insert, index, max, min, count, remove, reverse
words.append("tomato") # 后尾追加
print(words)

print(len(words)) # list的长度

words.insert(2, "potato") # 插入“potato”到words中的第二个元素的位置
print(words)


# list index
letters = ['p', 'q', 'r', 's', 'q']
print(letters.index('r')) # 查找‘r'第一次出现的位置
print(letters.index('q')) # 查找‘q'第一次出现的位置 
# print(letters.index('z')) # 如果查找的元素不在列表当中，那么抛出ValueError异常


print(letters.count('q')) # 'q'在列表当中出现的次数

letters.remove('q')
print(letters) # 移除第一个'q'

letters.reverse()
print(letters) # 



# range function
# 创建一个数字序列！！
# range(start=0, end, step=1) 
# 生成的序列为 start, start + step, start + step + step, ..., <end(小于end)

numbers = list(range(10)) # 0, 1, 2, 3, 4, 5, ..., 9
print(numbers)


numbers = list(range(3, 8)) # start = 3, end = 8, step = 1
print(numbers)

print(range(20) == range(0, 20, 1))

numbers = list(range(5, 20, 2))
print(numbers)


# for 循环
# 枚举一个集合（不是集合类型变量）内的所有量

# 使用while
words = ["spam", "eggs", "spam", "sausage"]
counter = 0
max_index = len(words) - 1
while counter <= max_index:
    word = words[counter]
    print(word + "!")
    counter += 1


# 等价的for
words = ["spam", "eggs", "spam", "sausage"]
for word in words:
    print(word + "!")


# 使用range
words = ["spam", "eggs", "spam", "sausage"]
for i in range(len(words)):
    print(words[i] + "!")




# Python Operator Precedence
# Precedence Order
# When Two operators share an operand, 
# the operator with the higher precedence goes first

a = 1
b = 2
c = 3
a + b * c == a + (b * c)

# Associativity
# When two operators share an operand and the operators have the same precedence
# then the expression is evaluated 
# according to the associavitity of the operators

# ** right to left 
a ** b ** c == a ** (b ** c)
# / left to right
a / b / c == (a / b) / c

# Order of Evaluation
# Left operand is always evaluated before the right operand.
# Short Circuiting: and, or

True or False and False == True or (False and False)

