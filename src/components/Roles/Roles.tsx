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
} from "./RolesElements";

import { STATUS_CODES } from "../../constants/GlobalConstant";
import { EnhancedTable } from "./TableData";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { getCurrentUserFromLocalStorage } from "../../utils/LocalStorageUtil";
import { ResponseRolesApiDataType, ResponseRolesApiType, ResponseRolesData } from "../../types/RoleType";
import { addRoleDataApi, deleteRoleDataApi, editRoleDataApi, getAllRolesDataApi } from "../../services/RouteServices/RoleApi";
// import { UserData } from "../../types/TableDataType";

const Roles: FC = () => {
  const [responseRolesData, setResponseRolesData] = useState<ResponseRolesData[]>([]);

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  
  const [editCurrentRoleId, setEditCurrentRoleId] = useState('');

  const [roleNameFormValue, setRoleNameFormValue] = useState('');

  const [editroleNameFormValue, setEditRoleNameFormValue] = useState('');


  const [roleNameHelperMessage, setRoleNameHelperMessage] = useState('');
  const [roleNameError, setRoleNameError] = useState(false);

  const [editroleNameHelperMessage, setEditRoleNameHelperMessage] = useState('');
  const [editroleNameError, setEditRoleNameError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeRoleNameValue = (event: ChangeEvent<HTMLInputElement>) => {setRoleNameFormValue(event.target.value)};
  
  const onChangeEditRoleNameValue = (event: ChangeEvent<HTMLInputElement>) => {setEditRoleNameFormValue(event.target.value)};
  
  


  const handleCloseAddRoleModal = () => {
    setShowAddRoleModal(false);
    setRoleNameFormValue('');
  }
  const handleCloseEditRoleModal = () => setShowEditRoleModal(false);

  const handleShowAddRoleModal = async () => {
    setShowAddRoleModal(true);
  };
  
  const handleAddRole = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    if (roleNameFormValue.length <= 0) {
      setRoleNameHelperMessage('Please fill in your role name');
      setRoleNameError(true);

      setTimeout(()=> {
        setRoleNameHelperMessage('');
        setRoleNameError(false);
      }, 2500)
      return;
    }

    const body = {
      roleName: roleNameFormValue,
      createdBy: currentUser?.name
    }
    await addRoleDataApi(body)
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

    setShowAddRoleModal(false);
  }
  
  const handleEditRole = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    const body = {
      roleId: editCurrentRoleId,
      roleName: editroleNameFormValue,
      updatedBy: currentUser?.name
    }
    await editRoleDataApi(body)
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
    setShowEditRoleModal(false);
  }

  const openEditRoleModal = async (userData : ResponseRolesData) => {
    setEditCurrentRoleId(userData?.role_id)
    setEditRoleNameFormValue(userData?.role_name)
    setShowEditRoleModal(true);    
  }

  const handleDeleteRole = async (userId: string) => {
    const currentUser = getCurrentUserFromLocalStorage();
    const response = window.confirm("Are you sure you want to delete this role?");
    if (!response) return;
    const body = {
      data: {
        roleId : userId,
        deletedBy: currentUser.name
      }
    }
    console.log(body)
    await deleteRoleDataApi(body)
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

  
  const getRolesApi = async () => {
    await getAllRolesDataApi({})
    .then((res: ResponseRolesApiType) => {
      const responseDataApi : ResponseRolesApiDataType = res?.data;
      const responseData: ResponseRolesData[] = responseDataApi?.data;
      console.log(responseData);
      setResponseRolesData(responseData)
    })
    .catch((error) => console.error(error))
  }
  
  const displayRoleTable = () => {
    if (responseRolesData.length === 0) return;
    return <EnhancedTable tableRows={responseRolesData} addOnClick={handleShowAddRoleModal} editOnClick={(value) => openEditRoleModal(value)} deleteOnClick={(value) => handleDeleteRole(value) }/>
  }
  useEffect(() => {
    getRolesApi();
  }, [])
  return (
    <>
      <Layout>
        <Container>
          <Title>Roles</Title>
          {successMessage ? <Alert severity="success">{successMessage}</Alert> : <></> }
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <></> }
          <MyTableContainer>
            {displayRoleTable()}
          </MyTableContainer>

          {/* Add User Modal */}
          <Modal show={showAddRoleModal} onHide={handleCloseAddRoleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <TextField helperText={roleNameHelperMessage} error={roleNameError} label="Role Name" variant="outlined" value={roleNameFormValue} onChange={onChangeRoleNameValue}/>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddRoleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditRoleModal} onHide={handleCloseEditRoleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
          <TextField helperText={editroleNameHelperMessage} error={editroleNameError} label="Role Name" variant="outlined" value={editroleNameFormValue} onChange={onChangeEditRoleNameValue}/>
          </FormContainer>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditRoleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditRole}>
            Edit Role
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
      </Layout>
    </>
  );
};
export default Roles;

