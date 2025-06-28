export interface User {
  id: string;
  name: string;
  age: number;
  gender: string;
  state: { label: string; value: string }; 
}
