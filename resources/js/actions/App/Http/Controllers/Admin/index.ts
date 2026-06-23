import CarsController from './CarsController'
import ReservationsController from './ReservationsController'
import ClientsController from './ClientsController'
import PaymentsController from './PaymentsController'
import ReportsController from './ReportsController'
import DriversController from './DriversController'
import SupportController from './SupportController'
import MaintenanceController from './MaintenanceController'
import VehicleReminderController from './VehicleReminderController'
const Admin = {
    CarsController: Object.assign(CarsController, CarsController),
ReservationsController: Object.assign(ReservationsController, ReservationsController),
ClientsController: Object.assign(ClientsController, ClientsController),
PaymentsController: Object.assign(PaymentsController, PaymentsController),
ReportsController: Object.assign(ReportsController, ReportsController),
DriversController: Object.assign(DriversController, DriversController),
SupportController: Object.assign(SupportController, SupportController),
MaintenanceController: Object.assign(MaintenanceController, MaintenanceController),
VehicleReminderController: Object.assign(VehicleReminderController, VehicleReminderController),
}

export default Admin