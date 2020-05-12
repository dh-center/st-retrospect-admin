export interface Entity {
  id: string;
  [key: string]: string | null;
}

export interface Person extends Entity {
  firstName: string | null;
  lastName: string | null;
  patronymic: string | null;
}
