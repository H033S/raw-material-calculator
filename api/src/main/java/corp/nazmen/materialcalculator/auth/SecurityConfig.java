package corp.nazmen.materialcalculator.auth;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import corp.nazmen.materialcalculator.decoders.IssuerDelegatingJwtDecoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Map;

/**
 * SecurityConfig
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);
    private final RsaKeyProperties rsaKeys;

    public SecurityConfig(RsaKeyProperties rsaKeys) {
        this.rsaKeys = rsaKeys;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
                                                                      Exception {
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers(
                    "api/v1/user").authenticated().anyRequest().permitAll())
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session -> session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .httpBasic(Customizer.withDefaults());

        this.logger.debug("security filter bean is created");
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
                                                       PasswordEncoder passwordEncoder) {

        DaoAuthenticationProvider authenticationProvider
                = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder);

        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails userDetails = User.withUsername("tonito.nazco@gmail.com")
                                      .password("{noop}password")
                                      .roles("USER")
                                      .build();

        return new InMemoryUserDetailsManager(userDetails);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    @Primary
    JwtDecoder decoderDelegator(
            @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}") String jwkSetUri) {

        var googleDecoder = NimbusJwtDecoder.withJwkSetUri(jwkSetUri).build();
        var appDecoder = NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey())
                                         .build();

        return new IssuerDelegatingJwtDecoder(Map.of(
                "https://accounts.google.com", googleDecoder,
                "accounts.google.com", googleDecoder,
                "https://rawmaterial.com", appDecoder
        ));
    }

    @Bean
    JwtEncoder jwtEncoder() {

        JWK jwk
                = new RSAKey.Builder(rsaKeys.publicKey()).privateKey(rsaKeys.privateKey())
                                                         .build();
        JWKSource jwkSource = new ImmutableJWKSet(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }
}
