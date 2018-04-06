var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'thezili.eunsook@gmail.com',
	    pass: 'qlalf2di*'
	}
});
	 
var timerId;
	 
module.exports.sendEmail = function(file) {
	if (timerId) return;
	 
	timerId = setTimeout(function() {
	    clearTimeout(timerId);
	    timerId = null;
	}, 10000);
	 
	console.log('Sendig an Email..');
	 
	var mailOptions = {
	    from: 'Talking Mirror <thezili.eunsook@gmail.com>',
	    to: 'thezili.eunsook@gmail.com',
	    subject: '[Smart mirror] 사진(동영상)이 도착하였습니다. 확인해주세요',
	    html: '<b>Hi EunSook</b>,<br/><br/> 사진(동영상)을 첨부파일에서 확인해주세요.<br/>스마트미러의 ip와 9090포트를 통해 확인 가능합니다.<br/><br/> Smart Mirror : ' + Date() + ' <br/><br/>Dear,<br/><i>Smart Mirror</i>',
	    attachments: [{
	      path: file
	    }]
	};
	 
	transporter.sendMail(mailOptions, function(error, info) {
	    if (error) {
	    	console.log(error);
	    } else {
	    	console.log('Message sent: ' + info.response);
	    }
	});
}