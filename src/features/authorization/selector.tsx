import {AppRootStateType} from "../../app/store";

export const selectIsLoggedIn= (state: AppRootStateType) => state.authorization.isLoggedIn
