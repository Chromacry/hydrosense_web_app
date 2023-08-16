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
} from "./HouseholdsElements";

import { STATUS_CODES } from "../../constants/GlobalConstant";
import { EnhancedTable } from "./TableData";
import { addUserDataApi, deleteUserDataApi, editUserDataApi, getAllUsersDataApi } from "../../services/RouteServices/UserApi";
import { ResponseUsersData } from "../../types/UserType";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { addHouseholdsDataApi, deleteHouseholdsDataApi, editHouseholdsDataApi, getAllHouseholdsDataApi } from "../../services/RouteServices/HouseholdApi";
import { ResponseHouseholdsApiDataType, ResponseHouseholdsApiType, ResponseHouseholdsData } from "../../types/HouseholdType";
import { getCurrentUserFromLocalStorage } from "../../utils/LocalStorageUtil";
// import { UserData } from "../../types/TableDataType";

const Households: FC = () => {
  const [responseHouseholdsData, setResponseHouseholdsData] = useState<ResponseHouseholdsData[]>([]);

  const [showAddHouseholdModal, setShowAddHouseholdModal] = useState(false);
  const [showEditHouseholdModal, setShowEditHouseholdModal] = useState(false);
  
  const [editCurrentHouseholdId, setEditCurrentHouseholdId] = useState('');

  const [householdNameFormValue, setHouseholdNameFormValue] = useState('');
  const [householdAddressFormValue, setHouseholdAddressFormValue] = useState('');
  const [householdPostalCodeFormValue, setHouseholdPostalCodeFormValue] = useState('');
  
  const [edithouseholdNameFormValue, setEditHouseholdNameFormValue] = useState('');
  const [edithouseholdAddressFormValue, setEditHouseholdAddressFormValue] = useState('');
  const [edithouseholdPostalCodeFormValue, setEditHouseholdPostalCodeFormValue] = useState('');
  

  const [householdNameHelperMessage, setHouseholdNameHelperMessage] = useState('');
  const [householdNameError, setHouseholdNameError] = useState(false);
  const [householdAddressHelperMessage, setHouseholdAddressHelperMessage] = useState('');
  const [householdAddressError, setHouseholdAddressError] = useState(false);
  const [householdPostalCodeHelperMessage, setHouseholdPostalCodeHelperMessage] = useState('');
  const [householdPostalCodeError, setHouseholdPostalCodeError] = useState(false);

  const [edithouseholdNameHelperMessage, setEditHouseholdNameHelperMessage] = useState('');
  const [edithouseholdNameError, setEditHouseholdNameError] = useState(false);
  const [edithouseholdAddressHelperMessage, setEditHouseholdAddressHelperMessage] = useState('');
  const [edithouseholdAddressError, setEditHouseholdAddressError] = useState(false);
  const [edithouseholdPostalCodeHelperMessage, setEditHouseholdPostalCodeHelperMessage] = useState('');
  const [edithouseholdPostalCodeError, setEditHouseholdPostalCodeError] = useState(false);
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeHouseholdNameValue = (event: ChangeEvent<HTMLInputElement>) => {setHouseholdNameFormValue(event.target.value)};
  const onChangeHouseholdAddressValue = (event: ChangeEvent<HTMLInputElement>) => {setHouseholdAddressFormValue(event.target.value)};
  const onChangeHouseholdPostalCodeValue = (event: ChangeEvent<HTMLInputElement>) => {setHouseholdPostalCodeFormValue(event.target.value)};

  const onChangeEditHouseholdNameValue = (event: ChangeEvent<HTMLInputElement>) => {setEditHouseholdNameFormValue(event.target.value)};
  const onChangeEditHouseholdAddressValue = (event: ChangeEvent<HTMLInputElement>) => {setEditHouseholdAddressFormValue(event.target.value)};
  const onChangeEditHouseholdPostalCodeValue = (event: ChangeEvent<HTMLInputElement>) => {setEditHouseholdPostalCodeFormValue(event.target.value)};
  


  const handleCloseAddHouseholdModal = () => {
    setShowAddHouseholdModal(false);
    setHouseholdNameFormValue('');
    setHouseholdAddressFormValue('');
    setHouseholdPostalCodeFormValue('');
  }
  const handleCloseEditHouseholdModal = () => setShowEditHouseholdModal(false);

  const handleShowAddHouseholdModal = async () => {
    setShowAddHouseholdModal(true);
  };
  
  const handleAddHousehold = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    if (householdNameFormValue.length <= 0) {
      setHouseholdNameHelperMessage('Please fill in your household name');
      setHouseholdNameError(true);

      setTimeout(()=> {
        setHouseholdNameHelperMessage('');
        setHouseholdNameError(false);
      }, 2500)
      return;
    }

    if (householdAddressFormValue.length <= 0) {
      setHouseholdAddressHelperMessage('Please fill in your address');
      setHouseholdAddressError(true);

      setTimeout(()=> {
        setHouseholdAddressHelperMessage('');
        setHouseholdAddressError(false);
      }, 2500)
      return;
    }

    if (householdPostalCodeFormValue.length <= 0) {
      setHouseholdPostalCodeHelperMessage('Please fill in your postal code');
      setHouseholdPostalCodeError(true);

      setTimeout(()=> {
        setHouseholdPostalCodeHelperMessage('');
        setHouseholdPostalCodeError(false);
      }, 2500)
      return;
    }

    const body = {
      householdName: householdNameFormValue,
      householdAddress: householdAddressFormValue,
      householdPostalCode: householdPostalCodeFormValue,
      createdBy: currentUser?.name
    }
    await addHouseholdsDataApi(body)
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

    setShowAddHouseholdModal(false);
  }
  
  const handleEditHousehold = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    const body = {
      householdId: editCurrentHouseholdId,
      householdName: edithouseholdNameFormValue,
      householdAddress: edithouseholdAddressFormValue,
      householdPostalCode: edithouseholdPostalCodeFormValue,
      householdTariffRate: '4.5',
      updatedBy: currentUser?.name
    }
    await editHouseholdsDataApi(body)
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
    setShowEditHouseholdModal(false);
  }

  const openEditHouseholdModal = async (userData : ResponseHouseholdsData) => {
    setEditCurrentHouseholdId(userData?.household_id)
    setEditHouseholdAddressFormValue(userData?.household_address)
    setEditHouseholdPostalCodeFormValue(userData?.household_postalcode)
    setEditHouseholdNameFormValue(userData?.household_name)
    
    setShowEditHouseholdModal(true);    
  }

  const handleDeleteHousehold = async (userId: string) => {
    const currentUser = getCurrentUserFromLocalStorage();
    const response = window.confirm("Are you sure you want to delete this user?");
    if (!response) return;
    const body = {
      data: {
        householdId : userId,
        deletedBy: currentUser.name
      }
    }
    console.log(body)
    await deleteHouseholdsDataApi(body)
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

  
  const getHouseholdsApi = async () => {
    await getAllHouseholdsDataApi({})
    .then((res: ResponseHouseholdsApiType) => {
      const responseDataApi : ResponseHouseholdsApiDataType = res?.data;
      const responseData: ResponseHouseholdsData[] = responseDataApi?.data;
      console.log(responseData);
      setResponseHouseholdsData(responseData)
    })
    .catch((error) => console.error(error))
  }
  
  const displayHouseholdTable = () => {
    if (responseHouseholdsData.length === 0) return;
    return <EnhancedTable tableRows={responseHouseholdsData} addOnClick={handleShowAddHouseholdModal} editOnClick={(value) => openEditHouseholdModal(value)} deleteOnClick={(value) => handleDeleteHousehold(value) }/>
  }
  useEffect(() => {
    getHouseholdsApi();
  }, [])
  return (
    <>
      <Layout>
        <Container>
          <Title>Households</Title>
          {successMessage ? <Alert severity="success">{successMessage}</Alert> : <></> }
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <></> }
          <MyTableContainer>
            {displayHouseholdTable()}
          </MyTableContainer>

          {/* Add User Modal */}
          <Modal show={showAddHouseholdModal} onHide={handleCloseAddHouseholdModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <TextField helperText={householdNameHelperMessage} error={householdNameError} label="Household Name" variant="outlined" value={householdNameFormValue} onChange={onChangeHouseholdNameValue}/>
            <TextField helperText={householdAddressHelperMessage} error={householdAddressError} label="Address" variant="outlined" value={householdAddressFormValue} onChange={onChangeHouseholdAddressValue}/>
            <TextField helperText={householdPostalCodeHelperMessage} error={householdPostalCodeError}label="Postal Code" variant="outlined" value={householdPostalCodeFormValue} onChange={onChangeHouseholdPostalCodeValue}/>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddHouseholdModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddHousehold}>
            Add Household
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditHouseholdModal} onHide={handleCloseEditHouseholdModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
          <TextField helperText={edithouseholdNameHelperMessage} error={edithouseholdNameError} label="Household Name" variant="outlined" value={edithouseholdNameFormValue} onChange={onChangeEditHouseholdNameValue}/>
            <TextField helperText={edithouseholdAddressHelperMessage} error={edithouseholdAddressError} label="Address" variant="outlined" value={edithouseholdAddressFormValue} onChange={onChangeEditHouseholdAddressValue}/>
            <TextField helperText={edithouseholdAddressHelperMessage} error={edithouseholdAddressError} label="Postal Code" variant="outlined" value={edithouseholdPostalCodeFormValue} onChange={onChangeEditHouseholdPostalCodeValue}/>
          </FormContainer>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditHouseholdModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditHousehold}>
            Edit Household
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
      </Layout>
    </>
  );
};
export default Households;

