/*
 * @Author: Stone
 * @Date: 2020-09-08 19:36:00
 * @LastEditors: Stone
 * @LastEditTime: 2020-09-08 20:05:20
 * @Description: Do not edit
 */
#include <stdio.h>

void swap(int *p, int i ,int j)
{
    p[i] = p[i] + p[j];
    p[j] = p[i] - p[j];
    p[i] = p[i] - p[j];
}

void bubbleSort(int *p)
{
    for (int i = 0; i < 3; i++)
    {
        for (int j = 1; j < 3 - i; j++)
        {
            if (p[j - 1] > p[j])
            {
                swap(p, j - 1, j);
            }
        }
    }
}

int main()
{
    int t;
    int arr[3];
    printf("Please input number：\n");
    for (int i = 0; i < 3; i++)
    {
        scanf("%d", &t);
        arr[i] = t;
    }
    bubbleSort(arr);
    for (int i = 0; i < 3; i++)
    {
        printf("number：%d\n", arr[i]);
    }
    return 0;
}
