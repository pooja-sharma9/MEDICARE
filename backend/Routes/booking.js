// import express from 'express';
// import { authenticate } from './../auth/verifyToken.js';
// import { getCheckoutSession } from '../Controllers/bookingController.js';


// const router = express.Router();
// router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);
// export default router;

import express from 'express';
import { authenticate } from './../auth/verifyToken.js'; // Authentication middleware
import { getCheckoutSession } from '../Controllers/bookingController.js'; // Controller function for checkout session

const router = express.Router();

// POST route to create a checkout session for a given doctor ID
router.post("/checkout-session/:doctorId", authenticate, getCheckoutSession);

export default router;
