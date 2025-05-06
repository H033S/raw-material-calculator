package corp.nazmen.materialcalculator.auth;

import java.util.logging.Logger;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * AuthController
 */
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final Logger logger = Logger.getLogger(AuthController.class.getName());
    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {

        Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(
                login.username(),
                login.password());

        Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);
        this.logger.info("User " + authenticationResponse.getPrincipal() + " is now authenticated");

        return ResponseEntity.ok().build();
    }

}
