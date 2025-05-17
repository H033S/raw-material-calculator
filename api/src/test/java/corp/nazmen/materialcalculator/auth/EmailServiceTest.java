package corp.nazmen.materialcalculator.auth;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @InjectMocks
    EmailService emailService;

    @Test
    void testBuildPasswordResetUrl() {
        //arrange
        String email = "test@gmail.com";
        String token = UUID.randomUUID().toString();
        ReflectionTestUtils.setField(emailService, "clientHost", "http://localhost:8080");
        ReflectionTestUtils.setField(emailService, "clientForgotPasswordPath", "/passwordReset");
        //action
        String uri = emailService.buildPasswordResetUrl(email, token);
        //assert
        assertThat(uri).isEqualTo("http://localhost:8080/passwordReset?email=" + email + "&token=" + token);
    }
}