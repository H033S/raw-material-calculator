package edu.fiu.hackathon.material_calculator.repository;


import edu.fiu.hackathon.material_calculator.model.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}
