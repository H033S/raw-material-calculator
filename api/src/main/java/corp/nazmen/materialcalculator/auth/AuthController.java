package corp.nazmen.materialcalculator.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController
 */
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager,
                          TokenService tokenService,
                          EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO login) {

        LOGGER.trace("About to authenticate {}", login.email());
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(login.email(), login.password());

        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
        LOGGER.trace("User is authenticated {} is now authenticated", authenticationResponse.getPrincipal());

        return ResponseEntity.ok(tokenService.generateJwtToken(authenticationResponse));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody String email) {

        LOGGER.trace("About to forgot-password {}", email);

        final EmailConfirmationToken confirmationToken = tokenService.generateEmailConfirmationToken(email);
        //TODO: need to change email with first name
        final boolean isEmailSentSuccessful = this.emailService.sendForgotPasswordEmail(
                email,
                email,
                confirmationToken.getToken());

        if (isEmailSentSuccessful) {
            LOGGER.trace("Email to forgot password sent to {}", email);
            return ResponseEntity.noContent().build();
        } else {
            LOGGER.trace("Email to forgot password not sent");
            return ResponseEntity.internalServerError().build();
        }
    }
}
