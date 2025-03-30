package edu.fiu.hackathon.material_calculator.repository;

import edu.fiu.hackathon.material_calculator.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
