package corp.nazmen.materialcalculator.auth;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TokenService {

    private final JwtEncoder jwtEncoder;
    private final EmailConfirmationTokenRepository
            emailConfirmationTokenRepository;

    public TokenService(JwtEncoder jwtEncoder,
                        EmailConfirmationTokenRepository emailConfirmationTokenRepository) {
        this.jwtEncoder = jwtEncoder;
        this.emailConfirmationTokenRepository
                = emailConfirmationTokenRepository;
    }

    public String generateJwtToken(Authentication authentication) {

        Instant now = Instant.now();
        String scope = authentication.getAuthorities()
                                     .stream()
                                     .map(GrantedAuthority::getAuthority)
                                     .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                                          .issuer("https://rawmaterial.com")
                                          .issuedAt(now)
                                          .expiresAt(now.plus(1,
                                                              ChronoUnit.HOURS))
                                          .subject(authentication.getName())
                                          .claim("scope", scope)
                                          .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claims))
                         .getTokenValue();
    }

    public EmailConfirmationToken generateEmailConfirmationToken(String email) {

        String token = UUID.randomUUID().toString();
        final EmailConfirmationToken confirmationToken
                = new EmailConfirmationToken(
                token,
                email,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(5)
        );

        return emailConfirmationTokenRepository.save(confirmationToken);
    }

    public Optional<EmailConfirmationToken> getEmailConfirmationToken(String email,
                                                                      String token) {
        var optToken = emailConfirmationTokenRepository.findByEmailAndToken(
                email,
                token);
        return optToken;
    }
}
