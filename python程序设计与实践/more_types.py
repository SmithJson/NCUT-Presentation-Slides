# None 特殊常量
# 用法上类似于C语言的null
# 代表“空”：0, [], '', False
# 如果函数没有显式地return语句，那么默认的就是return None

def some_func():
    print("Hi")
    # return None

var = some_func()
print(var)



# Dictionary
# {pair0, pair1, ... }
# pair的形式 key: value
# 扩展开 {key0: value0, key1: value1, ...}
# 注意：key只能是不可修改的类型变量 Immutable objects
# 目前为止，遇到的mutable object只有List和Dictionary


ages = {"Dave": 24, "Mary": 42, "John": 58}
print(ages["Dave"]) # 获得key所对应的值
try:
    print(ages["ABC"]) # Key不存在，KeyError
except:
    pass


# mutable object as key will raise error
try:
    bad_dict = {[1, 2, 3]: "one two three"}
except:
    pass


# 修改dictionary变量
squares = {1: 1, 2: 4, 3: 9, 4: 16, 5: 23}
squares[5] = 25
print(squares)
squares[6] = 36
print(squares)

primes = {1: 2, 2: 3, 4: 7, 7: 17}
print(primes[primes[4]])


# in or not in
# 判断一个key是否存在于当前dictionary object的key中
nums = {1: "one", 2: "two", 3: "three"}
print(1 in nums)
print("three" in nums) # False, but True if nums["three"] = 3
print(4 not in nums)


# dict.get(key, default=None)
# 如果key存在于dict的key中， 则返回对应的value；否则，返回default

pairs = {1: "apple", "orange": [2, 3, 4], True: False, None: "True"}
print(pairs.get("orange"))
print(pairs.get(7))
print(pairs.get(123, "not in this dictionary"))


fib = {1: 1, 2: 1, 3: 2, 4: 3}
print(fib.get(4, 0) + fib.get(7, 5))




# Tuples
# 可以简单地认为是一个Immutable List
# 任何尝试修改tuple的行为，都会触发TypeError

words = ("spam", "eggs", "sausage", )
print(words[0])
try:
    words[1] = "cheese" # TypeError
except:
    pass

# 三个不同类型的对比
list = ["one", "two"]
dict = {1: "one", 2: "two"}
tp = ("one", "two", )

# （）可以不省略，当存在逗号分隔符时
my_tuple = "one", "two", "three",
print(my_tuple[0])

# 当创建空tuple时，必须使用 ()
empty_tuple = ()




# Slice切片
# [start=0: end=len(list): step=1]
# 从start开始，以step作为增量的，不包含end的一个子列表
# [list[start], list[start + step], list[start + step + step],...,
#  list[start + n * step]] 要求start + n * step < end, n为自然数

squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(squares[2: 6]) #
print(squares[0: 1])

print(squares[: 7]) # [0: 7]
print(squares[:]) # [0: 10]
print(squares[7:]) # [7: 10]
print(squares[::2]) # [0: 10: 2]

# 负数也可以使用在切片当中
#
print(squares[-1]) # 倒数第一个元素，也就是squares[9]
print(squares[-2]) # 倒数第二元素，也就是squares[8]
print(squares[0: -5])
print(squares[3: -5]) # 从第三个元素到倒数第五个元素(不包含)
print(squares[7: -5]) # []
print(squares[8: -5: -1]) # 倒回
print(squares[: : -1]) # reverse squares

print(squares[7: 5: -1])


# List comprehensions
# 快速创建列表的方法，可以类比于数学中的公式的约束方法
cubes = [i ** 3 for i in range(5)] # i的三次方，i属于[0, 5)的自然数
nums = [i * 2 for i in range(10)]

# 通过使用if语句，增加额外限定条件
evens = [i ** 2 for i in range(10) if i**2 % 2 == 0]
print([i for i in range(20) if i % 3 == 0]) # i大于等于0，小于20，i是3的倍数

# 创建过大的列表，会引发MemoryError
# even = [2 * i for i in range(10 ** 100000)]



# string format
# 与c语言的格式化输出接近
# printf("%d %s %p")

nums = [4, 5, 6]
msg = "Numbers: {0} {1} {2}".format(nums[1], nums[2], nums[0])
print(msg)

print("{0}{1}{0}".format("spam", "eggs"))

# 使用变量名
print("{x} {y}".format(x = 5, y = 12))

# join
",".join(["spam", "eggs", "ham"]) # 使用,来链接list用的元素
# replace
"Hello ME".replace("ME", "world!") # 使用world替换ME
# startswith
"This is a apple".startswith("This") # 判断是否是“This”开头, True if it is
# endswith
"This is a apple".endswith("apple") # 判断是否是“apple”结尾, True if it is
# split
"spam, eggs, ham".split(",") # 以,为识别标志，拆分字串 ["spam", "eggs", "ham"]




# all 或 any
# 返回True，如果所有（all）的或任意一个（any）元素满足条件

nums = [55, 44, 33, 22, 11]
if all([i > 5 for i in nums]): # 判断nums中的元素是否都大于5
    print("All numbers are larger than 5")

if any([i % 2 == 0 for i in nums]): # 判断nums中是否存在偶数
    print("At least one is even")