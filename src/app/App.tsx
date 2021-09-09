import React from 'react';
import s from './App.module.scss';

function App() {

    return (
        <div className={s.block}>
            <div className={s.headerBlock}>
                <div className={s.mainContainer}>
                    <div className={s.appInfoBox}>
                        <img src={""}/>
                        <h2>AppName</h2>
                    </div>
                    <div className={s.loginBtn}>LogOut</div>
                </div>
            </div>
            <div className={s.todolistListBlock}>
                <div className={s.addTodolistFormBox}>{/*size in %*/}
                    <div className={s.formBox}>
                        <input/>
                        <div className={s.addItemBtn}>addIcon</div>
                    </div>
                </div>
                <div className={s.todolistListBox}>
                    <div className={s.todolist}>
                        <h2>Title Todolist</h2>
                        <div className={s.formBox}>{/*-/-*/}
                            <input/>
                            <div className={s.addItemBtn}>addIcon</div>
                        </div>
                        <div className={s.taskList}>
                            <div className={s.task}>
                                <input type={"checkbox"}/>
                                <h3>Task1</h3>
                                <div className={s.deleteBtn}>iconDel</div>
                            </div>
                        </div>
                        <div className={s.filterBtnBox}>
                            <div className={s.filterBtn}>all</div>
                            <div className={s.filterBtn}>complited</div>
                            <div className={s.filterBtn}>active</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
