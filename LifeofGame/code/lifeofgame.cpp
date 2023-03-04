//@author   : gonzalez
//@time     : 2022.5.13
//@function : 实现生命游戏
//@notice   : 采用观察者模式实现


#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <windows.h>
#include <list>
#include <graphics.h>          // EasyX库
#include <conio.h>             // EasyX库
#include<stdlib.h>
#include<time.h>

#define random(x) (rand()%x)   // 生成随机数

using namespace std;


//@detail : 棋盘大小
#define BOARDROWS 35
#define BOARDCOLS 50
#define SHOWROW   20
#define SHOWCOL   20
#define DEAD      '0'
#define ALIVE     '1'

typedef char(*Matrix)[BOARDCOLS+1];

//@intro : 抽象观察者
class Observer {
public:
	virtual void Updata(Matrix boardBefore, Matrix boardAfter) = 0;//纯虚函数
};

//@intro : 抽象目标（被观察者）
class Subject {
public:
	virtual void Attach(Observer*) = 0;  //附加观察者
	virtual void Detach(Observer*) = 0;  //移除观察者
	virtual void Notify() = 0;           //通知观察者
};

//@intro : 每个细胞当成一个订阅者
class cellObserver : public Observer {
protected:
	int row;
	int col;
public:
	void setRowCol(int& r, int& c) {
		row = r;
		col = c;
	}
	void Updata(Matrix boardBefore, Matrix boardAfter) {
		int num = 0;
		for (int i = row - 1; i <= row + 1; i++) {
			for (int j = col - 1; j <= col + 1; j++) {
				if (!(i == row && j == col))
					if (i >= 1 && i <= BOARDROWS && j >= 1 && j <= BOARDCOLS)
						if (boardBefore[i][j] == ALIVE)
							num++;
			}
		}
		if (num == 3)
			boardAfter[row][col] = ALIVE;
		else if (num == 2)
			boardAfter[row][col] = boardBefore[row][col];
		else
			boardAfter[row][col] = DEAD;
		return;
	}

};

//@intro : 局面信息当成被观察者
class boardSubject : public Subject {
protected:
	list<Observer* >myObserverList;                            // 观察者列表
	char boardBefore[BOARDROWS + 1][BOARDCOLS + 1] = { '\0'};  // 棋盘信息
	char boardAfter[BOARDROWS + 1][BOARDCOLS + 1] = { '\0' };  // 棋盘信息
public:
	//boardSubject构造函数
	boardSubject(char(*board)[BOARDCOLS + 1]) {
		for (int i = 0; i <= BOARDROWS; i++)
			for (int j = 0; j <= BOARDCOLS; j++)
				boardBefore[i][j] = board[i][j];
	}
	//附加观察者
	void Attach(Observer* pObserver){myObserverList.push_back(pObserver);}
	//移除观察者
	void Detach(Observer* pObserver){myObserverList.remove(pObserver);}
	//通知观察者
	void Notify(){
		std::list<Observer*>::iterator it = myObserverList.begin();
		while (it != myObserverList.end()){
			(*it)->Updata(boardBefore, boardAfter);
			++it;
		}
	}
	//after赋值给before
	void AfterToBefore(void) {
		for (int i = 0; i <= BOARDROWS; i++)
			for (int j = 0; j <= BOARDCOLS; j++)
				boardBefore[i][j] = boardAfter[i][j];
	}
	//获取boardBefore值
	Matrix getBoardBefore(void) { return boardBefore; }
	//获取boardAfter值
	Matrix getBoardAfter(void) { return boardAfter; }
};

//@intro : UI界面显示
class UI {
protected:
	IMAGE dead;
	IMAGE alive;
public:
	//UI构造函数
	UI() 
	{
		loadimage(&dead, _T("./image/dead.png"), 20, 20, false);
		loadimage(&alive, _T("./image/alive.png"), 20, 20, false);
	}
	//界面展示
	void showUI(Matrix boardBefore, Matrix boardAfter,  bool initiate = false)
	{
		for (int i = 1; i <= BOARDROWS; i++)
			for (int j = 1; j <= BOARDCOLS; j++) {
				int picLeft = (j - 1) * SHOWCOL;
				int picTop = (i - 1) * SHOWROW;
				if (initiate) {
					if(boardBefore[i][j]==ALIVE)
						putimage(picLeft, picTop, &alive);
					else if(boardBefore[i][j] == DEAD)
						putimage(picLeft, picTop, &dead);
				}
				else {
					if (boardBefore[i][j] != boardAfter[i][j]) {
						if (boardAfter[i][j] == ALIVE)
							putimage(picLeft, picTop, &alive);
						else if (boardAfter[i][j] == DEAD)
							putimage(picLeft, picTop, &dead);

					}
				}
			}
		return;
	}
};

//@intro : 最开始初始化
void generateFirstBoard(Matrix boardBefore)
{
	//初始化棋盘
	for (int i = 0; i <= BOARDROWS; i++)
		for (int j = 0; j <=BOARDCOLS; j++)
			boardBefore[i][j] = DEAD;
	//随机一半位置的细胞会活
	srand((int)time(0));
	for (int i = 1; i <= BOARDROWS * BOARDCOLS / 2; i++) {
		while (true) {
			int row = random(BOARDROWS + 1);
			int col = random(BOARDCOLS + 1);
			if (row != 0 && col != 0) {
				if (boardBefore[row][col] == DEAD) {
					boardBefore[row][col] = ALIVE;
					break;
				}
			}
		}
	}
	return;
}



//@intro : MAIN主函数
int main()
{
	initgraph(1000, 700, EW_SHOWCONSOLE);                              // 初始化图形界面
	setbkcolor(BLACK);                                                 // 设置背景颜色
	char boardBefore[BOARDROWS + 1][BOARDCOLS + 1] = { 0 };
	generateFirstBoard(boardBefore);                                   // 界面初始化

	UI show;                                            //UI界面
	boardSubject board(boardBefore);                    //被观察者 --  棋盘
	cellObserver cells[BOARDROWS + 1][BOARDCOLS + 1];   //观察者   --  细胞
	for (int i = 1; i <= BOARDROWS; i++) {
		for (int j = 1; j <= BOARDCOLS; j++) {
			cells[i][j].setRowCol(i, j);               
			board.Attach(&cells[i][j]);                 //添加观察者
		}
	}

	show.showUI(board.getBoardBefore(), board.getBoardBefore(), true);  //界面初始化
	while (true) {
		Sleep(1000 * 1);                                                //延时1秒
		board.Notify();                                                 //给每个类界面变化通知
		show.showUI(board.getBoardBefore(), board.getBoardAfter());     //界面变化
		board.AfterToBefore();                                          //新界面转移
	}

	closegraph();                                                       //关闭界面
	return 0;
}

