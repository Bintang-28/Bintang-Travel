import Auth from './Auth'
import HomePagesController from './HomePagesController'
import BookingController from './BookingController'
import Settings from './Settings'
import Admin from './Admin'
import Client from './Client'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
HomePagesController: Object.assign(HomePagesController, HomePagesController),
BookingController: Object.assign(BookingController, BookingController),
Settings: Object.assign(Settings, Settings),
Admin: Object.assign(Admin, Admin),
Client: Object.assign(Client, Client),
}

export default Controllers