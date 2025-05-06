package corp.nazmen.materialcalculator.auth;

import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

/**
 * AuthControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    @WithMockUser(username = "user")
    void usernameWithCorrectPasswordCanBeAuthenticated() throws Exception {

        this.mvc
                .perform(post("/api/v1/auth/login"))
                .andExpect(authenticated().withUsername("user"));
    }

    @Test
    @WithMockUser(username = "password", password = "incorrect-password")
    void usernameWithInvalidPasswordCannotBeAuthenticated() throws Exception {

        this.mvc
                .perform(post("/api/v1/auth/login"))
                .andExpect(status().isForbidden());
    }
}
