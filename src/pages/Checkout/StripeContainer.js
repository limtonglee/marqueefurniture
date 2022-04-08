import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckoutForm";


const PUBLIC_KEY = "pk_test_51Km1FvE6lgLJQEx0wHXvbiA4lADBdBb2f8iwY1Ga4n9G60KTjP1CmoSeJ8EvGTnisAjquprcJh9azCUEODFpm7C400sEIwuGdQ"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
  const location = useLocation();

  const items = location.state.items;
  const count = location.state.count;
  const selectedItemsId = location.state.selectedItemsId;
  const selectedVouchers = location.state.selectedVouchers;

	return (
		<Elements stripe={stripeTestPromise}>
			<CheckOutForm items={items} count={count} selectedItemsId={selectedItemsId} selectedVouchers={selectedVouchers}/>
		</Elements>
	)
}