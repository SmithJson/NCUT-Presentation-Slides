/*
 * @Author: Stone
 * @Date: 2020-09-08 19:36:00
 * @LastEditors: Stone
 * @LastEditTime: 2020-09-08 20:27:42
 * @Description: Do not edit
 */
#include <stdio.h>

int main()
{
    float max = 0, min = 0, sum = 0, t;
    printf("Please input score：\n");
    scanf("%f", &t);
    max = t;
    min = t;
    sum += t;
    for (int i = 0; i < 9; i++)
    {
        scanf("%f", &t);
        if (t > max)
        {
            max = t;
        } else if (t < min)
        {
            min = t;
        }
        sum += t;
    }
    printf("max score is：%3.1f\n", max);
    printf("min score is：%3.1f\n", min);
    printf("average score is：%3.1f\n", sum / 10);
    return 0;
}
