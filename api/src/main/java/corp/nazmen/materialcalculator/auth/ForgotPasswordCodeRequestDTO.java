package corp.nazmen.materialcalculator.auth;

public record ForgotPasswordCodeRequestDTO(
        String email,
        String code,
        String password,
        String passwordConfirmation
) {
}
