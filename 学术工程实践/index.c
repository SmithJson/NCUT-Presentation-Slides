/*
 * @Author: zhangl
 * @Date: 2020-08-24 13:12:24
 * @LastEditors: Stone
 * @LastEditTime: 2020-08-28 10:04:50
 * @Description: 学术工程实践（成绩管理系统）

  1)	用户登录界面和用户信息管理（15分）
	2)	数据信息的录入（15分）
	3)	学生、课程及成绩全部显示（15分）
	4)	成绩修改及删除（15分）
	5)	查询功能  （15分）
	6)	成绩统计 （5分）
	7)	退出系统（5分）
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <regex.h>
 
// 学生
typedef struct Student
{
	char no[20];
	char name[16];
	char gender[4];
	int age;
	char dep[24];
	struct Student *next;
} STU_LINK_LIST;

// 课程
typedef struct Course
{
	char no[20];
	char cName[16];
	char tName[20];
	struct Course *next;
} COURSE_LINK_LIST;

// 成绩
typedef struct Score
{
	char sno[20];
	char cno[20];
	int uGrade; // 平时成绩
	int pGrade; // 卷面成绩
	int tGrage; // 综合成绩
	struct Score *next;
} SCORE_LINK_LIST;

// 学生-课程-成绩综合
typedef struct SCS
{
	char sno[20];
	char cno[20];
	char sName[16];
	char cName[16];
	char gender[4];
	char dep[24];
	int uGrade; // 平时成绩
	int pGrade; // 卷面成绩
	int tGrage; // 综合成
	struct SCS *next;
} SCS_LINK_LIST;

char username[10] = "admin";
char password[10] = "123456";
int isLogin = 0;

// ============================================= //
// ================== 文件 ================== //
// ============================================= //
void writeFileStudent(STU_LINK_LIST *head)
{
	STU_LINK_LIST *tmp = head;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("student.txt", "w+")) == NULL)
	{
		printf("学生数据写入失败\n");
		exit(0);
	}
	rewind(fp);
	while (tmp != NULL)
	{
		if (flag == 1)
		{
			fprintf(fp, "%-10s%-10s%-10s%-10s%-0s\n", "学号", "姓名", "性别", "年龄", "所在系");
		}
		else
		{
			fprintf(fp, "%-8s%-10s%-6s%-8d%-0s\n", tmp->no, tmp->name, tmp->gender, tmp->age, tmp->dep);
		}
		flag = 0;
		tmp = tmp->next;
	}
	fclose(fp);
}

STU_LINK_LIST *readFileStudent()
{
	STU_LINK_LIST *result = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
	STU_LINK_LIST *tmp = result;
	tmp->next = NULL;
	STU_LINK_LIST *prev = NULL;
	STU_LINK_LIST *node = NULL;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("student.txt", "r")) == NULL) //判断文件是否存在及可读
	{
		printf("error!");
		return result;
	}
	char a[10];
	char b[10];
	char c[10];
	char d[10];
	char e[10];
	int f;
	while (!feof(fp))
	{
		if (flag == 1) // 处理头文件 title
		{
			fscanf(fp, "%s%s%s%s%s", a, b, c, d, e);
			flag = 0;
		}
		else
		{
			node = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
			fscanf(fp, "%s%s%s%d%s", a, b, c, &f, e);
			strcpy(node->no, a);
			strcpy(node->name, b);
			strcpy(node->gender, c);
			node->age = f;
			strcpy(node->dep, e);
			prev = tmp;
			tmp->next = node;
			tmp = tmp->next;
		}
	}
	prev->next = NULL;
	fclose(fp); //关闭文件
	return result;
}

void writeFileCourse(COURSE_LINK_LIST *head)
{
	COURSE_LINK_LIST *tmp = head;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("course.txt", "w+")) == NULL)
	{
		printf("课程数据写入失败\n");
		exit(0);
	}
	rewind(fp);
	while (tmp != NULL)
	{
		if (flag == 1)
		{
			fprintf(fp, "%-10s%-10s%-0s\n", "课号", "课名", "任课教师");
		}
		else
		{
			fprintf(fp, "%-8s%-15s%-0s\n", tmp->no, tmp->cName, tmp->tName);
		}
		flag = 0;
		tmp = tmp->next;
	}
	fclose(fp);
}

COURSE_LINK_LIST *readFileCourse()
{
	COURSE_LINK_LIST *result = (COURSE_LINK_LIST *)malloc(sizeof(COURSE_LINK_LIST));
	COURSE_LINK_LIST *tmp = result;
	tmp->next = NULL;
	COURSE_LINK_LIST *prev = NULL;
	COURSE_LINK_LIST *node = NULL;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("course.txt", "r")) == NULL) //判断文件是否存在及可读
	{
		return result;
	}
	char a[10];
	char b[10];
	char c[10];
	while (!feof(fp))
	{
		if (flag == 1) // 处理头文件 title
		{
			fscanf(fp, "%s%s%s", a, b, c);
			flag = 0;
		}
		else
		{
			node = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
			fscanf(fp, "%s%s%s", a, b, c);
			strcpy(node->no, a);
			strcpy(node->cName, b);
			strcpy(node->tName, c);
			prev = tmp;
			tmp->next = node;
			tmp = tmp->next;
		}
	}
	prev->next = NULL;
	fclose(fp); //关闭文件
	return result;
}

void writeFileScore(SCORE_LINK_LIST *head)
{
	SCORE_LINK_LIST *tmp = head;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("score.txt", "w+")) == NULL)
	{
		printf("成绩数据写入失败\n");
		exit(0);
	}
	rewind(fp);
	while (tmp != NULL)
	{
		if (flag == 1)
		{
			fprintf(fp, "%-10s%-12s%-14s%-14s%-0s\n", "学号", "课号", "平时成绩", "卷面成绩", "综合成绩");
		}
		else
		{
			fprintf(fp, "%-10s%-12s%-14d%-14d%-0d\n", tmp->sno, tmp->cno, tmp->uGrade, tmp->pGrade, tmp->tGrage);
		}
		flag = 0;
		tmp = tmp->next;
	}
	fclose(fp);
}

SCORE_LINK_LIST *readFileScore()
{
	SCORE_LINK_LIST *result = (SCORE_LINK_LIST *)malloc(sizeof(SCORE_LINK_LIST));
	SCORE_LINK_LIST *tmp = result;
	tmp->next = NULL;
	SCORE_LINK_LIST *prev = NULL;
	SCORE_LINK_LIST *node = NULL;
	FILE *fp;
	int flag = 1;
	if ((fp = fopen("score.txt", "r")) == NULL) //判断文件是否存在及可读
	{
		return result;
	}
	char a[10];
	char b[10];
	char c[10];
	char d[10];
	char e[10];
	int g;
	int h;
	int i;
	while (!feof(fp))
	{
		if (flag == 1) // 处理头文件 title
		{
			fscanf(fp, "%s%s%s%s%s", a, b, c, d, e);
			flag = 0;
		}
		else
		{
			node = (SCORE_LINK_LIST *)malloc(sizeof(SCORE_LINK_LIST));
			fscanf(fp, "%s%s%d%d%d", a, b, &g, &h, &i);
			strcpy(node->sno, a);
			strcpy(node->cno, b);
			node->uGrade = g;
			node->pGrade = h;
			node->tGrage = i;
			prev = tmp;
			tmp->next = node;
			tmp = tmp->next;
		}
	}
	prev->next = NULL;
	fclose(fp); //关闭文件
	return result;
}

void deleteScore(SCORE_LINK_LIST *head, char sno[20])
{
	SCORE_LINK_LIST *tmp = head->next;
	SCORE_LINK_LIST *prev = NULL;
	while (tmp != NULL)
	{
		if (strcmp(tmp->sno, sno) == 0)
		{
			if (prev == NULL)
			{
				head->next = head->next;
				prev = head;
				tmp = head->next;
			}
			else
			{
				prev->next = tmp->next;
				tmp = tmp->next;
			}
		}
		else
		{
			prev = tmp;
			tmp = tmp->next;
		}
	}
}

// ============================================= //
// ================== 学生管理 ================== //
// ============================================= //
// 查询菜单选择
int searchMenuStu()
{
	int selectNo;
	printf("1-学号\n");
	printf("2-姓名\n");
	printf("3-性别\n");
	printf("4-系名\n");
	scanf("%d", &selectNo);
	return selectNo;
}

int operateSelectStu(char tip[30])
{
	int selectNo;
	printf("%s", tip);
	printf("1-添加\n");
	printf("2-显示所有\n");
	printf("3-查询\n");
	printf("4-删除\n");
	printf("0-返回\n");
	scanf("%d", &selectNo);
	return selectNo;
}

STU_LINK_LIST *cloneStu(STU_LINK_LIST *stu)
{
	STU_LINK_LIST *node = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
	strcpy(node->no, stu->no);
	strcpy(node->name, stu->name);
	strcpy(node->gender, stu->gender);
	strcpy(node->dep, stu->dep);
	node->age = stu->age;
	node->next = NULL;
	return node;
}

// 查找学生，返回查找结果
STU_LINK_LIST *searchStu(STU_LINK_LIST *head)
{
	int menu_choice = menu_choice = searchMenuStu();
	STU_LINK_LIST *tmp = head->next;
	STU_LINK_LIST *result = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
	STU_LINK_LIST *rHead = result;
	STU_LINK_LIST *newNode = NULL;
	char value[40]; // 搜索内容
	int flag = 1;
	int isSearchName = 0;
	while (tmp != NULL)
	{
		newNode = cloneStu(tmp);
		switch (menu_choice)
		{
		case 1:
			if (flag == 1)
			{
				printf("请输入学号：");
				scanf("%s", &value);
			}
			printf("-----%d %s %s\n", strcmp(tmp->no, value), tmp->no, value);
			if (strcmp(tmp->no, value) == 0)
			{
				rHead->next = newNode;
				isSearchName = 1;
			}
			break;
		case 2:
			if (flag == 1)
			{
				printf("请输入姓名：");
				scanf("%s", &value);
			}
			if (strcmp(tmp->name, value) == 0)
			{
				rHead->next = newNode;
				rHead = rHead->next;
			}
			break;
		case 3:
			if (flag == 1)
			{
				printf("请输入性别：");
				scanf("%s", &value);
			}
			if (strcmp(tmp->gender, value) == 0)
			{
				rHead->next = newNode;
				rHead = rHead->next;
			}
			break;
		case 4:
			if (flag == 1)
			{
				printf("请输入系别：");
				scanf("%s", &value);
			}
			if (strcmp(tmp->dep, value) == 0)
			{
				rHead->next = newNode;
				rHead = rHead->next;
			}
			break;
		default:
			printf("无效的选择");
			break;
		}
		flag = 0;
		tmp = tmp->next;
		if (isSearchName == 1)
		{
			break;
		}
	}
	return result;
}

// 删除学生
STU_LINK_LIST *deleteStu(STU_LINK_LIST *head)
{
	STU_LINK_LIST *tmp = head;
	STU_LINK_LIST *prev = NULL;
	STU_LINK_LIST *result = NULL;
	char no[20];
	printf("请输入要删除学生的学号：\n");
	scanf("%s", no);
	while (tmp != NULL)
	{
		if (strcmp(tmp->no, no) == 0)
		{
			result = tmp;
			if (prev == NULL)
			{
				head = head->next;
			}
			else
			{
				prev->next = tmp->next;
				tmp = tmp->next;
			}
			break;
		}
		else
		{
			prev = tmp;
			tmp = tmp->next;
		}
	}
	return result;
}

// 添加学生
void insertStu(STU_LINK_LIST *head)
{
	// 是否重复
	STU_LINK_LIST *tmp = head;
	STU_LINK_LIST *node = (STU_LINK_LIST *)malloc(sizeof(STU_LINK_LIST));
	for (int i = 0, len = 5; i < len; i++)
	{
		switch (i)
		{
		case 0:
			printf("请输入学号：\n");
			scanf("%s", &node->no);
			break;
		case 1:
			printf("请输入姓名：\n");
			scanf("%s", &node->name);
			break;
		case 2:
			printf("请输入性别：\n");
			scanf("%s", &node->gender);
			break;
		case 3:
			printf("请输入年龄：\n");
			scanf("%d", &node->age);
			break;
		default:
			printf("请输入所在系：\n");
			scanf("%s", &node->dep);
			break;
		}
	}
	if (hasStu(head, node->no) == 1)
	{
		printf("!!!该学生已经存在\n");
	}
	else
	{
		while (tmp->next != NULL)
		{
			tmp = tmp->next;
		}
		tmp->next = node;
	}
}

// 显示学生
void dispalyStu(STU_LINK_LIST *head)
{
	STU_LINK_LIST *tmp = head->next;
	if (tmp == NULL)
	{
		printf("1111111111\n");
	}
	printf("%-10s%-10s%-10s%-10s%-0s\n", "学号", "姓名", "性别", "年龄", "所在系");
	while (tmp != NULL)
	{
		printf("%-8s%-10s%-6s%-8d%-0s\n", tmp->no, tmp->name, tmp->gender, tmp->age, tmp->dep);
		tmp = tmp->next;
	}
}

int hasStu(STU_LINK_LIST *head, char no[20])
{
	STU_LINK_LIST *tmp = head;
	int result = 0;
	printf("1----%s\n", no);
	while (tmp != NULL)
	{
		if (strcmp(tmp->no, no) == 0)
		{
			result = 1;
			break;
		}
		tmp = tmp->next;
	}
	return result;
}

void studentManage(STU_LINK_LIST *head, SCORE_LINK_LIST *head2)
{
	int op_choice;
	STU_LINK_LIST *result = NULL;
	STU_LINK_LIST *delStu = NULL;
	while ((op_choice = operateSelectStu(" =================== 学生管理 =================== \n")) != 0)
	{
		switch (op_choice)
		{
		case 1:
			printf(" =================== 学生管理 (添加学生) =================== \n");
			insertStu(head);
			writeFileStudent(head);
			break;
		case 2:
			printf(" =================== 学生管理 (显示所有学生) =================== \n");
			dispalyStu(head);
			break;
		case 3:
			printf(" =================== 学生管理 (查询学生) =================== \n");
			result = searchStu(head);
			if (result->next == NULL)
			{
				printf("没有找到该学生\n");
			}
			else
			{
				dispalyStu(result);
			}
			break;
		case 4:
			printf(" =================== 学生管理 (删除学生) =================== \n");
			delStu = deleteStu(head);
			if (delStu != NULL)
			{
				deleteScore(head2, delStu->no);
			}
			writeFileStudent(head);
			writeFileScore(head2);
			break;
		default:
			printf("无效的选择");
			break;
		}
	}
}

// ============================================= //
// ================== 课程管理 ================== //
// ============================================= //
int operateSelectCourse(char tip[30])
{
	int selectNo;
	printf("%s", tip);
	printf("1-添加\n");
	printf("2-显示所有\n");
	printf("0-返回\n");
	scanf("%d", &selectNo);
	return selectNo;
}

void displayCourse(COURSE_LINK_LIST *head)
{
	COURSE_LINK_LIST *tmp = head->next;
	printf("%-10s%-12s%-0s\n", "课号", "课名", "任课教师");
	while (tmp != NULL)
	{
		printf("%-8s%-12s%-0s\n", tmp->no, tmp->cName, tmp->tName);
		tmp = tmp->next;
	}
}

COURSE_LINK_LIST *cloneCourse(COURSE_LINK_LIST *course)
{
	COURSE_LINK_LIST *node = (COURSE_LINK_LIST *)malloc(sizeof(COURSE_LINK_LIST));
	strcpy(node->no, course->no);
	strcpy(node->cName, course->cName);
	strcpy(node->tName, course->tName);
	node->next = NULL;
	return node;
}

COURSE_LINK_LIST *searchCourse(COURSE_LINK_LIST *head, char *value, int tag)
{
	COURSE_LINK_LIST *tmp = head->next;
	COURSE_LINK_LIST *result = (COURSE_LINK_LIST *)malloc(sizeof(COURSE_LINK_LIST));
	while (tmp != NULL)
	{
		if (tag == 0 && strcmp(tmp->no, value) == 0)
		{
			result->next = cloneCourse(tmp);
			break;
		}
		if (tag == 1 && strcmp(tmp->cName, value) == 0)
		{
			result->next = cloneCourse(tmp);
			break;
		}
		tmp = tmp->next;
	}

	return result;
}

void insertCourse(COURSE_LINK_LIST *head)
{
	COURSE_LINK_LIST *tmp = head;
	COURSE_LINK_LIST *node = (COURSE_LINK_LIST *)malloc(sizeof(COURSE_LINK_LIST));
	node->next = NULL;
	for (int i = 0; i < 3; i++)
	{
		switch (i)
		{
		case 0:
			printf("请输入课号：\n");
			scanf("%s", &node->no);
			break;
		case 1:
			printf("请输入课名：\n");
			scanf("%s", &node->cName);
			break;
		default:
			printf("请输入任课教师：\n");
			scanf("%s", &node->tName);
			break;
		}
	}
	if (hasCourse(head, node->no) == 1)
	{
		printf("!!!该课程已经存在\n");
	}
	else
	{
		while (tmp->next != NULL)
		{
			tmp = tmp->next;
		}
		tmp->next = node;
	}
}

// 判断是否存课程
int hasCourse(COURSE_LINK_LIST *head, char value[20], int tag)
{
	COURSE_LINK_LIST *tmp = head;
	int result = 0;
	while (tmp != NULL)
	{
		if (tag == 0 && strcmp(tmp->no, value) == 0)
		{
			result = 1;
			break;
		}
		if (tag == 1 && strcmp(tmp->cName, value) == 0)
		{
			result = 1;
			break;
		}
		tmp = tmp->next;
	}
	return result;
}

void courseManage(COURSE_LINK_LIST *head)
{
	int op_choice;
	while ((op_choice = operateSelectCourse(" =================== 课程管理 =================== \n")) != 0)
	{
		switch (op_choice)
		{
		case 1:
			printf(" =================== 课程管理 (添加课程) =================== \n");
			insertCourse(head);
			writeFileCourse(head);
			break;
		case 2:
			printf(" =================== 课程管理 (显示所有课程) =================== \n");
			displayCourse(head);
			break;
		default:
			printf("无效的选择");
			break;
		}
	}
}

// ============================================= //
// ================== 成绩管理 ================== //
// ============================================= //
int operateSelectScore(char tip[30])
{
	int selectNo;
	printf("%s", tip);
	printf("1-添加\n");
	printf("2-显示所有\n");
	printf("3-查询\n");
	printf("4-修改\n");
	printf("5-删除\n");
	// printf("6-成绩统计\n");
	printf("0-返回\n");
	scanf("%d", &selectNo);
	return selectNo;
}

int searchMenuScore()
{
	int selectNo;
	printf("1-学号\n");
	printf("2-课程名称\n");
	scanf("%d", &selectNo);
	return selectNo;
}

SCS_LINK_LIST *cloneSCSBySno(SCORE_LINK_LIST *score, char sno[20], char *cname)
{
	SCS_LINK_LIST *node = (SCS_LINK_LIST *)malloc(sizeof(SCS_LINK_LIST));
	strcpy(node->sno, sno);
	strcpy(node->cName, cname);
	node->uGrade = score->uGrade;
	node->pGrade = score->pGrade;
	node->tGrage = score->tGrage;
	node->next = NULL;
	return node;
}

SCS_LINK_LIST *cloneSCSBySname(SCORE_LINK_LIST *score, char sno[20], char *cname)
{
	SCS_LINK_LIST *node = (SCS_LINK_LIST *)malloc(sizeof(SCS_LINK_LIST));
	strcpy(node->sno, sno);
	strcpy(node->cName, cname);
	node->uGrade = score->uGrade;
	node->pGrade = score->pGrade;
	node->tGrage = score->tGrage;
	node->next = NULL;
	return node;
}

SCS_LINK_LIST *cloneSCSByCname(SCORE_LINK_LIST *score)
{
	SCS_LINK_LIST *node = (SCS_LINK_LIST *)malloc(sizeof(SCS_LINK_LIST));
	strcpy(node->sno, score->sno);
	strcpy(node->cno, score->cno);
	node->tGrage = score->tGrage;
	node->next = NULL;
	return node;
}

void searchScore(SCORE_LINK_LIST *head, COURSE_LINK_LIST *head2)
{
	int menu_choice = searchMenuScore();
	SCORE_LINK_LIST *tmp = head->next;
	SCS_LINK_LIST *result = (SCS_LINK_LIST *)malloc(sizeof(SCS_LINK_LIST));
	SCS_LINK_LIST *rHead = result;
	SCS_LINK_LIST *newNode = NULL;
	STU_LINK_LIST *tmpNode = NULL;
	COURSE_LINK_LIST *tmpNode2 = NULL;
	char value[20]; // 搜索内容
	int flag = 1;
	while (tmp != NULL)
	{
		switch (menu_choice)
		{
		case 1:
			if (flag == 1)
			{
				printf("请输入学号：");
				scanf("%s", value);
			}
			if (strcmp(tmp->sno, value) == 0)
			{
				if (hasCourse(head2, tmp->cno, 0) == 1)
				{
					tmpNode2 = searchCourse(head2, tmp->cno, 0)->next;
					newNode = cloneSCSBySno(tmp, value, tmpNode2->cName);
					rHead->next = newNode;
					rHead = rHead->next;
					tmpNode2 = NULL;
				}
			}
			break;
		case 2:
			if (flag == 1)
			{
				printf("请输入课程名：\n");
				scanf("%s", value);
			}
			if (hasCourse(head2, value, 1) == 1)
			{
				tmpNode2 = searchCourse(head2, value, 1)->next;
				if (strcmp(tmp->cno, tmpNode2->no) == 0)
				{
					newNode = cloneSCSByCname(tmp);
					rHead->next = newNode;
					rHead = rHead->next;
					tmpNode2 = NULL;
				}
			}
			else
			{
				printf("课程不存在");
			}
			break;
		default:
			printf("无效的选择");
			break;
		}
		flag = 0;
		tmp = tmp->next;
	}

	int flag2 = 1;
	result = result->next;
	while (result != NULL)
	{
		switch (menu_choice)
		{
		case 1:
			if (flag2 == 1)
			{
				printf("%-8s%-10s%-12s%-14s%-0s\n", "学号", "课程名", "平时成绩", "卷面成绩", "综合成绩");
			}
			if (result != NULL)
			{
				printf("%-8s%-8s%-8d%-8d%-0d\n", result->sno, result->cName, result->uGrade, result->pGrade, result->tGrage);
			}
			break;
		case 2:
			if (flag2 == 1)
			{
				printf("%-8s%-10s%-0s\n", "学号", "课号", "综合成绩");
			}
			if (result != NULL)
			{
				printf("%-8s%-10s%-0d\n", result->sno, result->cno, result->tGrage);
			}
			break;
		default:
			break;
		}
		flag2 = 0;
		result = result->next;
	}
}

// 校验课号格式
int isValidCourse(char *match_text, char *match_pattern)
{
	int status;
	regmatch_t pmatch[1];
	int cflags = REG_EXTENDED;
	const size_t nmatch = 1;
	regex_t reg;
	const char *pattern = match_pattern;
	regcomp(&reg, pattern, cflags);
	status = regexec(&reg, match_text, nmatch, pmatch, 0);
	regfree(&reg);
	return status == 0 ? 0 : 1;
}

void insertScore(SCORE_LINK_LIST *head, STU_LINK_LIST *head2, COURSE_LINK_LIST *head3)
{
	SCORE_LINK_LIST *tmp = head;
	SCORE_LINK_LIST *node = (SCORE_LINK_LIST *)malloc(sizeof(SCORE_LINK_LIST));
	node->next = NULL;
	for (int i = 0; i < 4; i++)
	{
		switch (i)
		{
		case 0:
			printf("请输入学号：\n");
			scanf("%s", &node->sno);
			break;
		case 1:
			printf("请输入课号：\n");
			scanf("%s", &node->cno);
			break;
		case 2:
			printf("请输入平时成绩：\n");
			scanf("%d", &node->uGrade);
			break;
		case 3:
			printf("请输入卷面成绩：\n");
			scanf("%d", &node->pGrade);
			break;
		default:
			printf("请输入综合成绩：\n");
			scanf("%d", &node->tGrage);
			break;
		}
	}
	if (hasStu(head2, node->sno) == 1 && hasCourse(head3, node->cno, 0) == 1)
	{
		char *cno = node->cno;
		char *cParrtern = "P\\d*";
		char *sParrtern = "S\\d*";
		int isCCourse = isValidCourse(cno, cParrtern);
		int isSCourse = isValidCourse(cno, sParrtern);
		if (isCCourse == 0 || isSCourse == 0)
		{
			if (isSCourse == 0)
			{
				node->tGrage = node->uGrade * 0.4 + node->pGrade * 0.6;
			}
			if (isCCourse == 0)
			{
				node->tGrage = node->uGrade * 0.3 + node->pGrade * 0.7;
			}
			while (tmp->next != NULL)
			{
				tmp = tmp->next;
			}
			tmp->next = node;
		}
		else
		{
			printf("非法课号\n");
		}
	}
	else
	{
		printf("学号或课号无效\n");
	}

}

void displayScore(SCORE_LINK_LIST *head)
{
	SCORE_LINK_LIST *tmp = head->next;
	printf("%-10s%-12s%-14s%-14s%-0s\n", "学号", "课名", "平时成绩", "卷面成绩", "综合成绩");
	while (tmp != NULL)
	{
		printf("%-10s%-12s%-14d%-14d%-0d\n", tmp->sno, tmp->cno, tmp->uGrade, tmp->pGrade, tmp->tGrage);
		tmp = tmp->next;
	}
}

void updateScore(SCORE_LINK_LIST *head)
{
	SCORE_LINK_LIST *tmp = head->next;
	int grade = 0;
	char sno[20];
	char cno[20];
	int uGrade;
	int pGrade;
	int flag = 0;
	char *cParrtern = "P\\d*";
	char *sParrtern = "S\\d*";
	printf("请输入要修改成绩的学号：\n");
	scanf("%s", sno);
	printf("请输入要修改成绩的课号：\n");
	scanf("%s", cno);
	printf("请输入平时成绩：\n");
	scanf("%d", &uGrade);
	printf("请输入平时成绩：\n");
	scanf("%d", &pGrade);
	int isCCourse = isValidCourse(cno, cParrtern);
	int isSCourse = isValidCourse(cno, sParrtern);
	while (tmp != NULL)
	{
		if (strcmp(tmp->sno, sno) == 0 && strcmp(tmp->cno, cno) == 0)
		{
			tmp->uGrade = uGrade;
			tmp->pGrade = pGrade;
			if (isSCourse == 0)
			{
				tmp->tGrage = tmp->uGrade * 0.4 + tmp->pGrade * 0.6;
			}
			if (isCCourse == 0)
			{
				tmp->tGrage = tmp->uGrade * 0.3 + tmp->pGrade * 0.7;
			}
			flag = 1;
			break;
		}
		tmp = tmp->next;
	}
	if (flag == 1)
	{
		printf("修改成功\n");
	}
	else
	{
		printf("没有找到修改的记录");
	}
}

void scoreManage(SCORE_LINK_LIST *head, STU_LINK_LIST *head2, COURSE_LINK_LIST *head3)
{
	int op_choice;
	char sno[20];
	char password2[10];
	while ((op_choice = operateSelectScore(" =================== 成绩管理 =================== \n")) != 0)
	{
		switch (op_choice)
		{
		case 1:
			printf(" =================== 成绩管理 (添加成绩) =================== \n");
			insertScore(head, head2, head3);
			writeFileScore(head);
			break;
		case 2:
			printf(" =================== 成绩管理 (显示所有成绩) =================== \n");
			displayScore(head);
			break;
		case 3:
			printf(" =================== 成绩管理 (查询成绩) =================== \n");
			searchScore(head, head3);
			break;
		case 4:
			printf("请输入密码：\n");
			scanf("%s", &password2);
			if (strcmp(&password, &password2) != 0)
			{
				printf("用户名或密码错误\n");
			}
			else
			{
				printf(" =================== 成绩管理 (修改成绩) =================== \n");
				updateScore(head);
				writeFileScore(head);
			}
			break;
		case 5:
			printf(" =================== 成绩管理 (删除成绩) =================== \n");
			printf("请输入要删除成绩的学号：\n");
			scanf("%s", sno);
			deleteScore(head, sno);
			writeFileScore(head);
			break;
		default:
			printf("无效的选择\n");
			break;
		}
	}
}

// ================== 公共函数 ================== //
// 用户菜单选择
int menuSelect()
{
	int selectNo;
	printf(" =================== 输入功能编号 =================== \n");
	printf("1-学生管理\n");
	printf("2-课程管理\n");
	printf("3-成绩管理\n");
	printf("4-退出系统\n");
	scanf("%d", &selectNo);
	return selectNo;
}

int main()
{
	char username2[10];
	char password2[10];
	int menu_choice;
	// 	// 链表变量
	// todo: 写入链表
	STU_LINK_LIST *pStuHead = readFileStudent();
	COURSE_LINK_LIST *pCouHead = readFileCourse();
	SCORE_LINK_LIST *pScoHead = readFileScore();

q1:
	printf("=====================================================\n");
	printf("||                 欢迎使用成绩管理系统             ||\n");
	printf("=====================================================\n");
	for (int i = 0; i < 2; i++)
	{
		switch (i)
		{
		case 0:
			printf("请输入用户名：\n");
			scanf("%s", &username2);
			break;
		default:
			printf("请输入密码：\n");
			scanf("%s", &password2);
			break;
		}
	}
	if (strcmp(&username, &username2) != 0 || strcmp(&password, &password2) != 0)
	{
		printf("用户名或密码错误\n");
		goto q1;
	}
	while ((menu_choice = menuSelect()) != 4)
	{
		switch (menu_choice)
		{
		case 1:
			studentManage(pStuHead, pScoHead);
			break;
		case 2:
			courseManage(pCouHead);
			break;
		case 3:
			scoreManage(pScoHead, pStuHead, pCouHead);
			break;
		default:
			printf("无效的选择");
			break;
		}
	}
	printf("系统退出成功\n");
	goto q1;
	return 0;
}
