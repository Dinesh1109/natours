import { showAlert } from './alert.js';

const stripe = Stripe(
  'pk_test_51NaFiXSAzlEiWwTRn0wrg0obFrCGQJ9uvAIK9sPbL5e0UpjWFptug9FxYQCebEjefNrIrvNi5RADgpNqlIztxzbG00Vwsb0WpM'
);
const bookBtn = document.getElementById('book-tour');

const bookTour = async (tourId) => {
  try {
    //1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    //2) Create the checkout form + charge credit card

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const tourId = e.target.dataset.tourId;
    bookTour(tourId);
  });
