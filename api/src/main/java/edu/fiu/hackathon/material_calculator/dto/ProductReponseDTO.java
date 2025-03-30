package edu.fiu.hackathon.material_calculator.dto;

import java.util.List;

import edu.fiu.hackathon.material_calculator.model.Product;

public record ProductReponseDTO(
        String name,
        List<ProductItemResponseDTO> productItems) {

    public static ProductReponseDTO fromEntity(Product product) {

        return new ProductReponseDTO(
                product.getName(),
                product.getProductItems()
                        .stream()
                        .map(x -> ProductItemResponseDTO.fromEntity(x))
                        .toList());
    }
}
