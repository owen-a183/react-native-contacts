import ContactService, { BASE_URL } from '../api/contacts';
import axios from 'axios';

jest.mock('axios')

const dummyContacts = [
  {
    firstName: 'Winston',
    lastName: 'Churchill',
    age: 11,
    id: '1'
  },
  {
    firstName: 'Obama',
    lastName: 'Obama',
    age: 22,
    id: '2'
  },
  {
    firstName: 'Joe',
    lastName: 'Biden',
    age: 33,
    id: '3'
  },
]

const postDummyPayload =
  [{
    firstName: 'Donald',
    lastName: 'Trump',
    age: 44,
    id: '4'
  }]

const updateDummyPayload =
  [{
    firstName: 'Abraham',
    lastName: 'Lincoln',
    age: 34,
    id: '3'
  }]

describe('Testing API Calls', () => {
  it('should be able to get all data', async () => {
    axios.get.mockResolvedValueOnce(dummyContacts);
    const result = await ContactService.getAllContact();
    expect(axios.get).toHaveBeenCalledWith(BASE_URL);
    expect(result).toEqual(dummyContacts);
  });

  it('should be able to post', async () => {
    axios.post.mockResolvedValueOnce(postDummyPayload);
    const result = await ContactService.createContact(postDummyPayload);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual(postDummyPayload);
  });

  it('should be able to edit a contact', async () => {
    axios.put.mockResolvedValueOnce(updateDummyPayload);
    const result = await ContactService.updateContact(updateDummyPayload);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updateDummyPayload);
  });

  it('should be able to delete a contact', async () => {
    axios.delete.mockResolvedValueOnce({
      message: "Contact was deleted successfully!" //check by message
  });
    const result = await ContactService.deleteContact('4');
    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('message', 'Contact was deleted successfully!');
  });
});