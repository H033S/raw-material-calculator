package edu.fiu.hackathon.material_calculator.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.fiu.hackathon.material_calculator.model.RawMaterial;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
}
