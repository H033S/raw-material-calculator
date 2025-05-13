package corp.nazmen.materialcalculator.auth;

import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

/**
 * AppUser
 */
@Entity
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String email;
    private String password;
    @ManyToMany
    @JoinTable(name = "APP_USER__APP_ROLE",
        joinColumns = @JoinColumn(name = "appUserId", foreignKey = @ForeignKey(name = "APP_USER__TO__APP_ROLE")), 
        inverseJoinColumns = @JoinColumn(name = "appRoleId", foreignKey = @ForeignKey(name = "APP_ROLE__TO__APP_USER"))
    )
    private Set<AppRole> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAuthorities(Set<AppRole> authorities) {
        this.authorities = authorities;
    }

}
