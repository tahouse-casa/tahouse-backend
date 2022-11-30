const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const nodemailer = require("nodemailer");

const UserService = require("./user.service");

const service = new UserService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const secret = config.jwtSecret;
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, secret);
    return {
      user,
      token,
    };
  }
  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const secret = config.jwtSecret;
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15min" });
    const link = `http://localhost:3001/api/v1/recovery?token=${token}`;
    //const link = `https://dev.tahouse.casa/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.emailUser,
      to: user.email,
      subject: "Email para recuperar contraseña en Ta House",
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const res = await this.sendEmail(mail);
    return res;
  }

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: "mail sent" };
  }

  async changePassword(token, newPassword) {
    try {
      const secret = config.jwtSecret;
      const payload = jwt.verify(token, secret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return {
        message: "password change",
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
