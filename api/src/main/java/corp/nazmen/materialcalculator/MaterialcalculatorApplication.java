package corp.nazmen.materialcalculator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import corp.nazmen.materialcalculator.auth.RsaKeyProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class MaterialcalculatorApplication {

    public static void main(String[] args) {
        SpringApplication.run(MaterialcalculatorApplication.class, args);
    }

}
