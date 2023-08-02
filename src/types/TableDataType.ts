import { ResponseHouseholdsData } from "./HouseholdsType";
import { ResponseUsersData } from "./UsersType";

export type UsersTableDataProps = {
  tableRows: ResponseUsersData[];
  addOnClick: () => void;
  editOnClick: (value : ResponseUsersData) => void;
  deleteOnClick: (value : string) => void;
}

export type HouseholdsTableDataProps = {
  tableRows: ResponseHouseholdsData[];
  addOnClick: () => void;
  editOnClick: (value : ResponseHouseholdsData) => void;
  deleteOnClick: (value : string) => void;
}
