package corp.nazmen.materialcalculator.auth;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class EmailConfirmationTokenRepositoryTest {

    @Autowired
    private EmailConfirmationTokenRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    @Test
    void shouldRetrieveToken_ifExists() {
        // Arrange
        var token = UUID.randomUUID().toString();
        var email = "tonito.nazco@gmail.com";
        var now = LocalDateTime.now();
        var expiresAt = now.plusMinutes(5);
        var tokenConfirmation = new EmailConfirmationToken(token,
                                                           email,
                                                           now,
                                                           expiresAt);
        repository.save(tokenConfirmation);

        // Act
        var foundConfirmationToken = repository.findByEmailAndToken(email,
                                                                    token);

        // Assert
        assertThat(foundConfirmationToken).isNotEmpty();
    }
}