package corp.nazmen.materialcalculator.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * AuthController
 */
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final Logger LOGGER
            = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final EmailService emailService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserDetailsPasswordService userDetailsPasswordService;

    public AuthController(AuthenticationManager authenticationManager,
                          TokenService tokenService,
                          EmailService emailService,
                          UserDetailsService userDetailsService,
                          PasswordEncoder passwordEncoder,
                          UserDetailsPasswordService userDetailsPasswordService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.emailService = emailService;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.userDetailsPasswordService = userDetailsPasswordService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO login) {

        LOGGER.trace("About to authenticate {}", login.email());
        Authentication authenticationRequest
                = UsernamePasswordAuthenticationToken.unauthenticated(login.email(),
                                                                      login.password());

        try {
            Authentication authenticationResponse
                    = this.authenticationManager.authenticate(
                    authenticationRequest);
            LOGGER.trace("User is authenticated {} is now authenticated",
                         authenticationResponse.getPrincipal());

            return ResponseEntity.ok(tokenService.generateJwtToken(
                    authenticationResponse));
        }
        catch (AuthenticationException e) {
            LOGGER.trace("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody String email) {

        LOGGER.trace("About to forgot-password {}", email);

        final EmailConfirmationToken confirmationToken
                = tokenService.generateEmailConfirmationToken(email);
        //TODO: need to change email with first name
        final boolean isEmailSentSuccessful
                = this.emailService.sendForgotPasswordEmail(email,
                                                            email,
                                                            confirmationToken.getToken());

        if (isEmailSentSuccessful) {
            LOGGER.trace("Email to forgot password sent to {}", email);
            return ResponseEntity.noContent().build();
        }
        else {
            LOGGER.trace("Email to forgot password not sent");
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/forgot-password-code")
    public ResponseEntity<String> forgotPasswordCode(@RequestBody() ForgotPasswordCodeRequestDTO requestDTO) {

        LOGGER.trace("About to forgot-password-code {}", requestDTO.email());

        Optional<EmailConfirmationToken> optConfirmationToken
                = tokenService.getEmailConfirmationToken(requestDTO.email(),
                                                         requestDTO.code());
        if (optConfirmationToken.isEmpty()) {

            LOGGER.trace("No confirmation token found for email {}",
                         requestDTO.email());
            return ResponseEntity.badRequest()
                                 .body("Code " + requestDTO.code() +
                                       " was not available for Email: " +
                                       requestDTO.email());
        }

        final EmailConfirmationToken confirmationToken
                = optConfirmationToken.get();
        if (confirmationToken.getExpiresAt().isBefore(LocalDateTime.now())) {

            LOGGER.trace("Confirmation token expired");
            return ResponseEntity.badRequest()
                                 .body("Code " + requestDTO.code() +
                                       " has expired");
        }

        if (!requestDTO.password().equals(requestDTO.passwordConfirmation())) {

            LOGGER.trace("Password confirmation does not match");
            return ResponseEntity.badRequest()
                                 .body("Passwords are not matching");
        }

        LOGGER.trace("Getting user details for email {}", requestDTO.email());
        Optional<UserDetails> userDetails;
        try {
            userDetails
                    = Optional.ofNullable(userDetailsService.loadUserByUsername(
                    requestDTO.email()));
        }
        catch (Exception e) {
            LOGGER.error("User not found for email {}: {}",
                         requestDTO.email(),
                         e.getMessage());
            return ResponseEntity.badRequest()
                                 .body("User not found for Email: " +
                                       requestDTO.email());
        }
        assert userDetails.isPresent(); //it should be found because I created a token for it

        LOGGER.trace("Updating password for user {}",
                     userDetails.get().getUsername());
        UserDetails user = userDetails.get();
        String encodedPassword = passwordEncoder.encode(requestDTO.password());
        userDetailsPasswordService.updatePassword(user, encodedPassword);
        LOGGER.trace("Updated password for user {}", requestDTO.email());

        return ResponseEntity.noContent().build();
    }
}
