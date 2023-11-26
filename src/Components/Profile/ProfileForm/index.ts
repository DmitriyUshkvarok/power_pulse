export interface ProfileFormValues {
  name: string;
  email: string;
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  bloodGroup: string;
  sex: string;
  levelActivity: string;
}

export interface UserSession {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  userData: string;
}

export interface UserDataId {
  userData: {
    birthday: string;
    bloodGroup: string;
    currentWeight: string;
    desiredWeight: string;
    height: string;
    levelActivity: string;
    sex: string;
    __v: number;
    _id: string;
  };
}
