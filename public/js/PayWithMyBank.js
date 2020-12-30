console.log("PayWthi");

var PayWithMyBankOptions = {
    closeButton: false,
    dragAndDrop: true,
    widgetContainerId: 'widget',
  };

var establishData = {
    accessId: 'D61EC9BAF0BB369B9438',
    merchantId: '1004314986',
    metadata: { demo: 'enabled' },
    currency: 'USD',
    paymentType: 'Deferred',
    amount: '100.00',
    description: 'thiago.moreira.ribeiro@gmail.com',
    merchantReference: '123456',
    returnUrl: '#success',
    cancelUrl: '#cancel'        
};

PayWithMyBank.selectBankWidget(establishData, PayWithMyBankOptions);

PayWithMyBank.addPanelListener(function(command, event) {
    if (command === 'event' && event.type === 'new_location') {
      if (event.data.indexOf('#success') === 0) {
        alert('success!');
      } else {
        alert('cancel!');
      }
      return false;
    }
  });
