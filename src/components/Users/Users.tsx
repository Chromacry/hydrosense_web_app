import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from "react";
import { NodeProps } from "../../types/CommonType";
import Layout from "../Layout/Layout";

import {
  Container,
  FormContainer,
  FormSectionContainer,
  MyTableContainer,
  Title,
  TitleH3,
} from "./UsersElements";

import { STATUS_CODES } from "../../constants/GlobalConstant";
import { EnhancedTable } from "./TableData";
import { addUserDataApi, deleteUserDataApi, editUserDataApi, getAllUsersDataApi } from "../../services/RouteServices/UsersApi";
import { ResponseUsersData } from "../../types/UsersType";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { getAllHouseholdsDataApi } from "../../services/RouteServices/HouseholdApi";
import { ResponseHouseholdsApiDataType, ResponseHouseholdsApiType, ResponseHouseholdsData } from "../../types/HouseholdsType";
import { getCurrentUserFromLocalStorage } from "../../utils/LocalStorageUtil";
import { ResponseRolesApiDataType, ResponseRolesApiType, ResponseRolesData } from "../../types/RolesType";
import { getAllRolesDataApi } from "../../services/RouteServices/RolesApi";
// import { UserData } from "../../types/TableDataType";

const Users: FC = () => {
  const [responseUsersData, setResponseUsersData] = useState<ResponseUsersData[]>([]);
  const [responseHouseholdsData, setResponseHouseholdsData] = useState<ResponseHouseholdsData[]>([]);
  const [responseRolesData, setResponseRolesData] = useState<ResponseRolesData[]>([]);

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  
  const [editCurrentUserId, setEditCurrentUserId] = useState('');

  const [usernameFormValue, setUsernameFormValue] = useState('');
  const [passwordFormValue, setPasswordFormValue] = useState('');
  const [emailAddressFormValue, setEmailAddressFormValue] = useState('');
  const [phoneNumberFormValue, setPhoneNumberFormValue] = useState('');
  const [userStatusFormValue, setUserStatusFormValue] = useState('Active');
  const [userRoleFormValue, setUserRoleFormValue] = useState('');
  const [userHouseholdFormValue, setUserHouseholdFormValue] = useState('Active');
  
  const [editusernameFormValue, setEditUsernameFormValue] = useState('');
  const [editpasswordFormValue, setEditPasswordFormValue] = useState('');
  const [editemailAddressFormValue, setEditEmailAddressFormValue] = useState('');
  const [editphoneNumberFormValue, setEditPhoneNumberFormValue] = useState('');
  const [edituserStatusFormValue, setEditUserStatusFormValue] = useState('Active');
  const [edituserRoleFormValue, setEditUserRoleFormValue] = useState('');
  const [edituserHouseholdFormValue, setEditUserHouseholdFormValue] = useState('Active');
  

  const [usernameHelperMessage, setUsernameHelperMessage] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordHelperMessage, setPasswordHelperMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailAddressHelperMessage, setEmailAddressHelperMessage] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [phoneNumberHelperMessage, setPhoneNumberHelperMessage] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeUsernameValue = (event: ChangeEvent<HTMLInputElement>) => {setUsernameFormValue(event.target.value)};
  const onChangePasswordValue = (event: ChangeEvent<HTMLInputElement>) => {setPasswordFormValue(event.target.value)};
  const onChangeEmailValue = (event: ChangeEvent<HTMLInputElement>) => {setEmailAddressFormValue(event.target.value)};
  const onChangePhoneNumberValue = (event: ChangeEvent<HTMLInputElement>) => {setPhoneNumberFormValue(event.target.value)};

  const onChangeUserStatusValue = (event: SelectChangeEvent) => {setUserStatusFormValue(event.target.value as string)};
  const onChangeUserRoleValue = (event: SelectChangeEvent) => {setUserRoleFormValue(event.target.value as string)};
  const onChangeUserHouseholdValue = (event: SelectChangeEvent) => {setUserHouseholdFormValue(event.target.value as string)};
  
  const onChangeEditEmailValue = (event: ChangeEvent<HTMLInputElement>) => {setEditEmailAddressFormValue(event.target.value)};
  const onChangeEditUsernameValue = (event: ChangeEvent<HTMLInputElement>) => {setEditUsernameFormValue(event.target.value)};
  const onChangeEditPhoneNumberValue = (event: ChangeEvent<HTMLInputElement>) => {setEditPhoneNumberFormValue(event.target.value)};
  const onChangeEditUserStatusValue = (event: SelectChangeEvent) => {setEditUserStatusFormValue(event.target.value as string)};


  const handleCloseAddUserModal = () => {
    setShowAddUserModal(false);
    setPasswordFormValue('');
    setEmailAddressFormValue('');
    setPhoneNumberFormValue('');
    setUserStatusFormValue('Active');
    setUserRoleFormValue('');
    setUserHouseholdFormValue('');
    setUserRoleFormValue('');
  }
  const handleCloseEditUserModal = () => setShowEditUserModal(false);

  const handleShowAddUserModal = async () => {
    await getAllHouseholdsDataApi({})
    .then((res: ResponseHouseholdsApiType) => {
      const responseDataApi : ResponseHouseholdsApiDataType = res?.data;
      const responseData: ResponseHouseholdsData[] = responseDataApi?.data;
      console.log(responseData);
      setResponseHouseholdsData(responseData)
    })
    .catch((error) => console.error(error))

    await getAllRolesDataApi({})
    .then((res: ResponseRolesApiType) => {
      const responseDataApi : ResponseRolesApiDataType = res?.data;
      const responseData: ResponseRolesData[] = responseDataApi?.data;
      console.log(responseData);
      setResponseRolesData(responseData)
    })
    .catch((error) => console.error(error))

    setShowAddUserModal(true);
  };

  const loadHouseholdDataInModal = () => {
    return responseHouseholdsData?.map((household) => {
      return <MenuItem value={household?.household_id}>{household?.household_name}</MenuItem>
    })
  }

  const loadRoleDataInModal = () => {
    return responseRolesData?.map((household) => {
      return <MenuItem value={household?.role_id}>{household?.role_name}</MenuItem>
    })
  }

  
  const handleAddUser = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    if (usernameFormValue.length <= 0) {
      setUsernameHelperMessage('Please fill in your username');
      setUsernameError(true);

      setTimeout(()=> {
        setUsernameHelperMessage('');
      setUsernameError(false);
      }, 2500)
      return;
    }

    if (passwordFormValue.length <= 0) {
      setPasswordHelperMessage('Please fill in your password');
      setPasswordError(true);

      setTimeout(()=> {
        setPasswordHelperMessage('');
        setPasswordError(false);
      }, 2500)
      return;
    }

    const body = {
      userName: usernameFormValue,
      password: passwordFormValue,
      emailAddress: emailAddressFormValue,
      phoneNumber: phoneNumberFormValue,
      userStatus: userStatusFormValue,
      roleId: userRoleFormValue,
      householdId: userHouseholdFormValue,
      createdBy: currentUser?.name
    }
    await addUserDataApi(body)
    .then((res) => {
      const responseDataApi = res?.data;
      console.log(responseDataApi)
      if (responseDataApi?.status === STATUS_CODES.SUCCESS_CODE) {
        setSuccessMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 3500);
      }
      else {
        setErrorMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);
      }
    })
    .catch((error) => console.error(error))

    setShowAddUserModal(false);
  }
  
  const handleEditUser = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    const body = {
      userId: editCurrentUserId,
      userName: editusernameFormValue,
      emailAddress: editemailAddressFormValue,
      phoneNumber: editphoneNumberFormValue,
      updatedBy: currentUser?.name
    }
    await editUserDataApi(body)
    .then((res) => {
      const responseDataApi = res?.data;
      // console.log(responseDataApi?.message);
      if (responseDataApi?.status === STATUS_CODES.SUCCESS_CODE) {
        setSuccessMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 3500);
      }
      else {
        setErrorMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);
      }
    })
    .catch((err) => console.error(err))
    setShowEditUserModal(false);
  }

  const openEditUserModal = async (userData : ResponseUsersData) => {
    setEditCurrentUserId(userData?.user_id)
    setEditEmailAddressFormValue(userData?.email_address)
    setEditPhoneNumberFormValue(userData?.phone_number)
    setEditUserHouseholdFormValue(userData?.household_name)
    setEditUsernameFormValue(userData?.username)
    setEditUserStatusFormValue(userData?.user_status)
    setEditUserRoleFormValue(userData?.role_name)
    
    setShowEditUserModal(true);    
  }

  const handleDeleteUser = async (userId: string) => {
    const currentUser = getCurrentUserFromLocalStorage();
    const response = window.confirm("Are you sure you want to delete this user?");
    if (!response) return;
    const body = {
      data: {
        userId : userId,
        deletedBy: currentUser.name
      }
    }
    console.log(body)
    await deleteUserDataApi(body)
    .then((res) => {
      const responseDataApi = res?.data;
      console.log(responseDataApi?.message);
      if (responseDataApi?.status === STATUS_CODES.SUCCESS_CODE) {
        setSuccessMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setSuccessMessage('');
          window.location.reload();
        }, 3500);
      }
      else {
        setErrorMessage(responseDataApi?.message);
        
        setTimeout(() => {
          setErrorMessage('');
        }, 3500);
      }
    })
    .catch((error) => console.error(error));

  }

  
  const getUsersApi = async () => {
    await getAllUsersDataApi({})
    .then((res) => {
      const responseDataApi = res?.data;
      const responseData = responseDataApi?.data;
      // console.log(responseData)
      setResponseUsersData(responseData);
    })
    .catch((error) => console.error(error))
  }
  
  const displayUserTable = () => {
    if (responseUsersData.length === 0) return;
    return <EnhancedTable tableRows={responseUsersData} addOnClick={handleShowAddUserModal} editOnClick={(value) => openEditUserModal(value)} deleteOnClick={(value) => handleDeleteUser(value) }/>
  }
  useEffect(() => {
    getUsersApi();
  }, [])
  return (
    <>
      <Layout>
        <Container>
          <Title>Users</Title>
          {successMessage ? <Alert severity="success">{successMessage}</Alert> : <></> }
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <></> }
          <MyTableContainer>
            {displayUserTable()}
          </MyTableContainer>

          {/* Add User Modal */}
          <Modal show={showAddUserModal} onHide={handleCloseAddUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <TextField helperText={usernameHelperMessage} error={usernameError} label="Username" variant="outlined" value={usernameFormValue} onChange={onChangeUsernameValue}/>
            <TextField helperText={passwordHelperMessage} error={passwordError} label="Password" variant="outlined" type="password" value={passwordFormValue} onChange={onChangePasswordValue}/>
            <TextField label="Email Address" variant="outlined" value={emailAddressFormValue} onChange={onChangeEmailValue}/>
            <TextField label="Phone Number" variant="outlined" value={phoneNumberFormValue} onChange={onChangePhoneNumberValue}/>
            <FormControl fullWidth>
              <InputLabel id="user-status-select-label">User Status</InputLabel>
              <Select
                labelId="user-status-select-label"
                value={userStatusFormValue}
                label="User Status"
                onChange={onChangeUserStatusValue}
              >
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Disabled'}>Disabled</MenuItem>
              </Select>
              </FormControl>
              <FormSectionContainer>
                <FormControl fullWidth>
                  <InputLabel id="household-select-label">Household</InputLabel>
                  <Select
                    labelId="household-select-label"
                    value={userHouseholdFormValue}
                    label="Household"
                    onChange={onChangeUserHouseholdValue}
                  >
                    {loadHouseholdDataInModal()}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="user-role-select-label">User Role</InputLabel>
                  <Select
                    labelId="user-role-select-label"
                    value={userRoleFormValue}
                    label="User Role"
                    
                    onChange={onChangeUserRoleValue}
                  >
                    {loadRoleDataInModal()}
                  </Select>
                </FormControl>
              </FormSectionContainer>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddUserModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <TextField helperText={usernameHelperMessage} error={usernameError} label="Username" variant="outlined" value={editusernameFormValue} onChange={onChangeEditUsernameValue}/>
            <TextField helperText={emailAddressHelperMessage} error={emailAddressError} label="Email Address" variant="outlined" value={editemailAddressFormValue} onChange={onChangeEditEmailValue}/>
            <TextField helperText={phoneNumberHelperMessage} error={phoneNumberError} label="Phone Number" variant="outlined" value={editphoneNumberFormValue} onChange={onChangeEditPhoneNumberValue}/>
            <FormControl fullWidth>
              <InputLabel id="user-status-select-label">User Status</InputLabel>
              <Select
                labelId="user-status-select-label"
                value={edituserStatusFormValue}
                label="User Status"
                onChange={onChangeEditUserStatusValue}
              >
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Disabled'}>Disabled</MenuItem>
              </Select>
              </FormControl>
              {/* <FormSectionContainer>
                <FormControl fullWidth>
                  <InputLabel id="household-select-label">Household</InputLabel>
                  <Select
                    labelId="household-select-label"
                    value={edituserHouseholdFormValue}
                    label="Household"
                    onChange={onChangeEditUserHouseholdValue}
                  >
                    {loadHouseholdDataInModal()}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="user-role-select-label">User Role</InputLabel>
                  <Select
                    labelId="user-role-select-label"
                    value={edituserRoleFormValue}
                    label="User Role"
                    
                    onChange={onChangeEditUserRoleValue}
                  >
                    {loadRoleDataInModal()}
                  </Select>
                </FormControl>
              </FormSectionContainer> */}
          </FormContainer>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditUserModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Edit User
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
      </Layout>
    </>
  );
};

export default Users;

