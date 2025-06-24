import axios from 'axios';

// Function to fetch a single major's data from the backend
export const fetchMajorData = async (majorId) => {
  try {
    const response = await axios.get(`/api/majors/${majorId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching major data:', error);
    throw error;
  }
};

// Function to fetch all majors from the backend
export const fetchAllMajors = async () => {
  try {
    const response = await axios.get('/api/majors');
    return response.data;
  } catch (error) {
    console.error('Error fetching all majors:', error);
    throw error;
  }
};

// Function to fetch major details including universities that offer it
export const fetchMajorUniversities = async (majorId) => {
  try {
    const response = await axios.get(`/api/majors/${majorId}/universities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching major universities:', error);
    throw error;
  }
};

// Function to fetch major's future work opportunities
export const fetchMajorFutureWork = async (majorId) => {
  try {
    const response = await axios.get(`/api/majors/${majorId}/future-work`);
    return response.data;
  } catch (error) {
    console.error('Error fetching major future work:', error);
    throw error;
  }
};

// Function to fetch major's recognitions
export const fetchMajorRecognitions = async (majorId) => {
  try {
    const response = await axios.get(`/api/majors/${majorId}/recognitions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching major recognitions:', error);
    throw error;
  }
};
