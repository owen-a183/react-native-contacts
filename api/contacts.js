import axios from 'axios';

export const BASE_URL = "https://contact.herokuapp.com/contact";

const getAllContact = async () => {
  console.log('api get all called')
  const response = await axios.get(BASE_URL);
  return response
};

const createContact = async (payload) => {
  console.log('api post called')
  return axios.post(
    BASE_URL,
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
      photo: "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
    }, {
    headers: {
      "Content-Type": 'application/json',
      "Header": 'Accept: application/json'
    }
  }
  )
};

const deleteContact = (id) => {
  console.log('api delete called')
  return axios.delete(
    "https://contact.herokuapp.com/contact/" + id
  )
};

const updateContact = (payload) => {
  console.log('api put called')
  return axios.put(
    BASE_URL + "/" + payload.id,
    {
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
      photo: "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
    }, {
    headers: {
      "Content-Type": 'application/json',
      "Header": 'Accept: application/json'
    }
  }
  )
};

const ContactService = {
  getAllContact,
  deleteContact,
  createContact,
  updateContact,
};

export default ContactService;