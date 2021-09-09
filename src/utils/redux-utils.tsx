import {AppDispatchType} from "../app/store";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "redux";

//bindActionCreators получает на вход объект с AC, либо функцию
// и возвращает объект с AC, обернутыми в вызов dispatch
// или в случае с функцией функцию обернутую в dispatch.
export const useAppDispatch =()=>useDispatch<AppDispatchType>()

export function useAction(actions: any){
    const dispatch=useAppDispatch()
    return useMemo(()=>{
        return bindActionCreators(actions,dispatch)
    },[])
}

/*
 Ручное оборачивание AC в dispatch:
const mapDispatchToProps = (dispatch, ownProps) => ({
  getProducts: () => dispatch(getProducts()),
});
 */

//https://qna.habr.com/q/540780 ссылка на хабр