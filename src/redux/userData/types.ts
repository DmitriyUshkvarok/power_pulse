export interface UserDataState {
  data: UserData;
  status: string;
  error: string | null;
  calculateDailyCalories: {
    recommendedCalories: number;
    recommendedSportTime: number;
  };
}

export interface UserData {
  height: string;
  currentWeight: string;
  desiredWeight: string;
  birthday: string;
  bloodGroup: string;
  sex: string;
  levelActivity: string;
}
