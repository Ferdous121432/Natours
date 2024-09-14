const stripe = Stripe(
  'pk_test_51PydHRHmFLUIiS12y2K1u4xtVJH69D5Noh7YqWwVenC6AqSlAeSZhIC9fsHLN4Z0VZVW4mNIxZi5oLDCZzoMJJ5r009Uqk7srq',
);
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
