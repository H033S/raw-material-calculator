package corp.nazmen.materialcalculator.auth;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * AppRole
 */
@Entity
public class AppRole implements GrantedAuthority {

    enum AppRoleValue {
        ADMIN,
        USER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Enumerated(EnumType.STRING)
    private AppRoleValue value;

    @Override
    public String getAuthority() {
        return this.value.name();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public AppRoleValue getValue() {
        return value;
    }

    public void setValue(AppRoleValue value) {
        this.value = value;
    }

}
