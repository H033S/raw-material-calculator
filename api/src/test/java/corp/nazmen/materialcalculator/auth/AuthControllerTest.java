package corp.nazmen.materialcalculator.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * AuthControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private TokenService tokenService;

    @Test
    @WithMockUser(username = "user")
    void usernameWithCorrectPasswordCanBeAuthenticated() throws Exception {

        this.mvc.perform(post("/api/v1/auth/login"))
                .andExpect(authenticated().withUsername("user"));
    }

    @Test
    @WithMockUser(username = "password", password = "incorrect-password")
    void usernameWithInvalidPasswordCannotBeAuthenticated() throws Exception {

        this.mvc.perform(post("/api/v1/auth/login"))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "email@gmail.com", password = "password")
    void forgotPasswordCode_NotFoundCode() throws Exception {

        //arrange
        var request = ForgotPasswordCodeSpecBuilder.build(tokenService)
                                                   .prepareWithEmptyToken();

        //action
        this.mvc.perform(post("/api/v1/auth/forgot-password-code")
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(objectMapper.writeValueAsString(
                                         request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "email@gmail.com", password = "password")
    void forgotPasswordCode_ExpiredCode() throws Exception {

        //arrange
        var request = ForgotPasswordCodeSpecBuilder.build(tokenService)
                                                   .prepareWithExpiredToken();

        //action
        this.mvc.perform(post("/api/v1/auth/forgot-password-code")
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(objectMapper.writeValueAsString(
                                         request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(username = "email@gmail.com", password = "password")
    void forgotPasswordCode_PasswordsNotMatching() throws Exception {

        //arrange
        var request = ForgotPasswordCodeSpecBuilder.build(tokenService)
                                                   .prepareWithNotMatchingPasswords();

        //action
        this.mvc.perform(post("/api/v1/auth/forgot-password-code")
                                 .contentType(MediaType.APPLICATION_JSON)
                                 .content(objectMapper.writeValueAsString(
                                         request)))
                .andExpect(status().isBadRequest());
    }

    static class ForgotPasswordCodeSpecBuilder {

        private String code;
        private String email;
        private String password;
        private String passwordConfirmation;
        private TokenService tokenService;

        private ForgotPasswordCodeSpecBuilder() {
        }

        static ForgotPasswordCodeSpecBuilder build(TokenService tokenService) {

            var builder = new ForgotPasswordCodeSpecBuilder();
            builder.tokenService = tokenService;
            builder.code = UUID.randomUUID().toString();
            builder.email = "email@gmail.com";
            builder.password = "password";
            builder.passwordConfirmation = "password";
            return builder;
        }


        private ForgotPasswordCodeRequestDTO initRequest() {

            return new ForgotPasswordCodeRequestDTO(email,
                                                    code,
                                                    password,
                                                    passwordConfirmation);
        }

        private EmailConfirmationToken initToken() {

            EmailConfirmationToken token = new EmailConfirmationToken();
            token.setToken(code);
            token.setEmail(email);
            token.setCreatedAt(LocalDateTime.now());
            token.setCreatedAt(LocalDateTime.now().plusMinutes(5));
            return token;
        }

        private UserDetails initUser() {
            return User.builder()
                       .username(this.email)
                       .password(this.password)
                       .build();
        }

        public ForgotPasswordCodeRequestDTO prepareWithEmptyToken() {

            final ForgotPasswordCodeRequestDTO request = initRequest();
            when(tokenService.getEmailConfirmationToken(email, code))
                    .thenReturn(Optional.empty());
            return request;
        }

        public ForgotPasswordCodeRequestDTO prepareWithExpiredToken() {

            final ForgotPasswordCodeRequestDTO request = initRequest();
            EmailConfirmationToken token = initToken();
            token.setCreatedAt(LocalDateTime.now().minusMinutes(10));
            token.setExpiresAt(LocalDateTime.now().minusMinutes(5));

            when(tokenService.getEmailConfirmationToken(email, code))
                    .thenReturn(Optional.of(token));
            when(tokenService.generateEmailConfirmationToken(email))
                    .thenReturn(token);

            return request;
        }

        public EmailConfirmationToken prepareWithNotMatchingPasswords() {

            this.password = "password";
            this.passwordConfirmation = "notMatchingPassword";
            EmailConfirmationToken token = new EmailConfirmationToken();
            token.setToken(code);
            token.setEmail(email);
            token.setCreatedAt(LocalDateTime.now());
            token.setCreatedAt(LocalDateTime.now().plusMinutes(5));

            when(tokenService.getEmailConfirmationToken(email, code))
                    .thenReturn(Optional.of(token));
            when(tokenService.generateEmailConfirmationToken(email))
                    .thenReturn(token);

            return token;
        }
    }
}
