//实验二  语法分析

//  算术表达式->项|算术表达式+项|算术表达式-项
//  项->因子|项*因子|项/因子
//  因子->变量|常数|(算术表达式)
//
//          算符优先关系表
//----------------------------------
//     +   -   *   /   (   )   i   #
// +   >   >   <   <   <   >   <   >
// -   >   >   <   <   <   >   <   >
// *   >   >   >   >   <   >   <   >
// /   >   >   >   >   <   >   <   >
// (   <   <   <   <   <   =   <   ?
// )   >   >   >   >   ?   >   ?   >
// i   >   >   >   >   ?   >   ?   >
// #   <   <   <   <   <   ?   <   =
//----------------------------------

#include <iostream>
#include <cstdio>
#include <string.h>
#include <string>
#include <iomanip>

using namespace std;
#define N 100
#define NULL 0
FILE *fp;//预处理文件指针
//定义符号栈的大小与输入字符串的大小以及算术表达式字符串的大小
char stack[N],strings[N],oldstrings[N];
char a;
int top=-1,k=0,step=1,n=0,No[N],id=1;
//二维数组定义字符之间的优先关系(1表示>,-1表示<,0表示=,-2表示错误)
int M[N][N]={{1,1,-1,-1,-1,1,-1,1},{1,1,-1,-1,-1,1,-1,1},{1,1,1,1,-1,1,-1,1},{1,1,1,1,-1,1,-1,1},
             {-1,-1,-1,-1,-1,0,-1,-2},{1,1,1,1,-2,1,-2,1},{1,1,1,1,-2,1,-2,1},{-1,-1,-1,-1,-1,-2,-1,0}};
char *word[6]={"N+N","N-N","N*N","N/N",")N(","i"};//可归约字符串

//////////////////////////////////////////////////////////////////////////////////////////

int print(int t,int m)
{
    cout<<"\n "<<step++<<setw(10);
    cout<<stack<<setw(10);
    if(m==1)
        cout<<">"<<setw(8);
    else if(m==0)
        cout<<"="<<setw(8);
    else
        cout<<"<"<<setw(8);
    cout<<a<<setw(10);
    cout<<&strings[k]<<setw(10);
    if(t)
	{
        cout<<"归约"<<setw(8);
        No[n++]=step-1;
	}
    else
        cout<<"移进"<<setw(8);
    return 0;
}

//////////////////////////////////////////////////////////////////////////////////////////

void push(char ch)
{
    stack[++top]=ch;
}

//////////////////////////////////////////////////////////////////////////////////////////

char pop()
{
	char a;
	a=stack[top--];
	stack[top+1]='\0';
    return a;
}

//////////////////////////////////////////////////////////////////////////////////////////

int ch_di(char ch)
{
    switch(ch)
	{
        case'+':
            return 1;
        case'-':
            return 2;
        case'*':
            return 3;
        case'/':
            return 4;
        case'(':
            return 5;
        case')':
            return 6;
        case'i':
            return 7;
		case'#':
            return 8;
        default:
            return 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

int IsVT(char ch)
{
    if(ch=='N')
        return 0;
    else
        return 1;
}

//////////////////////////////////////////////////////////////////////////////////////////

int readvt(char *a)
{
    if(IsVT(strings[k]))
	{
        (*a)=strings[k];
        k++;
        return 1;
	}
    else
	{
        k++;
        return 0;
	}
}

//////////////////////////////////////////////////////////////////////////////////////////

int big(int t,char a)
{
    if(M[ch_di(stack[t])-1][ch_di(a)-1]==1)
		return 1;
	else
		return 0;
}

//////////////////////////////////////////////////////////////////////////////////////////

int compare_less(int t,char a)
{
    if(M[ch_di(stack[t])-1][ch_di(a)-1]==-1)
		return 1;
	else
		return 0;
}

//////////////////////////////////////////////////////////////////////////////////////////

int equal(int t,char a)
{
    if(M[ch_di(stack[t])-1][ch_di(a)-1]==0)
		return 1;
	else
		return 0;
}

//////////////////////////////////////////////////////////////////////////////////////////

void error(int t)
{
    if(ch_di(stack[t])==6||ch_di(stack[t])==7)
	{
        printf("\n错误e2:缺少运算符!");
	}
	else if(ch_di(stack[t])==5)
	{
		printf("\n错误e1:非法左括号!");
	}
	else
        printf("\n错误e3:非法右括号!");
}

//////////////////////////////////////////////////////////////////////////////////////////

void prior_analysis()
{
    int i,j,m;
    char q,str,ch[20];
	push('#');
	print(0,-1);
u:  readvt(&a);
    if(IsVT(stack[top]))
        j=top;
    else
        j=top-1;
	do
	{
        while(big(j,a)&&strcmp(stack,"#N")!=0)
		{
            do
			{
                q=stack[j];
                if(IsVT(stack[j-1]))
                    j=j-1;
                else
                    j=j-2;
			}while(!compare_less(j,q));
			i=-1;
			while((top-j)!=0)
			{
                ch[++i]=pop();
			}
			ch[i+1]='\0';
			for (m=0;m<=5;m++)
			{
				if(strcmp(word[m],ch)==0)
					str='N';
			}
			push(str);
            print(1,1);
		}
        if(compare_less(j,a))
		{
            push(a);
			print(0,-1);
			if(stack[top]!='#')
				goto u;
		}
        else
		{
            if(equal(j,a))
			{
                push(a);
				print(0,0);
			    if(stack[top]!='#')
					goto u;
			}
			else
			{
				error(j);
				a='#';
			}
		}
	}while(a!='#');
}

//////////////////////////////////////////////////////////////////////////////////////////

int main()
{
    cout<<"******************************算符优先语法分析程序******************************"<<endl;
	cout<<" E->E+T|E-T|T"<<endl;
	cout<<" T->T*F|T/F|F"<<endl;
	cout<<" F->(E)|i"<<endl;
	cout<<" E表示算术表达式.T表示项.F表示因子.i表示变量或常数."<<endl;
	cout<<"              优先表"<<endl;
	cout<<"     +   -   *   /   (   )   i   #"<<endl;
	cout<<" +   >   >   <   <   <   >   <   >"<<endl;
    cout<<" -   >   >   <   <   <   >   <   >"<<endl;
	cout<<" *   >   >   >   >   <   >   <   >"<<endl;
	cout<<" /   >   >   >   >   <   >   <   >"<<endl;
	cout<<" (   <   <   <   <   <   =   <   e1"<<endl;
	cout<<" )   >   >   >   >   e2  >   e2  >"<<endl;
	cout<<" i   >   >   >   >   e2  >   e2  >"<<endl;
	cout<<" #   <   <   <   <   <   e3  <   ="<<endl;
	if((fp=fopen("预处理.txt","r"))==NULL)
	{
		cout<<"请先将实验1文件夹中的预处理.txt文件复制到实验2文件夹中!"<<endl;
		system("pause");
	    exit(0);
	}
	// 读取文本字符串
	char ch=fgetc(fp);
	cout << ch << endl;
	char ch1; // 遍历的元素
	while(ch!='#')
	{
	    int i=-1,j=0,m=-1; // 读取非=和非#
	    while(ch!='='&&ch!='#')
		{
            ch1=ch;
            ch=fgetc(fp);
			if((ch1=='>'||ch1=='<')&&ch=='=')
				ch=fgetc(fp);
		}
	    if(ch=='#')
		{
		    cout<<"算符优先语法分析结束!"<<endl;
			fclose(fp);
		    system("pause");
			exit(0);
		}
	    while(ch!=' '&&ch!='#')
		{
		    ch=fgetc(fp);
            oldstrings[++i]=ch;
		}
	    oldstrings[i]='\0';
	    if(isalnum(oldstrings[j]))
	        strings[++m]='i';
	    else
		    strings[++m]=oldstrings[j];
	    j++;
	    while(oldstrings[j]!='\0')
		{
            if(isalnum(oldstrings[j]))
			{
			    if(isalnum(oldstrings[j-1])==0)
			        strings[++m]='i';
			}
		    else
			    strings[++m]=oldstrings[j];
		    j++;
		}
	    strings[m+1]='#';
	    strings[m+2]='\0';
	    cout<<"算术表达式"<<id<<"为: "<<oldstrings<<endl;
        cout<<"转换为输入串: "<<strings<<endl;
        cout<<" 步骤号 符号栈 优先关系 当前分析符 剩余输入串 动作";
	    prior_analysis();
	    n=0;
	    cout<<endl;
	    cout<<"算术表达式"<<id++<<"的"<<"归约产生式步骤号为:";
	    while(No[n])
		{
		    cout<<" "<<No[n];
	        n++;
		}
		cout<<endl;

        while(stack[0]!='\0')
		    pop();
		while(No[--n])
		{
			No[n]='\0';
		}
	    top=-1;
	    a='\0';
	    k=0;
	    step=1;
	    n=0;
	}
	cout<<"算符优先语法分析结束!"<<endl;
	fclose(fp);
	system("pause");
	exit(0);
	return 0;
}
