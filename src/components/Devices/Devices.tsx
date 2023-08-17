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
} from "./DevicesElements";

import { STATUS_CODES } from "../../constants/GlobalConstant";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TextField } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { getCurrentUserFromLocalStorage } from "../../utils/LocalStorageUtil";
import { addDeviceDataApi, deleteDeviceDataApi, editDeviceDataApi, getAllDevicesDataApi } from "../../services/RouteServices/DeviceApi";
import { ResponseDevicesApiDataType, ResponseDevicesApiType, ResponseDevicesData } from "../../types/DeviceType";
import { EnhancedTable } from "./TableData";
// import { UserData } from "../../types/TableDataType";

const Devices: FC = () => {
  const [responseDevicesData, setResponseDevicesData] = useState<ResponseDevicesData[]>([]);

  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [showEditDeviceModal, setShowEditDeviceModal] = useState(false);
  
  const [editCurrentDeviceId, setEditCurrentDeviceId] = useState('');

  const [deviceNameFormValue, setDeviceNameFormValue] = useState('');
  const [deviceSerialNumberFormValue, setDeviceSerialNumberFormValue] = useState('');
  const [deviceLocationIdFormValue, setDeviceLocationIdFormValue] = useState('');
  const [deviceHouseholdIdFormValue, setDeviceHouseholdIdFormValue] = useState('');

  const [editdeviceNameFormValue, setEditDeviceNameFormValue] = useState('');
  const [editdeviceSerialNumberFormValue, setEditDeviceSerialNumberFormValue] = useState('');


  const [deviceNameHelperMessage, setDeviceNameHelperMessage] = useState('');
  const [deviceNameError, setDeviceNameError] = useState(false);
  const [deviceSerialNumberHelperMessage, setDeviceSerialNumberHelperMessage] = useState('');
  const [deviceSerialNumberError, setDeviceSerialNumberError] = useState(false);

  const [editdeviceNameHelperMessage, setEditDeviceNameHelperMessage] = useState('');
  const [editdeviceNameError, setEditDeviceNameError] = useState(false);
  const [editdeviceSerialNumberHelperMessage, setEditDeviceSerialNumberHelperMessage] = useState('');
  const [editdeviceLocationIdError, setEditDeviceLocationIdError] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeDeviceNameValue = (event: ChangeEvent<HTMLInputElement>) => {setDeviceNameFormValue(event.target.value)};
  const onChangeDeviceSerialNumberValue = (event: ChangeEvent<HTMLInputElement>) => {setDeviceSerialNumberFormValue(event.target.value)};
  
  const onChangeEditDeviceNameValue = (event: ChangeEvent<HTMLInputElement>) => {setEditDeviceNameFormValue(event.target.value)};
  const onChangeEditDeviceSerialNumberValue = (event: ChangeEvent<HTMLInputElement>) => {setEditDeviceSerialNumberFormValue(event.target.value)};
  
  


  const handleCloseAddDeviceModal = () => {
    setShowAddDeviceModal(false);
    setDeviceNameFormValue('');
  }
  const handleCloseEditDeviceModal = () => setShowEditDeviceModal(false);

  const handleShowAddDeviceModal = async () => {
    setShowAddDeviceModal(true);
  };
  
  const handleAddDevice = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    if (deviceNameFormValue.length <= 0) {
      setDeviceNameHelperMessage('Please fill in your device name');
      setDeviceNameError(true);

      setTimeout(()=> {
        setDeviceNameHelperMessage('');
        setDeviceNameError(false);
      }, 2500)
      return;
    }
    if (deviceSerialNumberFormValue.length <= 0) {
      setDeviceSerialNumberHelperMessage('Please fill in your device name');
      setDeviceNameError(true);

      setTimeout(()=> {
        setDeviceNameHelperMessage('');
        setDeviceNameError(false);
      }, 2500)
      return;
    }

    const body = {
      householdId: '',
      deviceName: deviceNameFormValue,
      // deviceSerialNumber: deviceSerialNumberFormValue,
      // deviceLocationId: deviceLocationIdFormValue,
      createdBy: currentUser?.name
    }
    await addDeviceDataApi(body)
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

    setShowAddDeviceModal(false);
  }
  
  const handleEditDevice = async () => {
    const currentUser = getCurrentUserFromLocalStorage();
    const body = {
      deviceId: editCurrentDeviceId,
      deviceName: editdeviceNameFormValue,
      updatedBy: currentUser?.name
    }
    await editDeviceDataApi(body)
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
    setShowEditDeviceModal(false);
  }

  const openEditDeviceModal = async (userData : ResponseDevicesData) => {
    setEditCurrentDeviceId(userData?.device_id)
    setEditDeviceNameFormValue(userData?.device_name)
    setShowEditDeviceModal(true);    
  }

  const handleDeleteDevice = async (userId: string) => {
    const currentUser = getCurrentUserFromLocalStorage();
    const response = window.confirm("Are you sure you want to delete this device?");
    if (!response) return;
    const body = {
      data: {
        deviceId : userId,
        deletedBy: currentUser.name
      }
    }
    console.log(body)
    await deleteDeviceDataApi(body)
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

  
  const getDevicesApi = async () => {
    await getAllDevicesDataApi({})
    .then((res: ResponseDevicesApiType) => {
      const responseDataApi : ResponseDevicesApiDataType = res?.data;
      const responseData: ResponseDevicesData[] = responseDataApi?.data;
      console.log(responseData);
      setResponseDevicesData(responseData)
    })
    .catch((error) => console.error(error))
  }
  
  const displayDeviceTable = () => {
    if (responseDevicesData.length === 0) return;
    return <EnhancedTable tableRows={responseDevicesData} addOnClick={handleShowAddDeviceModal} editOnClick={(value) => openEditDeviceModal(value)} deleteOnClick={(value) => handleDeleteDevice(value) }/>
  }
  useEffect(() => {
    getDevicesApi();
  }, [])
  return (
    <>
      <Layout>
        <Container>
          <Title>Devices</Title>
          {successMessage ? <Alert severity="success">{successMessage}</Alert> : <></> }
          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <></> }
          <MyTableContainer>
            {displayDeviceTable()}
          </MyTableContainer>

          {/* Add User Modal */}
          <Modal show={showAddDeviceModal} onHide={handleCloseAddDeviceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
            <TextField helperText={deviceNameHelperMessage} error={deviceNameError} label="Device Name" variant="outlined" value={deviceNameFormValue} onChange={onChangeDeviceNameValue}/>
            <TextField helperText={deviceSerialNumberHelperMessage} error={deviceSerialNumberError} label="Serial Number" variant="outlined" value={deviceNameFormValue} onChange={onChangeDeviceNameValue}/>
          </FormContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddDeviceModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddDevice}>
            Add Device
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditDeviceModal} onHide={handleCloseEditDeviceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Device</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormContainer>
          <TextField helperText={editdeviceNameHelperMessage} error={editdeviceNameError} label="Device Name" variant="outlined" value={editdeviceNameFormValue} onChange={onChangeEditDeviceNameValue}/>
          </FormContainer>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditDeviceModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditDevice}>
            Edit Device
          </Button>
        </Modal.Footer>
      </Modal>
        </Container>
      </Layout>
    </>
  );
};
export default Devices;

