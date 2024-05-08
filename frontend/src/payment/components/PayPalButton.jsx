import React, { useEffect } from 'react';
import axios from 'axios';

export const PayPalButton = () => {
  useEffect(() => {
    renderPaypalButton();
  }, []);
  function renderPaypalButton() {
    paypal
      .Buttons({
        createOrder: async () => {
          try {
            const response = await axios({
              url: 'http://localhost:8001/api/v1/payment/orders',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });

            const OrderData = response.data;
            if (OrderData.id) {
              return OrderData.id;
            } else {
              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            }
          } catch (error) {
            console.log(error);
            resultMessage(
              `Could not initiate PayPal Checkout...<br><br>${error}`,
            );
          }
        },
        async onApprove(data, actions) {
          try {
            const response = await axios.post(
              `http://localhost:8001/api/v1/payment/orders/${data.orderID}/capture`,
              null,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );

            const orderData = response.data;
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              return actions.restart();
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`,
              );
            } else if (!orderData.purchase_units) {
              throw new Error(JSON.stringify(orderData));
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
              const transaction =
                orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
              resultMessage(
                `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
              );
              console.log(
                'Capture result',
                orderData,
                JSON.stringify(orderData, null, 2),
              );
            }
          } catch (error) {
            console.error(error);
            resultMessage(
              `Sorry, your transaction could not be processed...<br><br>${error}`,
            );
          }
        },
      })
      .render('#paypal-button-container');
  }
  function resultMessage(message) {
    const container = document.querySelector('#result-message');
    container.innerHTML = message;
  }
  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;
