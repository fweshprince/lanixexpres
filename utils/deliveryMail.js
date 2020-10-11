const constant = require('../../../constants');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendDeliveryMail = async ({ parcelId, clientEmail, clientName }) => {
  let message = ` Hello ${clientName},<br/> 
  your delivery  with tracking ID <b>${parcelId}<b> is ready. Please visit ${constant.CLIENTHOST}  
  with your tracking ID <br/> 
  to view more details about your delivery  or click on the link below <br/>
  <a href="${constant.CLIENTHOST}/lanix/track/find/${parcelId}">View Delivery</a>. <br/>
  For more information please contact us <${constant.ADMIN_EMAIL}>
  `;

  await sgMail.send({
    from: constant.ADMIN_EMAIL,
    to: clientEmail,
    subject: 'Delivery',
    text: message,
    html: message,
  });
};

module.exports = sendDeliveryMail;
