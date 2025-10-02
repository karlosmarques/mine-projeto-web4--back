import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendPasswordReset(email: string, token: string) {
   const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"Respeita a lei pai" <${process.env.MAIL_USER}>`,
      to: email, 
      subject: 'Recuperação de Senha',
      html: `
        <p>Você solicitou a recuperação de senha né pai, mude imediatemente.</p>
        <p>Clique no link abaixo ai</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>se não for você meta o pé vá.</p>
      `,
    });
  }
}
