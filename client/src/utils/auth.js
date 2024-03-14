// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // check if token is expired

  isTokenExpired(token) {
    const decoded = decode(token);
    const isExpired = decoded.exp < Date.now() / 1000;
  
    if (isExpired) {
      // Remove the expired token from localStorage
      localStorage.removeItem('id_token');
      // Redirect the user to the login page
      window.location.assign('/login');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.reload();
  }
}

export default new AuthService();
