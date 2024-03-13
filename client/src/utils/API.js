import { AuthService } from './auth';

export const getMe = () => {
  const token = AuthService.getToken();
  if (!token) {
    return Promise.reject(new Error('No token available'));
  }
  
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch user information');
    }
    return response.json();
  })
  .catch(error => {
    console.error('Error fetching user information:', error);
    throw error;
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthService.getToken()}`, // Include token here
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AuthService.getToken()}`, // Include token here
    },
    body: JSON.stringify(userData),
  });
};

export const saveBook = (bookData) => {
  const token = AuthService.getToken();
  if (!token) {
    return Promise.reject(new Error('No token available'));
  }
  
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
};

export const deleteBook = (bookId) => {
  const token = AuthService.getToken();
  if (!token) {
    return Promise.reject(new Error('No token available'));
  }
  
  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
    headers: {
      'Authorization': `Bearer ${AuthService.getToken()}`, // Include token here
    },
  });
};

