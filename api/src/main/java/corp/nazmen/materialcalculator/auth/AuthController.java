package corp.nazmen.materialcalculator.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController
 */
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final Logger logger = LoggerFactory.getLogger(AuthController.class.getName());
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest login) {

        this.logger.trace("About to authenticate {}", login.email());
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(
                login.email(),
                login.password());

        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
        this.logger.trace("User is authenticated {} is now authenticated", authenticationResponse.getPrincipal());

        return ResponseEntity.ok(tokenService.generateToken(authenticationResponse));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> forgotPassword(@RequestBody String email) {

        this.logger.trace("About to forgot-password {}", email);
        return ResponseEntity.noContent().build();
    }

}
