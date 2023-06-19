import React, { useState } from "react";
import { Button, Modal, FormControl, Input } from "native-base";


export default CustomModal = ({ showModal, onClose, selectedContact, handleCreateContact, handleEditContact }) => {
  const isEdit = selectedContact?.id ? true : false

  const [formValue, setFormValue] = useState(isEdit ? selectedContact : {});
  const handleChange = (key, text) => {
    const newObj = {
      [key]: text
    }
    setFormValue({ ...formValue, ...newObj })
  };
  
  return <Modal isOpen={showModal} onClose={() => onClose()}>
    <Modal.Content maxWidth="400px">
      <Modal.CloseButton />
      <Modal.Header>{!isEdit ? 'New Contact' : 'Edit Contact'}</Modal.Header>
      <Modal.Body>
        <FormControl>
          <FormControl.Label>First Name</FormControl.Label>
          <Input
            defaultValue={isEdit ? selectedContact.firstName : ''}
            onChangeText={(e) => handleChange('firstName', e)}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Last Name</FormControl.Label>
          <Input
            defaultValue={isEdit ? selectedContact.lastName : ''}
            onChangeText={(e) => handleChange('lastName', e)} />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Age</FormControl.Label>
          <Input
            defaultValue={isEdit ? selectedContact.age.toString() : ''}
            onChangeText={(e) => handleChange('age', e)} />
        </FormControl>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button variant="ghost" colorScheme="blueGray" onPress={() => {
            onClose()
          }}>
            Cancel
          </Button>
          {!isEdit? <Button onPress={() => {
            handleCreateContact(formValue)
          }}>
            Submit
          </Button> : <Button onPress={() => {
            handleEditContact(formValue)
          }}>
            Save
          </Button>}
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
};
