import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "niranjanskailas@gmail.com",
        pass: "pcga dvsf yvno asyf",
    },
});

export default transporter