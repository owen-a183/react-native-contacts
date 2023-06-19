import { StyleSheet, View } from 'react-native';
import Card from './components/Card'
import { NativeBaseProvider, Box, Fab, Icon, FlatList, Text } from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import CustomModal from './components/Modal';
import ContactService from './api/contacts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null)
  const [data, setData] = useState()

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleCreateContact = (rawPayload) => {
    ContactService.createContact(rawPayload).then(
      refreshData()
    ).then(
      setShowModal(false)
    )
  }

  const handleSelectContact = (id) => {
    var filteredContact = data.filter(obj => {
      return obj.id === id
    })
    setSelectedContact(filteredContact[0])
    setShowModal(true)
  }

  const handleEditContact = (rawPayload) => {
    ContactService.updateContact(rawPayload).then(
      refreshData()
    ).then(
      setShowModal(false)
    ).then(
      setSelectedContact(null)
    )
  }

  const handleDeleteContact = (id) => {
    ContactService.deleteContact(id).then(
      refreshData()
    )
  }

  const refreshData = () => {
    ContactService.getAllContact().then((response) =>
      setData(response.data.data)
    )
  }

  useEffect(() => {
    refreshData()
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Box paddingX={'4'}><Text bold fontSize={'2xl'}>Contacts</Text></Box>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card item={item} handleDeleteContact={handleDeleteContact} handleSelectContact={handleSelectContact} />
          )}
        />
      </View>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={() => handleOpenModal()}
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
      {showModal && <CustomModal
        showModal={showModal}
        onClose={() => {
          handleCloseModal()
          setSelectedContact(null)
        }}
        handleCreateContact={handleCreateContact}
        handleEditContact={handleEditContact}
        selectedContact={selectedContact}
      />}
    </NativeBaseProvider>
  );
}