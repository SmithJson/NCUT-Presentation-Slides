try:
    num1 = 7
    num2 = 0
    print(num1 / num2)
except:
    print("Error raised!")

# 常见异常类型
# ImportError (ModuleNotFoundError): 导入模块异常
# IndexError: 访问列表或元组时，下标越界
# NameError: 访问未定义的变量
# SyntaxError: 语法错误
# TypeError: 调用函数时，使用错误类型的变量
# ValueError: 调用函数时，使用错误的值

# www.python.org

# try / except
# 首先逐行执行try程序块中的语句，如果错误发生，则终止执行，
# 并判断错误类型是否与except中的错误类型一致，如果一致，则执行except程序块。

try:
    num1 = 7
    num2 = 0
    print(num1 / num2)
    print("Done calculation")
except ZeroDivisionError:
    print("Zero Division Error Raised!")


try:
    variable = 10
    print(variable / 2)
except ZeroDivisionError:
    print("Variable Zero divided!")
print("Finished!")


# 捕捉多异常
try:
    variable = 10
    print(variable + "hello") ##
    print(variable / 2)
except ZeroDivisionError:
    print("Divided by Zero!")
except (ValueError, TypeError):
    print("Error occurred")

# 捕捉所有的异常
try:
    try:
        word = "spam"
        print(word / 0)
    except: # 所有的错误类型
        print("An error occurred")
        raise # 再次抛出刚刚的发生的错误类型
except:
    pass


# try / except / finally
# try / finally
# finally是最终执行的程序块，无论错误是否发生(或处理)
try:
    print("Hello")
    print(1 / 0)
except ZeroDivisionError:
    print("Divided by Zero!")
finally:
    print("This code will run whatever")

try:
    try:
        print("Hello")
        print(1 / 0)
    except ZeroDivisionError:
        print(unknown_var) # NameError
    finally:
        print("Error occurred, but this code will run whatever")
except:
    pass



# 产生异常 raise exceptions
# print(1)
# raise ValueError
# print(2)

try:
    try:
        print(1 / 0)
    except ZeroDivisionError:
        raise ValueError
except:
    pass

# 产生异常的同时，附带说明字串
try:
    name = "123"
    raise NameError("Invalid name")
except:
    pass



# 断言
# assertion
# __debug__时才起作用
# assert expression
# 如果expression执行结果为False, 那么抛出异常AssertionError
try:
    print(1)
    assert 2 + 2 == 4
    print(2)
    assert 1 + 1 == 3
    print(3)
except AssertionError:
    print("Assertion Failed")


# assert (expression), description
# 附带说明字串
try:
    temp = -10
    assert (temp >= 0), "Colder than zero"
except:
    pass





# 打开/关闭文档
# open(filename, "w|r|wb|rb|r+") 
# # w: 写；r: 读；wb: 写二进制；rb: 读二进制；r+: 读写
my_file = open("file.txt", "r")
print("my_file here")
my_file.close()


# 读取 file.read()
my_file = open("file.txt", "r")
content = my_file.read() # 读取到底（从头到尾）
print(content)
my_file.close()

print("Read bytes")
my_file = open("file.txt", "r")
content = my_file.read(16) # 读取16个字节
print(content)
print(my_file.read(4)) # 再读取4个字节
print(my_file.read()) # 再读取到底
print(my_file.read()) # 读取到底文件，返回空字串
my_file.close()



# 读取内容，返回一个包含所有行作为元素的列表
my_file = open("file.txt", "r")
print(my_file.readlines())
my_file.close()

my_file = open("file.txt", "r")
for line in my_file:
    print(line)
my_file.close()



# 写文档
# write
my_file = open("file.txt", "w") # 写模式打开文件，文件内容首先会被抹去
my_file.close()

print("read again")
my_file = open("file.txt", "r") 
print(my_file.read())
my_file.close()


my_file = open("file.txt", "w") # 写模式打开文件，文件内容首先会被抹去
my_file.write("This is a naive writing")
my_file.close()


# 确保文件关闭的方法
# 1. try finally
try:
    f = open("file.txt") # 假设被正常打开
    print(f.read())
finally:
    f.close() # 文件一定会关闭

# 2. with as 
with open("file.txt") as f: #更为常见
    print(f.read())
