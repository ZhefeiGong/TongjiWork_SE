//@author   : gonzalez
//@time     : 2022.5.13
//@function : ʵ��������Ϸ
//@notice   : ���ù۲���ģʽʵ��


#include <iostream>
#include <stdlib.h>
#include <time.h>
#include <windows.h>
#include <list>
#include <graphics.h>          // EasyX��
#include <conio.h>             // EasyX��
#include<stdlib.h>
#include<time.h>

#define random(x) (rand()%x)   // ���������

using namespace std;


//@detail : ���̴�С
#define BOARDROWS 35
#define BOARDCOLS 50
#define SHOWROW   20
#define SHOWCOL   20
#define DEAD      '0'
#define ALIVE     '1'

typedef char(*Matrix)[BOARDCOLS+1];

//@intro : ����۲���
class Observer {
public:
	virtual void Updata(Matrix boardBefore, Matrix boardAfter) = 0;//���麯��
};

//@intro : ����Ŀ�꣨���۲��ߣ�
class Subject {
public:
	virtual void Attach(Observer*) = 0;  //���ӹ۲���
	virtual void Detach(Observer*) = 0;  //�Ƴ��۲���
	virtual void Notify() = 0;           //֪ͨ�۲���
};

//@intro : ÿ��ϸ������һ��������
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

//@intro : ������Ϣ���ɱ��۲���
class boardSubject : public Subject {
protected:
	list<Observer* >myObserverList;                            // �۲����б�
	char boardBefore[BOARDROWS + 1][BOARDCOLS + 1] = { '\0'};  // ������Ϣ
	char boardAfter[BOARDROWS + 1][BOARDCOLS + 1] = { '\0' };  // ������Ϣ
public:
	//boardSubject���캯��
	boardSubject(char(*board)[BOARDCOLS + 1]) {
		for (int i = 0; i <= BOARDROWS; i++)
			for (int j = 0; j <= BOARDCOLS; j++)
				boardBefore[i][j] = board[i][j];
	}
	//���ӹ۲���
	void Attach(Observer* pObserver){myObserverList.push_back(pObserver);}
	//�Ƴ��۲���
	void Detach(Observer* pObserver){myObserverList.remove(pObserver);}
	//֪ͨ�۲���
	void Notify(){
		std::list<Observer*>::iterator it = myObserverList.begin();
		while (it != myObserverList.end()){
			(*it)->Updata(boardBefore, boardAfter);
			++it;
		}
	}
	//after��ֵ��before
	void AfterToBefore(void) {
		for (int i = 0; i <= BOARDROWS; i++)
			for (int j = 0; j <= BOARDCOLS; j++)
				boardBefore[i][j] = boardAfter[i][j];
	}
	//��ȡboardBeforeֵ
	Matrix getBoardBefore(void) { return boardBefore; }
	//��ȡboardAfterֵ
	Matrix getBoardAfter(void) { return boardAfter; }
};

//@intro : UI������ʾ
class UI {
protected:
	IMAGE dead;
	IMAGE alive;
public:
	//UI���캯��
	UI() 
	{
		loadimage(&dead, _T("./image/dead.png"), 20, 20, false);
		loadimage(&alive, _T("./image/alive.png"), 20, 20, false);
	}
	//����չʾ
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

//@intro : �ʼ��ʼ��
void generateFirstBoard(Matrix boardBefore)
{
	//��ʼ������
	for (int i = 0; i <= BOARDROWS; i++)
		for (int j = 0; j <=BOARDCOLS; j++)
			boardBefore[i][j] = DEAD;
	//���һ��λ�õ�ϸ�����
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



//@intro : MAIN������
int main()
{
	initgraph(1000, 700, EW_SHOWCONSOLE);                              // ��ʼ��ͼ�ν���
	setbkcolor(BLACK);                                                 // ���ñ�����ɫ
	char boardBefore[BOARDROWS + 1][BOARDCOLS + 1] = { 0 };
	generateFirstBoard(boardBefore);                                   // �����ʼ��

	UI show;                                            //UI����
	boardSubject board(boardBefore);                    //���۲��� --  ����
	cellObserver cells[BOARDROWS + 1][BOARDCOLS + 1];   //�۲���   --  ϸ��
	for (int i = 1; i <= BOARDROWS; i++) {
		for (int j = 1; j <= BOARDCOLS; j++) {
			cells[i][j].setRowCol(i, j);               
			board.Attach(&cells[i][j]);                 //��ӹ۲���
		}
	}

	show.showUI(board.getBoardBefore(), board.getBoardBefore(), true);  //�����ʼ��
	while (true) {
		Sleep(1000 * 1);                                                //��ʱ1��
		board.Notify();                                                 //��ÿ�������仯֪ͨ
		show.showUI(board.getBoardBefore(), board.getBoardAfter());     //����仯
		board.AfterToBefore();                                          //�½���ת��
	}

	closegraph();                                                       //�رս���
	return 0;
}

