import { StyleSheet, View } from 'react-native';
import Card from './components/Card'
import { NativeBaseProvider, Box, Fab, Icon, FlatList, Text, HStack, Pressable, VStack } from 'native-base'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'
import CustomModal from './components/Modal';
import ContactService from './api/contacts';
import { useDispatch, useSelector, Provider } from 'react-redux'
import { store } from './store';
import { getContacts, selectContacts } from './slices/contacts';
import { SwipeListView } from 'react-native-swipe-list-view'

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

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export function App() {
  const dispatch = useDispatch()
  const contacts = useSelector(selectContacts)

  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null)
  const [newListView, setNewListView] = useState(false)
  const [data, setData] = useState(contacts)

  const handleChangeListView = () => {
    setNewListView(!newListView)
  }

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

  const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
    <Pressable w="70" ml="auto" cursor="pointer" bg="green.400"
      justifyContent="center"
      onPress={() => handleSelectContact(data?.item?.id)} _pressed={{
        opacity: 0.5
      }}>
      <VStack alignItems="center" space={2}>
        <Icon color={'white'} as={AntDesign} name="edit" />
        {/* <Icon as={<Entypo name="dots-three-horizontal" />} size="xs" color="coolGray.800" /> */}
        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
          Edit
        </Text>
      </VStack>
    </Pressable>
    <Pressable w="70" cursor="pointer" bg="red.400" justifyContent="center"
      onPress={() => handleDeleteContact(data?.item?.id)} _pressed={{ opacity: 0.5 }
      }>
      <VStack alignItems="center" space={2}>
        <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
        <Text color="white" fontSize="xs" fontWeight="medium">
          Delete
        </Text>
      </VStack>
    </Pressable>
  </HStack>;

  useEffect(() => {
    dispatch(getContacts())
  }, [dispatch]);

  useEffect(() => {
    refreshData()
  }, [contacts]);

  return (
    <NativeBaseProvider initialWindowMetrics={inset}>
      <View style={styles.container}>
        <Box testID='contact-label' paddingX={'4'}><Text bold fontSize={'2xl'}>Contacts</Text></Box>
        {
          newListView ?
            <>
              <Box paddingX={'4'}><Text fontSize={'sm'} color="gray.400">Slide a row to the left</Text></Box>
              <Box paddingX={'4'}><Text fontSize={'sm'} color="gray.400">Please bear with the API, I think it's a little bit problematic</Text></Box>
              <SwipeListView
                data={data}
                renderItem={({ item }) => (
                  <Card item={item} handleDeleteContact={handleDeleteContact} handleSelectContact={handleSelectContact} newListView={newListView} />
                )}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </>
            :
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Card item={item} handleDeleteContact={handleDeleteContact} handleSelectContact={handleSelectContact} />
              )}
            />
        }
      </View>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={() => handleOpenModal()}
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        bottom={20}
        size="sm"
        onPress={() => handleChangeListView()}
        icon={<Icon color="white" as={AntDesign} name="retweet" size="sm" />}
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

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}