import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as SendGrid from '@sendgrid/mail';

import type { MailDataRequired } from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private verifiedSender = process.env.SENDGRID_VERIFIED_SENDER;
  private sendgridapikey = process.env.SENDGRID_API_KEY;
  private logger: Logger;

  constructor(private readonly jwtService: JwtService) {
    this.logger = new Logger(EmailService.name);
    SendGrid.setApiKey(this.sendgridapikey);
  }

  async send(
    mail: MailDataRequired,
  ): Promise<{ success: boolean; address: string }> {
    try {
      await SendGrid.send(mail);
      this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
      return { success: true, address: mail.to as string };
    } catch (error) {
      this.logger.error('Error while sending email', error);
      throw error;
    }
  }
  async sendLoginEmail(
    recipient: string,
  ): Promise<{ success: boolean; address: string }> {
    const payload = { email: recipient };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    const mail: MailDataRequired = {
      to: recipient,
      from: this.verifiedSender,
      subject: 'Login to AquaExplore',
      html: `
      <h1>Click on the following link to Login to AquaExplore</h1>
      <a href="http://localhost:3000/auth/verify?token=${token}&tokentype=login">Navigate to AquaExplore! →</a>
      `,
    };
    try {
      const response = await this.send(mail);
      return response;
    } catch (e) {
      this.logger.error('Error while sending email', e);
    }
  }
  async sendSignupEmail(
    recipient: string,
  ): Promise<{ success: boolean; address: string }> {
    const token = this.jwtService.sign(
      { email: recipient },
      { expiresIn: '1h' },
    );
    const mail: MailDataRequired = {
      to: recipient,
      from: this.verifiedSender,
      subject: '',
      html: `
      <h1>Click on the following link to Signup to AquaExplore</h1>
      <a href="http://localhost:3000/auth/verify?token=${token}&tokentype=signup">Navigate to AquaExplore! →</a>
      `,
    };
    const response = await this.send(mail);
    return response;
  }

  async sendEmailWithTemplate(recipient: string, body: string): Promise<void> {
    const mail: MailDataRequired = {
      to: recipient,
      from: this.verifiedSender,
      templateId: 'Sendgrid_template_ID',
      dynamicTemplateData: { body, subject: 'Send Email with template' },
    };
    await this.send(mail);
  }
}
