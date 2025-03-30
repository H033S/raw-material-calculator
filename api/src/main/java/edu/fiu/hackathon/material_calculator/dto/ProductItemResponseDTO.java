package edu.fiu.hackathon.material_calculator.dto;

import edu.fiu.hackathon.material_calculator.model.ProductItem;

public record ProductItemResponseDTO(
        String name,
        Double quantity,
        String unitOfMeasure) {

    public static ProductItemResponseDTO fromEntity(ProductItem item) {

        return new ProductItemResponseDTO(
                item.getRawMaterial().getName(),
                item.getQuantity(),
                item.getUnitOfMeasure());
    }
}
