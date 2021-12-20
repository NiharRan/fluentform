import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
 
Promise.all( [ wixLocation.to('/'), wixUsers.logout() ] );