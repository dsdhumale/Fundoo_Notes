const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '28699755738-662o9fmf3hpiv5ffftsmab8s9ptdknja.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//047xIYA1hNkhTCgYIARAAGAQSNwF-L9IrSU0pbSjqW1sVdXWNZ26yZnCuT56pmZDWZdQdHdQEDqJGeYWGqLD0Ef7Ip18JpEl3C8w'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export const sendMail = async (emailID) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'd.sdhumale@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailoption = {
            from: 'Devendra  <d.sdhumale@gmail.com>',
            to: emailID,
            subject: 'Reset Password',
            text: 'Reset Password',
            html: '<h1>To Reset Your Password <a href="http://localhost:1000/api/v1/users/resetpassword"> Click Here </a></h1><h1>'
        };

        const result = await transport.sendMail(mailoption)
        return result

        
    } catch (error) {
        return error
    }

}
// sendMail()
//     .then((result) => console.log('Email sent...', result))
//     .catch((error) => console.log(error.message));