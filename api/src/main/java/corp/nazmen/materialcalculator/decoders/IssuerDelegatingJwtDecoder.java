package corp.nazmen.materialcalculator.decoders;

import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;

import java.text.ParseException;
import java.util.Map;

public class IssuerDelegatingJwtDecoder implements JwtDecoder {

    private final Map<String, JwtDecoder> decoders;

    public IssuerDelegatingJwtDecoder(Map<String, JwtDecoder> decoders) {
        this.decoders = decoders;
    }

    @Override
    public Jwt decode(String token) throws JwtException {

        String issuer = extractIssuerFrom(token);

        if (decoders.containsKey(issuer)) {
            return decoders.get(issuer).decode(token);
        }

        throw new JwtException("No decoder could be found for issuer, " + token);
    }

    private String extractIssuerFrom(String token) {
        try {
            SignedJWT jwt = SignedJWT.parse(token);
            return jwt.getJWTClaimsSet().getIssuer();
        } catch (ParseException e) {
            throw new JwtException("Failed to parse JWT to extract issuer", e);
        }
    }
}