import ReservationsController from './ReservationsController'
import PaymentController from './PaymentController'
import SupportController from './SupportController'
const Client = {
    ReservationsController: Object.assign(ReservationsController, ReservationsController),
PaymentController: Object.assign(PaymentController, PaymentController),
SupportController: Object.assign(SupportController, SupportController),
}

export default Client