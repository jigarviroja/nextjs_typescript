export interface LoginFormInterFace {
  [prop: string]: {
    name: string;
    label: string;
    placeholder: string;
    error: boolean;
    id?: string;
    type?: string;
    errMsg?: string;
    value: string;
    inputType?: string;
    required?: boolean,
  };
}

export interface UserListInfo {
  id?: string;
  name: string;
  username: string;
  email: string;
  company: string;
}

export interface UserForm {
  name: string;
}
