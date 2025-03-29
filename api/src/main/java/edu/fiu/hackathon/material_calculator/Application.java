package edu.fiu.hackathon.material_calculator;

import edu.fiu.hackathon.material_calculator.model.RawMaterial;
import edu.fiu.hackathon.material_calculator.service.RawMaterialService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private final RawMaterialService rawMaterialService;

    public Application(RawMaterialService rawMaterialService) {
        this.rawMaterialService = rawMaterialService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        List<RawMaterial> ingredients = List.of(
                new RawMaterial("Flour"),
                new RawMaterial("Sugar"),
                new RawMaterial("Salt"),
                new RawMaterial("Butter"),
                new RawMaterial("Eggs"),
                new RawMaterial("Milk"),
                new RawMaterial("Yeast"),
                new RawMaterial("Olive Oil"),
                new RawMaterial("Garlic"),
                new RawMaterial("Tomatoes")
        );

        ingredients.forEach(rawMaterialService::saveRawMaterial);
    }
}
