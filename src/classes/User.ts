import { UserType } from "./UserType";
import { type IValidation, type ValidationResult } from "../interfaces/IValidation";

export class User implements IValidation<User> {
  private _id: number;
  private _login: string;
  private _password: string | null;
  private _userType: UserType;
  private _marks: Array<string> | null;

  constructor(id: number, login: string, userType: UserType);
  constructor(id: number, login: string, userType: UserType, password: string | null);
  constructor(id: number, login: string, userType: UserType, password: string | null, marks: Array<string>);
  constructor(id: number, login: string, userType: UserType, password?: string | null, marks?: Array<string>) {
    this._id = id;
    this._login = login;
     this._userType = userType;
     if (marks) {
       this._marks = marks;
     } else {
       this._marks = null;
     }
    if (userType == UserType.LDAP || password == null) {
      this._password = null;
    } else {
      this._password = password;
    }
  }

  public validate(user: User): ValidationResult {
    const errors: string[] = [];

    if (user._userType == UserType.Local && ((user._password == null) || (user._password == ""))) {
      errors.push('Пароль должен быть заполнен!');
    }

    if (user._password != null && user._password.length > 100) {
      errors.push('Пароль не должен превышать 100 символов.');
    }

    if (user._login == "") {
      errors.push('Логин обязателен.');
    }

    if (user._login.length > 100) {
      errors.push('Логин не должен превышать 100 символов.');
    }

    if (user._marks != null) {
      errors.push('Метки не должны превышать 50 символов.');
    }

    if (!user._userType) {
      errors.push('Пользователь должен иметь тип.');
    }

    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };

  }

  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  public get login(): string {
    return this._login;
  }
  public set login(login: string) {
    this._login = login;
  }

  public get marks(): Array<string> | null {
    return this._marks;
  }
  public set marks(marks: Array<string>) {
    this._marks = marks;
  }

  public get marksString(): string {
    if (this._marks == null) {
      return "";
    }
    return this._marks.join(";");
  }
  public set marksString(marks: string) {
    this._marks = marks.split(";");
  }

  public get password(): string | null {
    return this._password;
  }
  public set password(password: string) {
    if (this._userType == UserType.LDAP) {
      this._password = null;
    } else {
      this._password = password;
    }
  }

  public get userType(): UserType {
    return this._userType;
  }
  public set userType(userType: UserType) {
    this._userType = userType;
    if (userType == UserType.LDAP) {
      this._password = null;
    } else {
      this._password = "";
    }
  }
}
