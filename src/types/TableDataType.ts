import { ResponseDevicesData } from "./DeviceType";
import { ResponseHouseholdsData } from "./HouseholdType";
import { ResponseRolesData } from "./RoleType";
import { ResponseUsersData } from "./UserType";

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

export type RolesTableDataProps = {
  tableRows: ResponseRolesData[];
  addOnClick: () => void;
  editOnClick: (value : ResponseRolesData) => void;
  deleteOnClick: (value : string) => void;
}

export type DevicesTableDataProps = {
  tableRows: ResponseDevicesData[];
  addOnClick: () => void;
  editOnClick: (value : ResponseDevicesData) => void;
  deleteOnClick: (value : string) => void;
}