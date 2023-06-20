import { Button, Icon, Stack, HStack, Avatar, Heading, Text, Box} from 'native-base'
import { AntDesign } from '@expo/vector-icons';

export default Card = ({item, handleDeleteContact, handleSelectContact, newListView}) => {
  return <Box alignItems="center">
    <Box overflow="hidden" width='100%'
      _android={{
        backgroundColor: "gray.50"
      }}>
      <Box>
        <HStack alignItems={'center'} space='1'>
          <Avatar
            source={{
              uri: item.photo? item.photo : "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
            }} alt="avatar"
            size={'md'}
            padding="0.5"
            margin='3'
          backgroundColor={'blue.500'}
          />
          <Box>
            <Stack p="1" space={2}>
              <Stack space={2}>
                <Heading size="sm" ml="-1">
                  {item.firstName + " "+item.lastName}
                </Heading>
                <Text fontSize="xs" _light={{
                  color: "blue.500"
                }} fontWeight="500" ml="-0.5" mt="-1">
                  {"Age : "+item.age}
                </Text>
              </Stack>
            </Stack>
          </Box>
          {
            !newListView && 
            <Box flex="1"  flexDirection="row" justifyContent={'flex-end'}>
            <HStack paddingX={2} >
              <Button onPress={()=>handleSelectContact(item.id)}variant='ghost'><Icon color={'green.600'} as={AntDesign} name="edit"></Icon></Button>
              <Button onPress={()=>handleDeleteContact(item.id)} variant='ghost'><Icon color={'red.700'} as={AntDesign} name="delete"></Icon></Button>
            </HStack>
          </Box>
          }
        </HStack>
      </Box>
    </Box>
  </Box>;
};