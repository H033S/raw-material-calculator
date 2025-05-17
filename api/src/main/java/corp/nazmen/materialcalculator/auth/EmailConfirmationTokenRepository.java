package corp.nazmen.materialcalculator.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
interface EmailConfirmationTokenRepository extends JpaRepository<EmailConfirmationToken, String> {

    Optional<EmailConfirmationToken> findByEmailAndToken(String email, String token);
}
