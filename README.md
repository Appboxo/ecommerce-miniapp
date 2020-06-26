# ecommerce-miniapp

Appboxo miniapp showcasing payment scenario with the help of custom events

Custom event example:
```js
appboxoSDK.sendPromise('AppBoxoWebAppCustomEvent', {
  type: 'buy_from_miniapp',
  payload: {
    orderId: 123456,
    name: 'Decorative Alarm Clock',
    price: 65,
    currency: 'USD'
  }
}).then(() => {
  // Successful purchase
}).catch(() => {
  // Payment failed
})
```
