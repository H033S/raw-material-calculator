package corp.nazmen.materialcalculator.auth;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class EmailService {

    public record EmailDetails(String email, String subject, String body, String attachment) {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final String sender;
    private final String appName;
    private final String clientHost;
    private final String clientForgotPasswordPath;

    public EmailService(
            @Value("${spring.mail.username}") String sender,
            @Value("${api.forgot-password.app-name}") String appName,
            @Value("${api.forgot-password.client-host-url}") String clientHost,
            @Value("${api.forgot-password.client-forgot-password-path}") String clientForgotPasswordPath,
            JavaMailSender mailSender) {

        this.sender = sender;
        this.appName = appName;
        this.clientHost = clientHost;
        this.clientForgotPasswordPath = clientForgotPasswordPath;
        this.mailSender = mailSender;
    }

    public boolean sendSimpleEmail(EmailDetails details) {

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            // Setting up necessary details
            helper.setFrom(sender);
            helper.setTo(details.email());
            helper.setSubject(details.subject);
            helper.setText(details.body, true);

            mailSender.send(mimeMessage);
            return true;

        } catch (Exception e) {
            LOGGER.error(e.getMessage());
            return false;
        }
    }

    public boolean sendForgotPasswordEmail(String recipient, String email, String token) {

        String body = new StringBuilder()
                .append("<h1> Forgot Password </h1>")
                .append("Dear <strong>").append(recipient).append("</strong>")
                .append("<br>")
                .append("<br>")
                .append("<p>You have requested to reset the password for your ").append(appName).append(" account")
                .append("<br>")
                .append("Please click the link below to reset your password.")
                .append("<br>")
                .append("Token: <a href=").append(buildPasswordResetUrl(email,token)).append(">Click me</a>")
                .append("</p>")
                .toString();

        EmailDetails details = new EmailDetails(recipient, "Forgot Password", body, "");
        return sendSimpleEmail(details);
    }

    public String buildPasswordResetUrl(String email, String token) {
        return UriComponentsBuilder
                .fromUriString(clientHost)
                .path(clientForgotPasswordPath)
                .queryParam("email", email)
                .queryParam("token", token)
                .build()
                .toUriString();
    }
}